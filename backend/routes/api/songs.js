const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Song, Artist, Album, Comment, Playlist, User } = require('../../db/models');



const router = express.Router();


router.get('/', async (req, res) => {

    const songs = await Song.findAll();

    if (!songs) throw new Error('No songs found');

    return res.json(songs);
});

router.get('/:songId', async (req, res, next) => {
    const { songId } = req.params;

    const song = await Song.findOne({
        where: {
            id: songId
        },
        include: [{
            model: Artist,
            attributes: ['id', 'imageUrl',],
            // include: {
            //     model: User,
            //     attributes: ['username']
            // }
        },
        {
            model: Album,
            attributes: ['id', 'title', 'imageUrl',],
        }],

    })

    if (song) {
        const user = await User.findByPk(song.artistId)

        const songData = JSON.stringify(song) //stringified and parsed song data because I couldn't add new keys into the song object otherwise
        const songDataParsed = JSON.parse(songData) //ex. 'song.Artist.username = user.username' doesn't work at all
        songDataParsed.Artist.username = user.username //using an include also didn't work as it also includes the model name so the format doesn't match specifications

        // song.Artist.username = user.username

        return res.json(songDataParsed)
        // return res.json(song)
    } else {
        const err = new Error("Song couldn't be found.");
        err.status = 404;
        err.title = "Song couldn't be found.";
        err.errors = ["Song couldn't be found."];
        return next(err)
    }
});

router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;

    const songs = await Song.findAll({
        where: {
            artistId: user.id
        }
    })

    if (songs.length === 0) throw new Error('No songs found');

    return res.json(songs);
}
);

router.delete('/:songId', requireAuth, async (req, res, next) => {
    const { songId } = req.params;
    const { user } = req;

    const song = await Song.findOne({ where: { id: songId } })

    if (song) {
        if (song.artistId !== user.id) {
            const err = new Error('User not authorized to delete song.');
            err.status = 403;
            err.title = 'User not authorized to delete song.';
            err.errors = ['User not authorized to delete song.'];
            return next(err)
        } else {
            await Song.destroy({ where: { id: songId } });
            return res.json({ message: 'Successfully deleted' });
        }
    } else {
        const err = new Error('Song not found.');
        err.status = 404;
        err.title = 'Song not found.';
        err.errors = ['Song not found.'];
        return next(err)
    }
});

module.exports = router;
