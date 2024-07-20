const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile.js");
const { isLoggedIn } = require("../middleware");


router.get("/",isLoggedIn,(profileController.profilepage));

router.get("/:id/edit",isLoggedIn,(profileController.profileedit));


router.get("/referral",isLoggedIn,(profileController.referralPage))

module.exports = router;
