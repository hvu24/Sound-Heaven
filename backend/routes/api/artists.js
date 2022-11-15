const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Song, Artist, Album, Comment, Playlist, User } = require('../../db/models');

const router = express.Router();

//get all albums by artist from id
router.get('/:userId/albums', async (req, res, next) => {
    const { userId } = req.params;

    const artist = await Artist.findOne({ where: { id: userId } })

    if (artist) {
        const albums = await Album.findAll({ where: { artistId: userId } })
        return res.json({ albums })
    } else {
        const err = new Error('Artist not found.');
        err.status = 404;
        err.title = 'Artist not found.';
        err.errors = ['Artist not found.'];
        return next(err)
    }
});

module.exports = router;
