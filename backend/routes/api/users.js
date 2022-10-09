// backend/routes/api/users.js
const express = require("express");
const { setTokenCookie, requireAuth, restoreUser } = require("../../utils/auth");
const { User, Tweet, Comment, Like, Follow } = require("../../db/models");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { singlePublicFileUpload, singleMulterUpload, fieldMulterUpload } = require('../../aws-sdk.js')




//================== GET LOGGED USER ==========================//
router.get('/me', requireAuth, restoreUser, async (req, res) => {
  const userId = req.user.id
  const user = await User.findByPk(userId);
  let { firstName, lastName, username, bio, location, website, profileImage, coverImage, verified, createdAt, updatedAt } = user;


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
      createdAt: createdAt.toDateString().toString().split(' '),
      updatedAt: updatedAt.toDateString().toString().split(' ')
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
      createdAt: createdAt.toDateString().toString().split(' '),
      updatedAt: updatedAt.toDateString().toString().split(' ')
    })
  } else {
    res.status(404)
    const err = new Error("User with that id cannot be found.");
    err.message = "User with that id cannot be found.";
    err.status = 404;
    next(err);
  }
})

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
  check("website")
    // .exists({ checkFalsy: false })
    .if((value, { req }) => {
      value.substring(0, 8) === 'https://'
    })
    .withMessage("Please provide a website starting with 'https://'"),
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

//================== SIGN UP ==========================//
router.post("/signup", fieldMulterUpload([{ name: "image" }, { name: "image2" }]), validateSignup, async (req, res, next) => {
  let { firstName, lastName, email, bio, location, website, password, username } = req.body;

  let profileImg;
  let coverImg;

  if (req.files.image) {
    profileImg = await singlePublicFileUpload(req.files.image[0]);
  } else {
    profileImg = 'https://secure.gravatar.com/avatar/c51f0fc9375c537923f6bf012b337f43?s=150&d=mm&r=g'
  }

  if (req.files.image2) {
    coverImg = await singlePublicFileUpload(req.files.image2[0]);
  } else {
    coverImg = 'https://www.keyimagazine.com/wp-content/themes/miyazaki/assets/images/default-fallback-image.png'
  }


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
    const user = await User.signup({
      firstName,
      lastName,
      email,
      bio,
      location,
      website,
      profileImage: profileImg,
      coverImage: coverImg,
      password,
      username
    });


    await setTokenCookie(res, user);
    user.dataValues.token = req.cookies.token;

    return res.json({
      user
    });
    // return
  } else if (existingEmail) {
    res.status(404)
    const err = new Error("Unique email required.");
    err.title = "Unique email required.";
    err.errors = "A user with that email already exists.";
    err.status = 404;
    return next(err);

  } else if (existingUsername) {
    res.status(404)
    const err = new Error("Unique username required.");
    err.title = "Unique username required.";
    err.errors = "A user with that username already exists.";
    err.status = 404;
    return next(err);
  }
});

module.exports = router;
