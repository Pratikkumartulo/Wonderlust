const User = require("../model/user.js");

module.exports.signUp = (req, res) => {
  res.render("user/signup");
};

module.exports.userRegister = async (req, res, next) => {
  try {
    let { email, username, password } = req.body;
    let newuser = new User({
      email: email,
      username: username,
    });
    const regUser = await User.register(newuser, password);
    req.login(regUser, function (err) {
      if (err) {
        return next(err);
      } else {
        req.flash("success", "Registered Successfull !!");
        res.redirect("/listings");
      }
    });
  } catch (er) {
    req.flash("failure", er.message);
    res.redirect("/signup");
  }
};

module.exports.userLogin = (req, res) => {
  res.render("user/login");
};

module.exports.userLoginRequest = function (req, res) {
  req.flash("success", "Welcome back to Wonderlust !!");
  if (res.locals.redirectURL) {
    res.redirect(res.locals.redirectURL);
  } else {
    res.redirect("/listings");
  }
};

module.exports.userLogout = function (req, res, next) {
  req.logout((err) => {
    if (err) {
      next(err);
    } else {
      req.flash("success", "Logout successfully !!");
      res.redirect("/listings");
    }
  });
};
