const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Song, Artist, Album, Comment, Playlist, User } = require('../../db/models');



const router = express.Router();

//delete comment by current user
router.delete('/:commentId', requireAuth, async (req, res, next) => {
    const { commentId } = req.params;
    const { user } = req;

    const comment = await Comment.findOne({ where: { id: commentId } })

    if (comment) {
        if (comment.userId !== user.id) {
            const err = new Error('User not authorized to delete comment.');
            err.status = 403;
            err.title = 'User not authorized to delete comment.';
            err.errors = ['User not authorized to delete comment.'];
            return next(err)
        } else {
            await Comment.destroy({ where: { id: commentId } });
            return res.json({ message: 'Successfully deleted' });
        }
    } else {
        const err = new Error("Comment couldn't found.");
        err.status = 404;
        err.title = "Comment couldn't found.";
        err.errors = ["Comment couldn't found."];
        return next(err)
    }
});

module.exports = router;
