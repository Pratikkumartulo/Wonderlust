if (process.env.NODE_ENV !== "production"){
    require('dotenv').config()
  }

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: 'daavvxfkl',
  api_key: '634245665841616',
  api_secret: 'Z6-01v9Q8mrOT7P5sWYG6nhUsYw',
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'woderlust_DEV',
      allowedFormat:["png", "jpg", "jpeg"], // supports promises as well
    },
});

module.exports={
    cloudinary,
    storage,
};