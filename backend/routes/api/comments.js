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

//edit comment
router.put('/:commentId', requireAuth, validateComment, async (req, res, next) => {
    const { body } = req.body
    const { commentId } = req.params
    const { user } = req;

    const comment = await Comment.findOne({
        where: {
            id: commentId
        }
    })

    if (comment) {
        if (comment.userId !== user.id) {
            const err = new Error('User not authorized to edit comment.');
            err.status = 403;
            err.title = 'User not authorized to edit comment.';
            err.errors = ['User not authorized to edit comment.'];
            return next(err)
        } else {
            comment.set({
                body
            })
            return res.json(comment)
        }
    } else {
        const err = new Error("Comment couldn't be found.");
        err.status = 404;
        err.title = "Comment couldn't be found.";
        err.errors = ["Comment couldn't be found."];
        return next(err)
    }
})

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
