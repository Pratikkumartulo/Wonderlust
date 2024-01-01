const express = require("express");
const router = express.Router({ mergeParams: true });
const asyncWrapc = require("../util/wrapacync.js");
const passport = require("passport");
const { savedRedirectURL } = require("../middleware.js");
const userRouter = require("../controler/user.js");


router.route("/signup")
.get(userRouter.signUp)//SIGNUP ROUTE
.post(asyncWrapc(userRouter.userRegister))//USER REGISTER ROUTE

router.route("/login")
.get(userRouter.userLogin)//LOGIN ROUTE
.post(savedRedirectURL,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userRouter.userLoginRequest
)//LOGIN REQUEST


//LOGOUT ROUTE
router.get("/logout", userRouter.userLogout);

module.exports = router;
