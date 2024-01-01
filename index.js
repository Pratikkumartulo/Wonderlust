if (process.env.NODE_ENV != "production"){
  require('dotenv').config()
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");
const expError = require("./util/expressError.js");
const listings = require("./router/listings.js");
const reviews = require("./router/review.js");
const user = require("./router/user.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./model/user.js");


//CONNECT TO DATA BASE
async function main() {
  await mongoose.connect(process.env.ATLAS_DB);
}
main()
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsmate);
app.use(express.static(path.join(__dirname, "/public")));


const store = MongoStore.create({
  mongoUrl: process.env.ATLAS_DB,
  crypto: {
    secret: process.env.SECRET_CODE
  },
  touchAfter:24 * 3600,
});

//SESSIONS AND COKKIES
app.use(session({
  store:store,
  secret:process.env.SECRET_CODE,
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires: Date.now() + 7 * 24 *  60 * 60 * 1000,
    maxAge:7 * 24 *  60 * 60 * 1000,
    httpOnly:true,
  },
}))
app.use(flash());


//PASSPORT AUTHENTICATE
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//FLASH MESSAGES
app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.failure = req.flash("failure");
  res.locals.error = req.flash("error");
  res.locals.curUser =  req.user;
  next();
})


//ROUTES
app.use("/listings",listings);
app.use("/listings/:id/review",reviews);
app.use("/",user);


//ROUTING OF THE APP
app.listen(3000, () => {
  console.log("Listening to port 3000");
});

app.get("/", (req, res) => {
  res.redirect("/listings");
});

//ERROR ROUTE
app.get("/error", (err,res, req, next) => {
  next(err);
});

// ALL ROUTE
app.all("*",(req,res,next)=>{
  next(new expError(404, "page not found !!"));
})

//ERROR HANDLER
app.use((err, req, res, next) => {
  let {statuscode=500, message="something went wrong !!"} = err;
  res.render("error.ejs",{message});
});


