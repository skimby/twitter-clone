const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Tweet, User, Comment, Retweet, Like, Follow } = require('../../db/models');
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();
const { singlePublicFileUpload, singleMulterUpload } = require('../../aws-sdk.js')
const fetch = require('node-fetch');


//================== VALIDATORS =====================//
const validateTweet = [
    check("tweet")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a tweet."),
    handleValidationErrors
];


//================== CREATE A TWEET =================//
router.post('/create', singleMulterUpload("image"), requireAuth, validateTweet, async (req, res, next) => {
    let { tweet, gif } = req.body;


    let twitterImg;
    let newTweet;

    if (req.file) {
        twitterImg = await singlePublicFileUpload(req.file);

        newTweet = await Tweet.create({
            userId: req.user.id,
            tweet,
            image: twitterImg,
            gif: null
        })

    } else {
        if (gif !== null) {
            newTweet = await Tweet.create({
                userId: req.user.id,
                tweet,
                image: null,
                gif
            })

        } else {
            newTweet = await Tweet.create({
                userId: req.user.id,
                tweet,
                image: null,
                gif: null
            })
        }
    }

    newTweet.dataValues.createdAt = newTweet.dataValues.createdAt.toDateString().toString().split(' ');
    newTweet.dataValues.updatedAt = newTweet.dataValues.updatedAt.toDateString().toString().split(' ');

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
            }],
            order: [
                ['updatedAt', 'DESC']
            ]
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
        tweet.dataValues.createdAt = tweet.dataValues.createdAt.toDateString().toString().split(' ');
        tweet.dataValues.updatedAt = tweet.dataValues.updatedAt.toDateString().toString().split(' ');
        tweet.dataValues.commentCount = comments.count;
        tweet.dataValues.retweetCount = retweets.count;
        tweet.dataValues.likeCount = likes.count;
        tweet.dataValues.likes = likes.rows;

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
        tweet.dataValues.createdAt = tweet.dataValues.createdAt.toDateString().toString().split(' ');
        tweet.dataValues.updatedAt = tweet.dataValues.updatedAt.toDateString().toString().split(' ');
        tweet.dataValues.commentCount = comments.count;
        tweet.dataValues.retweetCount = retweets.count;
        tweet.dataValues.likeCount = likes.count;
        tweet.dataValues.likes = likes.rows;

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
            id: parseInt(tweetId)
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
    const following = await Follow.findAndCountAll({
        where: {
            userId: tweet.User.id
        }
    })
    const followers = await Follow.findAndCountAll({
        where: {
            followerId: tweet.User.id
        }
    })
    const tweets = await Tweet.findAndCountAll({
        where: {
            userId: tweet.User.id
        }
    })


    tweet.dataValues.User.dataValues.tweetCount = tweets.count
    tweet.dataValues.User.dataValues.followingCount = following.count
    tweet.dataValues.User.dataValues.followerCount = followers.count


    tweet.dataValues.createdAt = tweet.dataValues.createdAt.toDateString().toString().split(' ');
    tweet.dataValues.updatedAt = tweet.dataValues.updatedAt.toDateString().toString().split(' ');

    tweet.dataValues.Comments.forEach(comment => {
        comment.dataValues.createdAt = comment.dataValues.createdAt.toDateString().toString().split(' ');
        comment.dataValues.updatedAt = comment.dataValues.updatedAt.toDateString().toString().split(' ');
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
        tweet.dataValues.likes = likes.rows;


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
    const { userId } = req.params;
    const user = await User.findByPk(userId);

    if (user) {
        const tweets = await Tweet.findAll({
            where: {
                userId
            },
            include: [{
                model: User,
                attributes: ['id', 'firstName', 'profileImage', 'username', 'verified']
            }],
            order: [
                ['createdAt', 'DESC'],
            ]
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
            tweet.dataValues.createdAt1 = tweet.dataValues.createdAt
            tweet.dataValues.createdAt = tweet.dataValues.createdAt.toDateString().toString().split(' ');
            tweet.dataValues.updatedAt = tweet.dataValues.updatedAt.toDateString().toString().split(' ');
            tweet.dataValues.commentCount = comments.count;
            tweet.dataValues.retweetCount = retweets.count;
            tweet.dataValues.likeCount = likes.count;
            tweet.dataValues.likes = likes.rows;

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

//================== SEARCH GIPHY API =================//
router.get('/search/:query', requireAuth, async (req, res, next) => {
    let { query } = req.params;
    const search = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${query}&limit=30`;

    const promise = await fetch(search)
        .then((response) => {
            return response.json()
        }).then((json) => {
            return json
        })
        .catch((err) => {
            return err.message
        })


    return await res.json(promise.data)

})

//================== DELETE A TWEET =================//
router.delete('/:tweetId/delete', requireAuth, async (req, res, next) => {
    const { tweetId } = req.params;
    const tweet = await Tweet.findByPk(tweetId);

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
