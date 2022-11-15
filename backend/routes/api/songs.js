const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Song, Artist, Album, Comment, Playlist, User } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');

const router = express.Router();

const validateComment = [
    check('body')
        .exists({ checkFalsy: true })
        .withMessage('Comment body text is required.'),
    handleValidationErrors
];

const validateSong = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Song title is required.'),
    check('url')
        .exists({ checkFalsy: true })
        .withMessage('Audio is required.'),
    handleValidationErrors
];

//create song
router.post('/', requireAuth, validateSong, async (req, res, next) => {
    const { title, description, url, imageUrl, albumId } = req.body
    const { user } = req;

    if(albumId === null){
        const song = await Song.create({
            artistId: user.id,
            title,
            description,
            url,
            imageUrl,
            albumId
        })

        return res.json(song)
    } else {
        const album = await Album.findByPk(albumId)
        if (album) {
            if (album.artistId !== user.id) {
                const err = new Error('User not authorized to edit album.');
                err.status = 403;
                err.title = 'User not authorized to edit album.';
                err.errors = ['User not authorized to edit album.'];
                return next(err)
            } else {
                const song = await Song.create({
                    artistId: user.id,
                    title,
                    description,
                    url,
                    imageUrl,
                    albumId
                })

                return res.json(song)
            }
        } else {
            const err = new Error("Album couldn't be found.");
            err.status = 404;
            err.title = "Album couldn't be found.";
            err.errors = ["Album couldn't be found."];
            return next(err)
        }
    }

})

//create comment
router.post('/:songId/comments', requireAuth, validateComment, async (req, res, next) => {
    const { body } = req.body
    const { user } = req;
    const { songId } = req.params
    const song = await Song.findByPk(songId)
    if (song) {
        const comment = await Comment.create({
            userId: user.id,
            songId,
            body
        })

        return res.json(comment)
    } else {
        const err = new Error("Song couldn't be found.");
        err.status = 404;
        err.title = "Song couldn't be found.";
        err.errors = ["Song couldn't be found."];
        return next(err)
    }

})

//get all songs
router.get('/', async (req, res) => {

    const songs = await Song.findAll();

    if (!songs) throw new Error('No songs found');

    return res.json({ songs });
});

//get all songs by current user
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;

    const songs = await Song.findAll({
        where: {
            artistId: user.id
        }
    })

    if (songs.length === 0) throw new Error('No songs found');

    return res.json({ songs });
}
);
//get details of song by song id
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

//delete song by current user
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

//get comments of song by song id
router.get('/:songId/comments', async (req, res, next) => {
    const { songId } = req.params;

    const comments = await Comment.findAll({
        where: {
            songId: songId
        },
        include: [{
            model: User,
            attributes: ['id', 'username',],
        }],
    })
    const song = await Song.findByPk(songId)
    if (song) {
        if (comments.length !== 0) {
            return res.json({ comments })
        } else {
            const err = new Error("No comments found.");
            err.status = 404;
            err.title = "No comments found.";
            err.errors = ["No comments found."];
            return next(err)
        }
    } else {
        const err = new Error("Song couldn't be found.");
        err.status = 404;
        err.title = "Song couldn't be found.";
        err.errors = ["Song couldn't be found."];
        return next(err)
    }
});
module.exports = router;
