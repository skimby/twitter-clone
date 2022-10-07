const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Tweet, Retweet } = require('../../db/models');

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
