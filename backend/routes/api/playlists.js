const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Song, Artist, Album, Comment, Playlist, User } = require('../../db/models');

const router = express.Router();

// //get details of a playlist by id
// router.get('/:playlistId', async (req, res, next) => {
//     const { playlistId } = req.params;

//     const playlist = await Playlist.findOne({
//         where: {
//             id: playlistId
//         },
//         include: {
//             model: Song,
//         }
//     })

//     if (playlist) {
//         return res.json(playlist)
//     } else {
//         const err = new Error("Playlist couldn't be found.");
//         err.status = 404;
//         err.title = "Playlist couldn't be found.";
//         err.errors = ["Playlist couldn't be found."];
//         return next(err)
//     }
// });

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

    return res.json({playlists});
}
);

module.exports = router;
