const express = require('express');
const router = express.Router();
const homeController = require("../controllers/home"); // Adjust if your controller path is different
const passport = require('passport');
const { isLoggedIn } = require("../middleware");

router.get("/", homeController.homepage);
router.get("/about", homeController.aboutpage);
router.get("/login", homeController.registerpage);
router.post("/signup", homeController.signup);

router.post('/login', 
    passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true
    }), 
    homeController.login
);


router.get('/auth/google',passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' , failureFlash: true }),
    function(req, res) {
        req.flash("success", "Welcome to Placcademy");
      res.redirect('/');
    });
  

router.get('/syllabus',isLoggedIn, homeController.syllabusPage);
 
router.post('/coupon', isLoggedIn,homeController.couponApply)

router.get('/test',isLoggedIn, homeController.TestPage);

module.exports = router;
