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

module.exports = router;
