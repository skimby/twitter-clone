const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Tweet, User, Comment, Retweet, Like, Follow } = require('../../db/models');
const user = require("../../db/models/user");

const router = express.Router();

//=========== GET LIKES FOR TWEET BY TWEET ID =============//
router.get('/tweets/:tweetId', requireAuth, async (req, res, next) => {
    const { tweetId } = req.params;
    const tweet = await Tweet.findByPk(tweetId)

    if (tweet) {
        const likes = await Like.findAll({
            where: {
                tweetId
            }
        })

        res.status(200)
        return res.json(likes)

    } else {
        const err = new Error("Could not find a Tweet with the specified id.");
        err.message = "Could not find a Tweet with the specified id.";
        err.status = 404;
        return next(err);
    }
})




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
                tweetId: parseInt(tweetId)
            })
            res.status(200)
            return res.json(like)
        }
    } else {
        const err = new Error("Could not find a Tweet with the specified id.");
        err.message = "Could not find a Tweet with the specified id.";
        err.status = 404;
        return next(err);
    }
})

//=========== GET LIKES BY USER ID =============//
router.get('/users/:userId', requireAuth, async (req, res, next) => {
    const { userId } = req.params;

    const likes = await Like.findAll({
        where: {
            userId
        },
        include: [{
            model: Tweet,
            include: [{
                model: User
            }]
        }]
    })
    // res.json(likes)



    likes.forEach(async (like) => {
        like.dataValues.Tweet.dataValues.createdAt1 = like.dataValues.Tweet.dataValues.createdAt
        like.dataValues.Tweet.dataValues.createdAt = like.dataValues.Tweet.dataValues.createdAt.toDateString().toString().split(' ');
        like.dataValues.Tweet.dataValues.updatedAt = like.dataValues.Tweet.dataValues.updatedAt.toDateString().toString().split(' ');
    })

    res.status(200)
    return res.json(likes)
})

//===================== UNLIKE (DELETE) ===================//
router.delete('/:likeId/tweets/:tweetId', requireAuth, async (req, res, next) => {
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
        const err = new Error("Could not find a Tweet with the specified id.");
        err.message = "Could not find a Tweet with the specified id.";
        err.status = 404;
        return next(err);
    }
})

module.exports = router;
