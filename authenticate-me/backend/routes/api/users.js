// backend/routes/api/users.js
const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Tweet, Comment, Like, Follow } = require("../../db/models");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");


const validateSignup = [
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid first name."),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid last name."),
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors
];

//================== GET LOGGED USER ==========================//
router.get('/me', requireAuth, async (req, res) => {
  const userId = req.user.id
  const user = await User.findByPk(userId);
  const { firstName, lastName, username, bio, location, website, profileImage, coverImage, verified, createdAt, updatedAt } = user;
  const tweets = await Tweet.findAndCountAll({
    where: {
      userId
    }
  })
  const following = await Follow.findAndCountAll({
    where: {
      followerId: userId
    }
  })
  const followers = await Follow.findAndCountAll({
    where: {
      userId
    }
  })

  if (user) {
    res.status(200)
    return res.json({
      id: userId,
      firstName,
      lastName,
      username,
      bio,
      location,
      website,
      profileImage,
      coverImage,
      verified,
      tweetCount: tweets.count,
      followingCount: following.count,
      followerCount: followers.count,
      createdAt,
      updatedAt
    })
  } else {
    const err = new Error("There is no user logged in.");
    err.message = "There is no user logged in.";
    err.status = 401;
    return next(err);
  }
})

//================== GET USER BY USER ID =======================//
router.get('/:userId', requireAuth, async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findByPk(userId)

  if (user) {
    const { firstName, lastName, username, bio, location, website, profileImage, coverImage, verified, createdAt, updatedAt } = user;
    const tweets = await Tweet.findAndCountAll({
      where: {
        userId
      }
    })
    const following = await Follow.findAndCountAll({
      where: {
        userId
      }
    })
    const followers = await Follow.findAndCountAll({
      where: {
        followerId: userId
      }
    })
    res.status(200)
    return res.json({
      id: userId,
      firstName,
      lastName,
      username,
      bio,
      location,
      website,
      profileImage,
      coverImage,
      verified,
      tweetCount: tweets.count,
      followingCount: following.count,
      followerCount: followers.count,
      createdAt,
      updatedAt
    })
  } else {
    res.status(404)
    const err = new Error("User with that id cannot be found.");
    err.message = "User with that id cannot be found.";
    err.status = 404;
    next(err);
  }
})

//================== SIGN UP ==========================//
router.post("/", validateSignup, async (req, res, next) => {
  const { firstName, lastName, email, password, username } = req.body;

  const existingEmail = await User.findOne({
    where: {
      email
    }
  })
  const existingUsername = await User.findOne({
    where: {
      username
    }
  })

  if (!existingEmail && !existingUsername) {
    const user = await User.signup({ firstName, lastName, email, username, password });
    await setTokenCookie(res, user);
    user.dataValues.token = req.cookies.token;

    return res.json({
      user
    });

  } else if (existingEmail) {
    res.status(404)
    const err = new Error("Unique email required.");
    err.message = "A user with that email already exists. You may already have an account created.";
    err.status = 404;
    next(err);

  } else if (existingUsername) {
    res.status(404)
    const err = new Error("Unique username required.");
    err.message = "A user with that username already exists. You may already have an account created. Otherwise, please choose another username.";
    err.status = 404;
    next(err);
  }
});

module.exports = router;
