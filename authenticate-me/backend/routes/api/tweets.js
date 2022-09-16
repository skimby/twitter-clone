const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Tweet, User, Comment, Retweet, Like, Follow } = require('../../db/models')
const { check } = require("express-validator");

const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

//=======================================//
const validateLogin = [
    check("credential")
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Please provide a valid email or username."),
    check("password")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a password."),
    handleValidationErrors
];


router.get('/feed', requireAuth, async (req, res, next) => {
    const userId = req.user.id;

    const followers = await Follow.findAll({
        where: {
            userId
        }
    })

    const tweets = []
    for (let i = 0; i < followers.length; i++) {
        let follower = followers[i]
        const tweet = await Tweet.findAll({
            where: {
                userId: follower.userId
            },
            include: [{
                model: User,
                attributes: ['id', 'firstName', 'profileImage', 'username', 'verified']
            }]
        })
        tweets.push(tweet)
    }

    const tweets2 = []
    for (let i = 0; i < tweets[0].length; i++) {
        let tweet = tweets[0][i];
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
        tweets2.push(tweet)
    }

    return res.json({
        Tweets: tweets2
    })

})
module.exports = router;
