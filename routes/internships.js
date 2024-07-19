const express = require("express");
const router = express.Router();
const internshipController = require("../controllers/internships.js");



router.get("/",(internshipController.intershipspage)) 


module.exports = router;
