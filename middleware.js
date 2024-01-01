const listnew = require("./model/data.js");
const review = require("./model/review.js");
const expError = require("./util/expressError.js");
const { listingSchema, reviewSchema } = require("./schema");

module.exports.IsloggedIn = (req,res,next)=>{
    // console.log(req.user);
    if(!req.isAuthenticated()){
        // console.log(req.originalUrl);
        req.session.redirectURL = req.originalUrl;
        // console.log(req.session.redirectURL);
        req.flash("failure","You need to login for this action !");
        return res.redirect("/login");
    }
    next();

}
module.exports.savedRedirectURL = (req,res,next)=>{ 
    
    if(req.session.redirectURL){
        res.locals.redirectURL = req.session.redirectURL;
        // console.log(res.locals.redirectURL,"have")
    }
    next();
};

module.exports.validatelisting = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
      throw new expError(400, error);
    } else {
      next();
    }
};


module.exports.validatereview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
      throw new expError(400, error);
    } else {
      next();
    }
};

module.exports.IsOwner = async (req,res,next)=>{
    let { id } = req.params;
    let onedat = await listnew.findById(id);
    if(!(req.user._id).equals(onedat.owner._id)){
        req.flash("failure","You dont have permission for this action !")
        return res.redirect(`/listings/${id}`)
    }else{
        next();
    }
    
}

module.exports.IsAuther = async(req,res,next)=>{
    let { id, reviewId } = req.params;
    let reviews = await review.findById(reviewId);
    if(!reviews.author._id.equals(req.user._id)){
        req.flash("failure","You are not authorize for this action !");
        return res.redirect(`/listings/${id}`);
    }else{
        next();
    }
    
}