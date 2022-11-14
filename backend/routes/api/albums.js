const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Song, Artist, Album, Comment, Playlist, User } = require('../../db/models');



const router = express.Router();

router.get('/', async (req, res) => {

    const albums = await Album.findAll();

    if (!albums) throw new Error('No albums found');

    return res.json(albums);
});


module.exports = router;
