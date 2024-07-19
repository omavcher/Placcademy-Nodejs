const express = require('express');
const router = express.Router();
const homeController = require("../controllers/home"); // Adjust if your controller path is different
const passport = require('passport');

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
  




module.exports = router;
