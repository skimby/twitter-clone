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
const { Op } = require("sequelize");

//=========== GET LIKES BY USER ID =============//
router.get('/users/:userId', requireAuth, async (req, res, next) => {
    const { userId } = req.params;
    const likes = await Like.findAll({
        where: {
            userId
        }
    })
    const likeIds = []

    likes.map(like => {
        likeIds.push(like.tweetId)
    })

    const likedTweets = await Tweet.findAll({
        where: {
            id: likeIds,
        },
        include: [{
            model: User
        }]
    })

    let resTweets = []
    for (let i = 0; i < likedTweets.length; i++) {
        let tweet = likedTweets[i];

        tweet.dataValues.createdAt1 = tweet.dataValues.createdAt
        tweet.dataValues.createdAt = tweet.dataValues.createdAt.toDateString().toString().split(' ');
        tweet.dataValues.updatedAt = tweet.dataValues.updatedAt.toDateString().toString().split(' ');
        resTweets.push(tweet)

        const comments = await Comment.findAndCountAll({
            where: {
                tweetId: tweet.id
            }
        })
        const retweets = await Retweet.findAndCountAll({
            where: {
                tweetId: tweet.id
            }
        })
        const likes = await Like.findAndCountAll({
            where: {
                tweetId: tweet.id
            }
        })

        tweet.dataValues.commentCount = comments.count;
        tweet.dataValues.retweetCount = retweets.count;
        tweet.dataValues.likeCount = likes.count;
        tweet.dataValues.likes = likes.rows;
        tweet.dataValues.retweets = retweets.rows;

    }

    res.status(200)
    return res.json(resTweets)
})

//===================== UNLIKE (DELETE) ===================//
router.delete('/:likeId/tweets/:tweetId', requireAuth, async (req, res, next) => {
    const { tweetId, likeId } = req.params;
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

            const likeInfo = await Like.findAndCountAll({
                where: {
                    id: like.id
                }
            })



            existingLike.dataValues.likeCount = likeInfo.count;
            console.log('----')
            console.log(existingLike)

            res.status(200)
            return res.json(existingLike)
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
