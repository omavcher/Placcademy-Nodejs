const express = require('express');
const router = express.Router();
const { isAdmin } = require("../middleware"); // Ensure you have this middleware
require('dotenv').config();
const adminController = require("../controllers/admin");
const wrapAsync = require("../utils/wrapAsync.js");


router.get('/login', adminController.adminlogin)

router.post('/login',wrapAsync( adminController.adminlogindone));

router.get('/dashboard', isAdmin, adminController.dashboard);

router.get('/intership/new',isAdmin,adminController.newintership);
router.post('/intership/new', isAdmin, adminController.createIntership);


module.exports = router;
