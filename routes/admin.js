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


router.get('/students',isAdmin, adminController.allStudents);

router.get('/internship',isAdmin , adminController.allInternship);

router.get('/internships/edit/:id',isAdmin, adminController.editInternship);
router.post('/internship/edit/:id', isAdmin, adminController.editedtheinter);

router.get('/internships/delete/:id',isAdmin, adminController.deleteInternship);


router.get('/email',isAdmin,adminController.renderEmailForm);
router.post('/send-email', isAdmin, adminController.sendEmail);


router.get('/notification',isAdmin,adminController.rendernotificationsender);

router.post('/emailnoti',isAdmin,adminController.emailNotificationSendr)
router.post('/allnoti',isAdmin,adminController.NotificationSendr)



module.exports = router;
