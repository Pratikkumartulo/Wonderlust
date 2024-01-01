const listnew = require("../model/data.js");
const review = require("../model/review.js");

module.exports.addReview = async (req, res) => {
    let { id } = req.params;
    let user = await listnew.findById(id);
    let ureview = await new review({
      ratings: req.body.ratings,
      comment: req.body.comment,
      author:req.user._id,
    });
    user.review.push(ureview);
    await user.save();
    await ureview.save();
    // console.log(user);
    req.flash("success","Review added successfully !!!");
    res.redirect(`/listings/${id}`);
  };

module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;
    await listnew.findByIdAndUpdate(id, { $pull: { review: reviewId } });
    await review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted successfully !!!");
    res.redirect(`/listings/${id}`);
  }