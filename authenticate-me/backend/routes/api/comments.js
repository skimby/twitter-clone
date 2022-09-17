const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Tweet, User, Comment, Retweet, Like, Follow } = require('../../db/models');
const user = require("../../db/models/user");

const router = express.Router();

//================== CREATE A COMMENT =================//
router.post('/tweets/:tweetId', requireAuth, async (req, res, next) => {
    const { tweetId } = req.params;
    const { comment, image, gif } = req.body;
    const tweet = await Comment.create({
        userId: req.user.id,
        tweetId,
        comment,
        image,
        gif
    })

    res.status(200)
    return res.json(tweet)
})

//===================== EDIT A COMMENT ===================//
router.put('/tweets/:tweetId', requireAuth, async (req, res, next) => {
    const { tweetId } = req.params;
    const { comment } = req.body;
    const tweet = await Comment.findByPk(tweetId)

    if (tweet) {
        tweet.comment = comment;
        await tweet.save()
        res.status(200)
        return res.json(tweet)
    } else {
        const err = new Error("Cannot edit a comments that is not yours!");
        err.message = "Cannot edit a comments that is not yours!";
        err.status = 404;
        return next(err);
    }
})

//==== FEED PAGE: GET ALL TWEETS FROM FOLLOWED USERS ONLY =====//


module.exports = router;
