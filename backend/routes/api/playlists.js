const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Song, Artist, Album, Comment, Playlist, User, SongPlaylist } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');

const router = express.Router();

const validatePlaylist = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Playlist name is required.'),
    handleValidationErrors
];

//create playlist
router.post('/', requireAuth, validatePlaylist, async (req, res, next) => {
    const { name, imageUrl } = req.body
    const { user } = req;

    const newPlaylist = await Playlist.create({
        userId: user.id,
        name,
        imageUrl
    })

    res.status(201)
    return res.json(newPlaylist)
})

//delete playlist by current user
router.delete('/:playlistId', requireAuth, async (req, res, next) => {
    const { playlistId } = req.params;
    const { user } = req;

    const playlist = await Playlist.findOne({ where: { id: playlistId } })

    if (playlist) {
        if (playlist.userId !== user.id) {
            const err = new Error('User not authorized to delete playlist.');
            err.status = 403;
            err.title = 'User not authorized to delete playlist.';
            err.errors = ['User not authorized to delete playlist.'];
            return next(err)
        } else {
            await Playlist.destroy({ where: { id: playlistId } });
            return res.json({ message: 'Successfully deleted' });
        }
    } else {
        const err = new Error('Playlist not found.');
        err.status = 404;
        err.title = 'Playlist not found.';
        err.errors = ['Playlist not found.'];
        return next(err)
    }
});

//get all playlists by current user
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;

    const playlists = await Playlist.findAll({
        where: {
            userId: user.id
        }
    })

    if (playlists.length === 0) throw new Error('No songs found');

    return res.json({ playlists });
}
);

//get details of a playlist by id
router.get('/:playlistId', async (req, res, next) => {
    const { playlistId } = req.params;

    const playlist = await Playlist.findOne({
        where: {
            id: playlistId
        },
        include: {
            model: Song,
            through: { //through with empty attributes array excludes the SongPlaylist object
                attributes: [] //add attributes to array to include properties from SongPlaylist object
            },
        }
    })

    if (playlist) {
        return res.json(playlist)
    } else {
        const err = new Error("Playlist couldn't be found.");
        err.status = 404;
        err.title = "Playlist couldn't be found.";
        err.errors = ["Playlist couldn't be found."];
        return next(err)
    }
});

//add song to playlist by playlist id
router.post('/:playlistId/songs', requireAuth, async (req, res, next) => {
    const { playlistId } = req.params;
    const { songId } = req.body
    const { user } = req;

    const playlist = await Playlist.findOne({
        where: {
            id: playlistId
        }
    })

    const song = await Song.findOne({
        where: {
            id: songId
        }
    })

    if (playlist) {
        if (song) {
            if (playlist.userId !== user.id) {
                const err = new Error('User not authorized to modify playlist.');
                err.status = 403;
                err.title = 'User not authorized to modify playlist.';
                err.errors = ['User not authorized to modify playlist.'];
                return next(err)
            } else {
                await SongPlaylist.create(
                    {
                        playlistId: playlist.id,
                        songId: song.id
                    }
                )
                const newPlaylistSong = await SongPlaylist.findOne({
                    where: {
                        playlistId: playlist.id,
                        songId: song.id
                    },
                    attributes: ['id', 'playlistId', 'songId']
                })

                return res.json(newPlaylistSong)
            }
        } else {
            const err = new Error("Song couldn't be found.");
            err.status = 404;
            err.title = "Song couldn't be found.";
            err.errors = ["Song couldn't be found."];
            return next(err)
        }
    } else {
        const err = new Error("Playlist couldn't be found.");
        err.status = 404;
        err.title = "Playlist couldn't be found.";
        err.errors = ["Playlist couldn't be found."];
        return next(err)
    }
});
module.exports = router;
