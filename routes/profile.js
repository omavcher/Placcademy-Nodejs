const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile.js");
const { isLoggedIn } = require("../middleware");
const multer  = require('multer')
const { cloudinary, storage } = require('../cloudconfig');
const upload = multer({storage})



router.get("/",isLoggedIn,(profileController.profilepage));

router.get("/:id/edit",isLoggedIn,(profileController.profileedit))

router.post("/:id/edit",(upload.single('user[profile_dp]')),isLoggedIn,(profileController.editpro));



router.get("/referral",isLoggedIn,(profileController.referralPage))

module.exports = router;
