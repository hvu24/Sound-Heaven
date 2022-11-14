const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Song, Artist, Album, Comment, Playlist, User } = require('../../db/models');



const router = express.Router();

//get all albums
router.get('/', async (req, res) => {

    const albums = await Album.findAll();

    if (!albums) throw new Error('No albums found');

    return res.json(albums);
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

    return res.json(albums);
}
);

module.exports = router;
