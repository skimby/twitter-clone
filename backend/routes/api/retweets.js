const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Tweet, User, Comment, Retweet, Like } = require('../../db/models');

const router = express.Router();

//================== GET RETWEETS =================//
router.get('/tweets/:tweetId', requireAuth, async (req, res, next) => {
    const { tweetId } = req.params;
    const tweet = await Tweet.findByPk(tweetId)

    if (tweet) {
        const retweets = await Retweet.findAll({
            where: {
                tweetId
            }
        })

        res.status(200)
        return res.json(retweets)

    } else {
        const err = new Error("Could not find a Tweet with the specified id.");
        err.message = "Could not find a Tweet with the specified id.";
        err.status = 404;
        return next(err);
    }
})

//================== CREATE A RETWEET =================//
router.post('/tweets/:tweetId', requireAuth, async (req, res, next) => {
    const { tweetId } = req.params;
    const tweet = await Tweet.findByPk(tweetId)
    const existingRetweet = await Retweet.findOne({
        where: {
            userId: req.user.id,
            tweetId
        }
    })

    if (tweet) {
        if (existingRetweet) {
            const err = new Error("Cannot like a retweet twice.");
            err.message = "Cannot like a retweet twice.";
            err.status = 404;
            return next(err);
        } else {
            const retweet = await Retweet.create({
                userId: req.user.id,
                tweetId: parseInt(tweetId)
            })
            res.status(200)
            return res.json(retweet)
        }
    } else {
        const err = new Error("Could not find a Tweet with the specified id.");
        err.message = "Could not find a Tweet with the specified id.";
        err.status = 404;
        return next(err);
    }
})


//=========== GET RETWEETS BY USER ID =============//
router.get('/users/:userId', requireAuth, async (req, res, next) => {
    const { userId } = req.params;
    const retweets = await Retweet.findAll({
        where: {
            userId
        }
    })

    const retweetIds = []
    retweets.map(retweet => {
        retweetIds.push(retweet.tweetId)
    })

    // res.json(retweetIds)

    const retweetedTweets = await Tweet.findAll({
        where: {
            id: retweetIds
        },
        include: [{
            model: User
        }]
    })

    // res.json(retweetedTweets)

    let resTweets = []
    for (let i = 0; i < retweetedTweets.length; i++) {
        let tweet = retweetedTweets[i];

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


//===================== UNRETWEET (DELETE) ===================//
router.delete('/:retweetId/tweets/:tweetId', requireAuth, async (req, res, next) => {
    const { retweetId, tweetId } = req.params;
    const tweet = await Tweet.findByPk(tweetId)
    const existingRetweet = await Retweet.findByPk(retweetId)

    if (tweet) {
        if (existingRetweet) {
            const retweet = await existingRetweet.destroy();
            res.status(200)
            return res.json(retweet)
        } else {
            const err = new Error("Cannot undo a retweet you do not already retweeted.");
            err.message = "Cannot undo a retweet you do not already retweeted.";
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
