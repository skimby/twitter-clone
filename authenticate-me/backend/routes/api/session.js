// backend/routes/api/session.js
const express = require("express");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

//=======================================//
const validateLogin = [
  check("username")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid username."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors
];


// ============= LOG IN =================//
router.post("/", validateLogin, async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.login({ username, password });

  if (!user) {
    const err = new Error("Login failed");
    err.status = 401;
    err.title = "Login failed";
    err.errors = ["The provided credentials were invalid. Please retry with the correct username and password."];
    return next(err);
  }

  await setTokenCookie(res, user);
  res.status(200)
  return res.json({
    user
  });
});



// ============= LOG OUT =================//
router.delete("/", (_req, res) => {
  res.clearCookie("token");
  res.status(200)
  return res.json({ message: "success" });
});


module.exports = router;
