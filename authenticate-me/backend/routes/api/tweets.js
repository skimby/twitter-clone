const express = require("express");

const { Tweet, User, Comment, Retweet, Like } = require('../../db/models')
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
//

// router.get('/feed', validateLogin, async (req, res, next) => {
//     const userId = req.user.id;

//     const { id, firstName, lastName, email, username } = req.user;


//     const userTweets = await Tweets.findAll({
//         where: {
//             userId
//         }
//     })
//     return userTweets

// })
module.exports = router;
