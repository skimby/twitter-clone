const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Tweet, User, Comment, Retweet, Like, Follow } = require('../../db/models');
const user = require("../../db/models/user");

const router = express.Router();

//================== CREATE A TWEET =================//
router.post('/create', requireAuth, async (req, res, next) => {
    const { tweet, image, gif } = req.body;

    const newTweet = await Tweet.create({
        userId: req.user.id,
        tweet,
        image,
        gif
    })
    res.status(201)
    return res.json(newTweet)
})

//===================== EDIT A TWEET ===================//
router.put('/:tweetId', requireAuth, async (req, res, next) => {
    const { tweetId } = req.params;
    const { tweet } = req.body;
    const findTweet = await Tweet.findByPk(tweetId);

    if (findTweet) {
        if (findTweet.userId === req.user.id) {
            findTweet.tweet = tweet
            await findTweet.save();
            res.status(201)
            return res.json(findTweet)
        } else {
            const err = new Error("Cannot edit a tweet that is not yours!");
            err.message = "Cannot edit a tweet that is not yours!";
            err.status = 404;
            return next(err);
        }
    } else {
        const err = new Error("Tweet with that id does not exist.");
        err.message = "Tweet with that id does not exist.";
        err.status = 404;
        return next(err);
    }
})

//==== FEED PAGE: GET ALL TWEETS FROM FOLLOWED USERS ONLY =====//
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

    res.status(200)
    return res.json({
        Tweets: tweets2
    })

})

//========== EXPLORER PAGE: GET ALL TWEETS ============//
router.get('/explore', requireAuth, async (req, res, next) => {
    const tweets = await Tweet.findAll({
        attributes: ['id', 'userId', 'tweet', 'image', 'gif', 'createdAt', 'updatedAt'],
        include: [{
            model: User,
            attributes: ['id', 'firstName', 'profileImage', 'username', 'verified']
        }]
    })

    for (let i = 0; i < tweets.length; i++) {
        let tweet = tweets[i];
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
    }
    res.status(200)
    return res.json({
        Tweets: tweets
    })

})

//============== GET ALL TWEETS BY USER ID ===============//
router.get('/users/:userId', requireAuth, async (req, res, next) => {
    const userId = req.user.id
    const tweets = await Tweet.findAll({
        where: {
            userId
        }
    })

    for (let i = 0; i < tweets.length; i++) {
        let tweet = tweets[i];
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
    }

    res.status(200)
    return res.json({
        Tweet: tweets
    })
})

//=========== GET TWEET BY ID / GET ALL COMMENTS ============//
router.get('/:tweetId', async (req, res, next) => {
    const { tweetId } = req.params;
    const tweet = await Tweet.findOne({
        where: {
            id: tweetId
        },
        include: [{
            model: User,
            attributes: ['id', 'firstName', 'profileImage', 'username', 'verified']
        }, {
            model: Comment,
            include: [{
                model: User,
                attributes: ['id', 'firstName', 'profileImage', 'username', 'verified']
            }]
        }]
    })

    if (tweet) {
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

        res.status(200)
        res.json({
            Tweet: tweet
        })
    } else {
        const err = new Error("Tweet with that id does not exist.");
        err.message = "Tweet with that id does not exist.";
        err.status = 404;
        return next(err);
    }
})

module.exports = router;
