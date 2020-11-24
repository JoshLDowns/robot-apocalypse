const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post("/register_login", (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return res.status(400).json({ errors: err, info: info });
    }
    if (!user) {
      return res.status(400).json({ errors: "No user found", info: info });
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(400).json({ errors: err, info: info });
      }
      return res.status(200).json({ success: `logged in ${user.id}`, user: user, session: req.session });
    });
  })(req, res, next);
});

router.get("/signout", (req, res) => {
  req.session.destroy();
  req.logOut();
  return res.status(200).json({ success: "successfully signed out"})
})

module.exports = router;
