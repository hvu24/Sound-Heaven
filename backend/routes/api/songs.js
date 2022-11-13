const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Song } = require('../../db/models');



const router = express.Router();


router.get('/', async (req, res) => {

    const songs = await Song.findAll();

    if (!songs) throw new Error('No songs found');

    return res.json(songs);
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
