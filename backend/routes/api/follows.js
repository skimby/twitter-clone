const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Tweet, User, Comment, Retweet, Like, Follow } = require('../../db/models')
const { check } = require("express-validator");

const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();


//====== GET USERS THAT LOGGED USER FOLLOWS (FOLLOWS) ================//
router.get('/users/me', requireAuth, async (req, res, next) => {
    const user = await User.findByPk(req.user.id);

    if (user) {
        const follows = await Follow.findAll({
            where: {
                userId: req.user.id
            },
            include: [{
                model: User, as: 'Following',
                attributes: ['id', 'firstName', 'profileImage', 'username', 'bio', 'verified']
            }]
        })
        res.status(200)

        return res.json({
            LoggedUserFollowing: follows
        })
    } else {
        const err = new Error("Could not find the logged User.");
        err.message = "Could not find the logged User.";
        err.status = 401;
        return next(err);
    }
})

//=============== GET FOLOWERS ================//
router.get('/users/:userId/followers', requireAuth, async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findByPk(userId);

    if (user) {
        const follows = await Follow.findAll({
            where: {
                followerId: userId
            },
            include: [{
                model: User, as: 'Follower',
                attributes: ['id', 'firstName', 'profileImage', 'username', 'bio', 'verified']
            }]
        })
        res.status(200)
        return res.json({
            Following: follows
        })

    } else {
        const err = new Error("Could not find a User with the specified id.");
        err.message = "Could not find a User with the specified id.";
        err.status = 401;
        return next(err);
    }
})

//================= GET FOLLOWS ================//
router.get('/users/:userId/following', requireAuth, async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findByPk(userId);

    if (user) {
        const follows = await Follow.findAll({
            where: {
                userId
            },
            include: [{
                model: User, as: 'Following',
                attributes: ['id', 'firstName', 'profileImage', 'username', 'bio', 'verified']
            }]
        })
        res.status(200)
        return res.json({
            Following: follows
        })
    } else {
        const err = new Error("Could not find a User with the specified id.");
        err.message = "Could not find a User with the specified id.";
        err.status = 401;
        return next(err);
    }
})
const { Op } = require("sequelize");

//================= GET NON-FOLLOWERS ================//
router.get('/users/:userId/nonFollowers', requireAuth, async (req, res, next) => {
    const { userId } = req.params;
    const allUsers = await User.findAll({

    })

    const follows = await Follow.findAll({
        where: {
            userId
        },
        include: [{
            model: User, as: 'Follower',
            attributes: ['id', 'firstName', 'profileImage', 'username', 'bio', 'verified']
        }]
    })


    const nonFollowers = []
    for (let i = 0; i < allUsers.length; i++) {
        const isFollowed = follows.find(follow => allUsers[i].id === follow.followerId)
        if ((!isFollowed) && (allUsers[i].id !== +userId)) {
            nonFollowers.push(allUsers[i])
        }
    }

    const uniqueUsers = [...new Set(nonFollowers)];

    res.status(200)
    return res.json({
        // test: [allUsers, follows]
        nonFollowers: uniqueUsers
        // nonFollowers: nonFollowers

    })
})

//============= FOLLOW A USER (CREATE FOLLOW) ================//
router.post('/users/:userId/follow', requireAuth, async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findByPk(userId)
    const existingFollow = await Follow.findOne({
        where: {
            userId: req.user.id,
            followerId: parseInt(userId)
        }
    })

    if (user) {
        if (existingFollow) {
            const err = new Error("Cannot follow a user twice.");
            err.message = "Cannot follow a user twice.";
            err.status = 404;
            return next(err);
        } else {
            const follow = await Follow.create({
                userId: req.user.id,
                followerId: parseInt(userId)
            })

            const newFollow = await Follow.findOne({
                where: {
                    id: follow.id
                },
                include: [{
                    model: User, as: 'Following',
                    attributes: ['id', 'firstName', 'profileImage', 'username', 'bio', 'verified']
                }]
            })
            res.status(200)
            return res.json(newFollow)
        }
    } else {
        const err = new Error("Could not find a User with the specified id.");
        err.message = "Could not find a User with the specified id.";
        err.status = 401;
        return next(err);
    }

})

//============== UNFOLLOW A USER (DELETE FOLLOW) =============//
router.delete('/users/:userId/unfollow', requireAuth, async (req, res, next) => {
    let { userId } = req.params;
    userId = parseInt(userId)
    const user = await User.findByPk(req.user.id)
    const existingFollow = await Follow.findOne({
        where: {
            userId: req.user.id,
            followerId: userId
        }
    })

    if (user) {
        if (existingFollow) {

            const follow = await Follow.findOne({
                where: {
                    followerId: userId
                },
                include: [{
                    model: User, as: 'Following',
                    attributes: ['id', 'firstName', 'profileImage', 'username', 'bio', 'verified']
                }]
            })
            const deletedFollow = await existingFollow.destroy();

            res.status(200)
            return res.json(follow)
        } else {
            const err = new Error("Cannot unfollow a user you do not already follow.");
            err.message = "Cannot unfollow a user you do not already follow.";
            err.status = 404;
            return next(err);
        }
    } else {
        const err = new Error("Could not find a User with the specified id.");
        err.message = "Could not find a User with the specified id.";
        err.status = 404;
        return next(err);
    }
})

module.exports = router;
