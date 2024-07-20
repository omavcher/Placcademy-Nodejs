const express = require("express");
const router = express.Router();
const internshipController = require("../controllers/internships.js");
const { isLoggedIn } = require("../middleware");



router.get("/",isLoggedIn,(internshipController.intershipspage)) 

router.get("/internship/:id", isLoggedIn, internshipController.internshipDetailedPage);


module.exports = router;
