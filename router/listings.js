const express = require("express");
const router = express.Router({ mergeParams: true });
const asyncWrapc = require("../util/wrapacync.js");
const { IsloggedIn, validatelisting, IsOwner } = require("../middleware.js");
const listingroute = require("../controler/listing.js");
const { storage } = require("../cloudconfig.js");
const multer = require("multer");
const upload = multer({ storage });

//SEARCH ROUTE
router.get("/search",listingroute.search);

router
  .route("/")
  .get(listingroute.home) //HOME ROUTE
  .post(
    IsloggedIn,
    upload.single("file"),
    validatelisting,
    asyncWrapc(listingroute.createnew),
  ); //CREATING NEW LIST

//NEW ROUTE
router.get("/new", IsloggedIn, listingroute.new);

router
  .route("/:id")
  .get(listingroute.info) //INFO ROUTE
  .put(IsloggedIn, IsOwner,upload.single("image"), listingroute.update) //UPDATE ROUTE
  .delete(IsloggedIn, IsOwner, listingroute.destroylist); //DELETE ROUTE

//EDIT ROUTE
router.get("/:id/edit", IsloggedIn, IsOwner, listingroute.edit);


//FILTER ROUTE 
router.get("/filter/:spec",listingroute.filter);


module.exports = router;
