const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Song, Artist, Album, Comment, Playlist, User } = require('../../db/models');



const router = express.Router();

//get all albums
router.get('/', async (req, res) => {

    const albums = await Album.findAll();

    if (!albums) throw new Error('No albums found');

    return res.json({ albums });
});

//get all albums created by current user
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;

    const albums = await Album.findAll({
        where: {
            artistId: user.id
        }
    })

    if (albums.length === 0) throw new Error('No albums found');

    return res.json({ albums });
}
);

//get details of album by album id
router.get('/:albumId', async (req, res, next) => {
    const { albumId } = req.params;

    const album = await Album.findOne({
        where: {
            id: albumId
        },
        include: [{
            model: Artist,
            attributes: ['id', 'imageUrl',],
        },
        {
            model: Song,
        }],

    })

    if (album) {
        const user = await User.findByPk(album.artistId)

        const albumData = JSON.stringify(album) //stringified and parsed song data because I couldn't add new keys into the song object otherwise
        const albumDataParsed = JSON.parse(albumData) //ex. 'album.Artist.username = user.username' doesn't work at all
        albumDataParsed.Artist.username = user.username //using an include also didn't work as it also includes the model name so the format doesn't match specifications

        return res.json(albumDataParsed)

    } else {
        const err = new Error("Album couldn't be found.");
        err.status = 404;
        err.title = "Album couldn't be found.";
        err.errors = ["Album couldn't be found."];
        return next(err)
    }
});

//delete album by current user
router.delete('/:albumId', requireAuth, async (req, res, next) => {
    const { albumId } = req.params;
    const { user } = req;

    const album = await Album.findOne({ where: { id: albumId } })

    if (album) {
        if (album.artistId !== user.id) {
            const err = new Error('User not authorized to delete album.');
            err.status = 403;
            err.title = 'User not authorized to delete album.';
            err.errors = ['User not authorized to delete album.'];
            return next(err)
        } else {
            await Album.destroy({ where: { id: albumId } });
            return res.json({ message: 'Successfully deleted' });
        }
    } else {
        const err = new Error("Album couldn't be found.");
        err.status = 404;
        err.title = "Album couldn't be found.";
        err.errors = ["Album couldn't be found."];
        return next(err)
    }
});
module.exports = router;
