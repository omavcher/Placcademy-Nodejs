const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile.js");
const { isLoggedIn } = require("../middleware");
const multer  = require('multer')
const upload = multer({ dest: 'https://console.firebase.google.com/u/0/project/placcademy/storage/placcademy.appspot.com/files/~2Fprofile_dp/' })



router.get("/",isLoggedIn,(profileController.profilepage));

router.get("/:id/edit",isLoggedIn,(profileController.profileedit))

router.post("/:id/edit",(upload.single('user[profile_dp]')),isLoggedIn,(profileController.editpro));



router.get("/referral",isLoggedIn,(profileController.referralPage))

module.exports = router;
