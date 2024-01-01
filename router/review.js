const express = require("express");
const router = express.Router({mergeParams:true});
const asyncWrapc = require("../util/wrapacync.js");
const {validatereview, IsloggedIn, IsAuther} = require("../middleware.js");
const reviewRouter = require("../controler/review.js");

//REVIEW ROUTE
router.post(
  "/",IsloggedIn,
  validatereview,
  asyncWrapc(reviewRouter.addReview)
);


//DELETE REVIEW
router.delete(
  "/:reviewId",IsloggedIn,IsAuther,
  asyncWrapc(reviewRouter.destroyReview)
);

module.exports = router;
