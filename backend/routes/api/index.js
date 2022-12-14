const router = require("express").Router();
//
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const tweetsRouter = require('./tweets.js')
const followsRouter = require('./follows.js')
const commentsRouter = require('./comments.js')
const likesRouter = require('./likes.js')
const retweetsRouter = require('./retweets.js')

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/tweets", tweetsRouter)
router.use("/follows", followsRouter)
router.use("/comments", commentsRouter)
router.use('/likes', likesRouter)
router.use('/retweets', retweetsRouter)

router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});

//=============== Test Routes ============================//
// // GET /api/set-token-cookie
const { setTokenCookie } = require("../../utils/auth.js");
const { User } = require("../../db/models");
router.get("/set-token-cookie", async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: "Demo-lition"
    }
  });
  setTokenCookie(res, user);
  return res.json({ user });
});

// GET /api/restore-user
const { restoreUser } = require("../../utils/auth.js");
router.get("/restore-user", restoreUser, (req, res) => {
  // console.log('----')
  // console.log(req.user)
  return res.json(req.user);
});

// GET /api/require-auth
const { requireAuth } = require("../../utils/auth.js");
const { route } = require("./users.js");
router.get("/require-auth", requireAuth, (req, res) => {
  return res.json(req.user);
});
//
//
//
module.exports = router;
