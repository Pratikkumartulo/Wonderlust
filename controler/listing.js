const listnew = require("../model/data.js");

module.exports.home = async (req, res) => {
  let allList = await listnew.find({});
  res.render("listings/index", { allList });
};

module.exports.new = (req, res) => {
  res.render("listings/new");
};

module.exports.createnew = async (req, res) => {
  let cateogories = [];
  let checkboxes = [req.body.eatables, req.body.Castle, req.body.Golf, req.body.Pools, req.body.Beach, req.body.Parks, req.body.Rooms, req.body.Camp, req.body.Boats, req.body.Play, req.body.Towers, req.body.Mountain];
  cateogories = checkboxes.filter(value => value !== undefined);
  let url = req.file.path;
  let filename = req.file.filename;
  let newlst = new listnew({
    title: req.body.title,
    description: req.body.description,
    image:{
      url:url,
      filename:filename,
    },
    price: req.body.price,
    location: req.body.location,
    country: req.body.country,
    owner: req.user._id,
    cateogories:cateogories
  });
  await newlst.save();
  req.flash("success", "New listing created successfully !!!");
  res.redirect("/listings");
};

module.exports.edit = async (req, res) => {
  let { id } = req.params;
  // console.log(id);
  let onedat = await listnew.findById(id);
  if (onedat) {
    res.render("listings/edit", { onedat });
  } else {
    req.flash("failure", "Invalid listing in search !");
    res.redirect("/listings");
  }
};

module.exports.update = async (req, res) => {
  let cateogories = [];
  let checkboxes = [req.body.eatables, req.body.Castle, req.body.Golf, req.body.Pools, req.body.Beach, req.body.Parks, req.body.Rooms, req.body.Camp, req.body.Boats, req.body.Play, req.body.Towers, req.body.Mountain];
  cateogories = checkboxes.filter(value => value !== undefined);
  let { id } = req.params;
  let newl = await listnew.findByIdAndUpdate(id, {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    location: req.body.location,
    country: req.body.country,
    cateogories:cateogories
  });
  if(typeof(req.file)!=="undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    newl.image = {url,filename};
    await newl.save();
  }
  await newl.save()
  req.flash("success", "List updated successfully !!!");
  res.redirect(`/listings/${id}`);
};

module.exports.info = async (req, res) => {
  let { id } = req.params;
  let info = await listnew
    .findById(id)
    .populate({ path: "review", populate: { path: "author" } })
    .populate("owner");
  if (info) {
    res.render("listings/info", { info });
  } else {
    req.flash("failure", "Invalid listing info !");
    res.redirect("/listings");
  }
};

module.exports.destroylist = async (req, res) => {
  let { id } = req.params;
  await listnew.findByIdAndDelete(id);
  req.flash("success", " listing deleted successfully !!!");
  res.redirect("/listings");
};

module.exports.filter = async (req,res)=>{
  let {spec} = req.params;
  let allList = await listnew.find({cateogories : spec});
  res.render("listings/index", { allList });
};

module.exports.search = async (req,res)=>{
  let searchQ = req.query.search;
  let regep = new RegExp(searchQ,'i');
  let allList = await listnew.find({title:regep});
  res.render("listings/index", { allList });
};