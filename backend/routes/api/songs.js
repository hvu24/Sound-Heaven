const express = require('express')

const { Song } = require('../../db/models');



const router = express.Router();


router.get('/', async (req, res) => {

    const songs = await Song.findAll();

    if (!songs) throw new NotFoundError('No songs found');

    return res.json(songs);
});


module.exports = router;
