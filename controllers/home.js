const { query } = require("express");
const User = require('../models/user.js'); // Make sure your user model is correctly imported
const sendMail = require('../email.js');
const passport = require('passport');
const Internship  = require('../models/intership');


module.exports.homepage = async (req, res) => {
    try {
        const internships = await Internship.find({}).lean();
        const internshipNames = internships.map(internship => internship.internshipname);
        const internshipIds = internships.map(internship => internship._id); // Get the IDs of internships

        res.render('main/index', { internships, internshipNames, internshipIds });
    } catch (error) {
        req.flash("error", "Sorry, Please login again!");
        res.status(500).send('Internal Server Error');
        res.redirect("/login");
    }
};



module.exports.aboutpage = (req, res) => {
    res.render("main/about");
};


module.exports.registerpage = (req, res) => {
    res.render("register/register");

};


module.exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        function generateReferralCode(username) {
            const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
            const parts = username.split(' ');
            const firstName = parts[0];
            const lastName = parts.length > 1 ? parts[parts.length - 1] : '';
            const referralCode = `${firstName.slice(0, 3)}${randomNumber}${lastName.slice(0, 3)}`.toLowerCase();
            return referralCode;
        }

        const referralCode = generateReferralCode(username);

        const newUser = new User({
            email,
            username,
            profile_dp: '/src/defaults/default dp.jpg',
            bio: '',
            internshipName: null,
            internshipId: null,
            plan: null,
            location: null,
            collegeName: null,
            instagramId: null,
            linkedinId: null,
            notifications: [],
            referral: referralCode, // Assuming referral is a string
            testScore: null,
        });

        const registeredUser = await User.register(newUser, password); 
        req.login(registeredUser, (err) => {
            if (err) {
                throw err;
            }
            const recipientEmail = email;
sendMail(recipientEmail).then(() => {
  console.log('Mail function executed successfully.');
}).catch(error => {
  console.error('Error executing mail function:', error);
});
            req.flash("success", "Welcome to Placcademy");
            res.redirect("/");
        });
    } catch (e) {
        if (e.code === 11000) { // Checking for duplicate key error
            req.flash("error", "Email already exists");
        } else {
            req.flash("error", e.message || "Internal server error");
        }
        res.redirect("/login");
    }
};

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to Placcademy!");
    res.redirect("/");
};

module.exports.render = (req,res) => {
    res.render();
}