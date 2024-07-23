const express = require("express");
const router = express.Router();
const internshipController = require("../controllers/internships.js");
const { isLoggedIn } = require("../middleware");



router.get("/",(internshipController.intershipspage)) 

router.get("/internship/:id", isLoggedIn, internshipController.internshipDetailedPage);

router.get("/test", isLoggedIn, internshipController.internshipTest);
module.exports = router;
