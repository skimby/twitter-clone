const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Tweet, User, Comment, Retweet, Like, Follow } = require('../../db/models');
const user = require("../../db/models/user");

const router = express.Router();

//================== CREATE A LIKE =================//
router.post('/tweets/:tweetId', requireAuth, async (req, res, next) => {
    const { tweetId } = req.params;
    const tweet = await Tweet.findByPk(tweetId)
    const existingLike = await Like.findOne({
        where: {
            userId: req.user.id,
            tweetId
        }
    })

    if (tweet) {
        if (existingLike) {
            const err = new Error("Cannot like a tweet twice.");
            err.message = "Cannot like a tweet twice.";
            err.status = 404;
            return next(err);
        } else {
            const like = await Like.create({
                userId: req.user.id,
                tweetId
            })
            res.status(200)
            return res.json(like)
        }
    } else {
        const err = new Error("Tweet with that id cannot be found.");
        err.message = "Tweet with that id cannot be found.";
        err.status = 404;
        return next(err);
    }
})

//===================== UNLIKE (DELETE) ===================//
router.delete('/:likeId/tweets/:tweetId', requireAuth, async (req, res, next) => {
    const { likeId, tweetId } = req.params;
    const tweet = await Tweet.findByPk(tweetId)
    const existingLike = await Like.findByPk(likeId)

    if (tweet) {
        if (existingLike) {
            const like = await existingLike.destroy();
            res.status(200)
            return res.json(like)
        } else {
            const err = new Error("Cannot unlike a tweet you do not already like.");
            err.message = "Cannot unlike a tweet you do not already like.";
            err.status = 404;
            return next(err);

        }
    } else {
        const err = new Error("Tweet with that id cannot be found.");
        err.message = "Tweet with that id cannot be found.";
        err.status = 404;
        return next(err);
    }
})

module.exports = router;
