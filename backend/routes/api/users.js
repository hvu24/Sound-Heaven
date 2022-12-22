// backend/routes/api/users.js
const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Song, Artist, Album, Comment, Playlist, User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res, next) => {
        const { email, password, username, firstName, lastName } = req.body;
        let existingUser = await User.findOne({ where: { email } })

        if (existingUser) {
            const err = new Error('Signup Failed');
            err.status = 403;
            err.title = 'Signup Failed';
            err.errors = ['Email already exists.'];
            return next(err)
        }

        const user = await User.signup({ email, username, password, firstName, lastName });
        // console.log(user.dataValues.id)

        await Artist.create({
            totalSongs: 0,
            totalAlbums: 0,
            imageUrl: "www.xyz.com",
            userId: user.dataValues.id,
        })

        user.dataValues.token = await setTokenCookie(res, user);

        return res.json(
            user,
        );
    }
);
//get all songs by artist from id
router.get('/:userId/songs', async (req, res, next) => {
    const { userId } = req.params;

    const artist = await Artist.findOne({ where: { id: userId } })

    if (artist) {
        const songs = await Song.findAll({ where: { artistId: userId } })
        return res.json({ songs })
    } else {
        const err = new Error('Artist not found.');
        err.status = 404;
        err.title = 'Artist not found.';
        err.errors = ['Artist not found.'];
        return next(err)
    }
});

//get all playlists by artist from id
router.get('/:userId/playlists', async (req, res, next) => {
    const { userId } = req.params;

    const artist = await Artist.findOne({ where: { id: userId } })

    if (artist) {
        const playlists = await Playlist.findAll({ where: { userId: userId } })
        return res.json({ playlists })
    } else {
        const err = new Error('Artist not found.');
        err.status = 404;
        err.title = 'Artist not found.';
        err.errors = ['Artist not found.'];
        return next(err)
    }
});

//get details of artist from id
router.get('/:userId', async (req, res, next) => {
    const { userId } = req.params

    const artist = await Artist.findOne({
        where: { id: userId },
        attributes: ['id', 'totalSongs', 'totalAlbums', 'imageUrl'],
        include: [
            {
                model: Album,
                attributes: ['title', 'description', 'imageUrl'],
                include: {
                    model: Song,
                    attributes: ['title', 'description', 'url', 'imageUrl']
                }
            },
        ],
    })
    if (artist) {
        const user = await User.findByPk(userId)

        const artistData = JSON.stringify(artist)
        const artistDataParsed = JSON.parse(artistData)
        artistDataParsed.username = user.username

        return res.json(artistDataParsed);
    } else {
        const err = new Error("Artist couldn't be found.");
        err.status = 404;
        err.title = "Artist couldn't be found.";
        err.errors = ["Artist couldn't be found."];
        return next(err)
    }
});
module.exports = router;
