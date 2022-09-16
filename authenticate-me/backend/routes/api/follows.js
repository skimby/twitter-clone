const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Tweet, User, Comment, Retweet, Like, Follow } = require('../../db/models')
const { check } = require("express-validator");

const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();
// import fetch from "node-fetch";
// const { fetch } = require('node-fetch')



//====== GET USERS THAT FOLLOW YOU (FOLLOWERS) ================//

router.get('/users/:userId', requireAuth, async (req, res, next) => {

    const { userId } = req.params;
    const user = await User.findByPk(userId);
    // const loggedUser = await fetch('/api/users/me').then(res => res.json()).then(data => console.log(data));

    // console.log(loggedUser)

    const follows = await Follow.findAll({
        where: {
            followerId: userId
        }
    })

    // if (userId === )

    if (user) {
        res.status(200)
        return res.json({
            Follows: follows
        })
    } else {
        const err = new Error("User with that id does not exist.");
        err.message = "User with that id does not exist.";
        err.status = 401;
        return next(err);
    }
})

//====== GET USERS THAT YOU FOLLOW (FOLLOWS) ================//
router.get('/users/:userId', requireAuth, async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findByPk(userId);

    const follows = await Follow.findAll({
        where: {
            followerId: userId
        }
    })

    if (user) {
        res.status(200)
        return res.json({
            Follows: follows
        })
    } else {
        const err = new Error("User with that id does not exist.");
        err.message = "User with that id does not exist.";
        err.status = 401;
        return next(err);
    }
})
module.exports = router;
