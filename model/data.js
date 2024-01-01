
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Review = require("./review.js")
// mongoose.connect("mongodb://127.0.0.1:27017/wonderlust")
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    url:String,
    filename:String
  },
  price: Number,
  location: {
    type: String,
  },
  country: {
    type: String,
  },
  review: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User"
  },
  cateogories:[]
});

listingSchema.post("findOneAndDelete", async (List)=>{
  if(List){
    await Review.deleteMany({_id:{$in:List.review}});
  } 
});


const Listening = mongoose.model("List", listingSchema);


module.exports = Listening;
