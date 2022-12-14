const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Tweet, User, Comment, Retweet, Like, Follow } = require('../../db/models');
const { singlePublicFileUpload, singleMulterUpload } = require('../../aws-sdk.js')
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();



//================== GET ALL COMMENTS =================//
router.get('/tweets/:tweetId', requireAuth, async (req, res, next) => {
    const { tweetId } = req.params;
    const comments = await Comment.findAll({
        where: {
            tweetId
        }
    });

    if (comments) {
        // tweet.dataValues.createdAt1 = tweet.dataValues.createdAt

        res.status(200)
        return res.json({ Comments: comments })
    } else {
        const err = new Error("Could not find a tweet with the specified id.");
        err.message = "Could not find a tweet with the specified id.";
        err.status = 404;
        return next(err);
    }
})

const validateComment = [
    check('comment')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a comment."),
    handleValidationErrors
];

//================== CREATE A COMMENT =================//
router.post('/tweets/:tweetId', singleMulterUpload("image"), requireAuth, validateComment, async (req, res, next) => {
    let { comment, gif } = req.body;

    const { tweetId } = req.params;


    const tweet = await Tweet.findByPk(tweetId);

    if (tweet) {

        let newComment;
        let commentImg;

        if (req.file) {
            commentImg = await singlePublicFileUpload(req.file);

            newComment = await Comment.create({
                userId: req.user.id,
                tweetId,
                comment,
                image: commentImg,
                gif: null
            })
        } else {
            if (gif !== null) {
                newComment = await Comment.create({
                    userId: req.user.id,
                    tweetId,
                    comment,
                    image: null,
                    gif
                })
            } else {
                newComment = await Comment.create({
                    userId: req.user.id,
                    tweetId,
                    comment,
                    image: null,
                    gif: null
                })
            }
        }

        res.status(200)
        return res.json(newComment)

    } else {
        const err = new Error("Could not find a tweet with the specified id.");
        err.message = "Could not find a tweet with the specified id.";
        err.status = 404;
        return next(err);
    }
})

//===================== EDIT A COMMENT ===================//
router.put('/:commentId/tweets/:tweetId', validateComment, requireAuth, async (req, res, next) => {
    const { commentId, tweetId } = req.params;
    const { comment } = req.body;

    const tweet = await Tweet.findByPk(tweetId)
    const editComment = await Comment.findByPk(commentId)



    if (tweet) {
        if (editComment.userId === req.user.id) {
            editComment.comment = comment;
            await editComment.save()
            res.status(200)
            return res.json(editComment)
        } else {
            const err = new Error("Cannot edit a comments that is not yours.");
            err.message = "Cannot edit a comments that is not yours.";
            err.status = 404;
            return next(err);
        }
    } else {
        const err = new Error("Could not find a Tweet with the specified id.");
        err.message = "Could not find a Tweet with the specified id.";
        err.status = 404;
        return next(err);
    }
})

//=================== DELETE COMMENT ===================//
router.delete('/:commentId/tweets/:tweetId', requireAuth, async (req, res, next) => {
    const { commentId, tweetId } = req.params;
    const tweet = await Tweet.findByPk(tweetId)
    const findComment = await Comment.findByPk(commentId)

    if (tweet) {
        if (findComment.userId === req.user.id) {
            await findComment.destroy()
            res.status(200)
            return res.json(findComment)
        } else {
            const err = new Error("Cannot delete a comment that is not yours!");
            err.message = "Cannot delete a comment that is not yours!";
            err.status = 404;
            return next(err);
        }
    } else {
        const err = new Error("Could not find a Tweet with the specified id.");
        err.message = "Could not find a Tweet with the specified id .";
        err.status = 404;
        return next(err);
    }
})

module.exports = router;
