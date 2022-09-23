const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Tweet, User, Comment, Retweet, Like, Follow } = require('../../db/models');
const user = require("../../db/models/user");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

//================== VALIDATORS =====================//
const validateTweet = [
    check("tweet")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a tweet."),
    handleValidationErrors
];


//================== CREATE A TWEET =================//
router.post('/create', requireAuth, validateTweet, async (req, res, next) => {
    let { tweet, image, gif } = req.body;

    if (image === undefined) image = null;
    if (gif === undefined) gif = null;

    const newTweet = await Tweet.create({
        userId: req.user.id,
        tweet,
        image,
        gif
    })

    const user = await User.findByPk(req.user.id);
    newTweet.dataValues.User = user

    res.status(201)
    return res.json(newTweet)
})


//==== FEED PAGE: GET ALL TWEETS FROM FOLLOWED USERS ONLY =====//
router.get('/feed', requireAuth, async (req, res, next) => {
    const userId = req.user.id;

    const followers = await Follow.findAll({
        where: {
            userId
        }
    })
    followers.push({ followerId: req.user.id })

    const tweets = []
    for (let i = 0; i < followers.length; i++) {
        let follower = followers[i]

        const tweet = await Tweet.findAll({
            where: {
                userId: follower.followerId
            },
            include: [{
                model: User,
                attributes: ['id', 'firstName', 'profileImage', 'username', 'verified']
            }]
        })
        tweets.push(...tweet)
    }

    const tweets2 = []
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
        const err = new Error("Could not find a tweet with the specified id.");
        err.message = "Could not find a tweet with the specified id.";
        err.status = 404;
        return next(err);
    }
})


//===================== EDIT A TWEET ===================//
router.put('/:tweetId', requireAuth, validateTweet, async (req, res, next) => {
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
            const err = new Error("Cannot edit a tweet that is not yours.");
            err.message = "Cannot edit a tweet that is not yours.";
            err.status = 404;
            return next(err);
        }
    } else {
        const err = new Error("Could not find a tweet with the specified id.");
        err.message = "Could not find a tweet with the specified id.";
        err.status = 404;
        return next(err);
    }
})


//============== GET ALL TWEETS BY USER ID ===============//
router.get('/users/:userId', requireAuth, async (req, res, next) => {
    const userId = req.user.id
    const user = await User.findByPk(userId);

    if (user) {
        const tweets = await Tweet.findAll({
            where: {
                userId
            },
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
    } else {
        const err = new Error("Could not find a user with that id.");
        err.message = "Could not find a user with that id.";
        err.status = 404;
        return next(err);
    }
})

//================== DELETE A TWEET =================//
router.delete('/:tweetId/delete', requireAuth, async (req, res, next) => {
    const { tweetId } = req.params;
    const tweet = await Tweet.findByPk(tweetId);

    console.log(tweet)
    if (tweet) {
        const deletedTweet = await tweet.destroy();
        res.status(201)
        return res.json(deletedTweet)
    } else {
        const err = new Error("Could not find a Tweet with the specified id.");
        err.message = "Could not find a Tweet with the specified id.";
        err.status = 404;
        return next(err);
    }
})



module.exports = router;
