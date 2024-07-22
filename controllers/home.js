const { query } = require("express");
const User = require('../models/user.js'); // Make sure your user model is correctly imported
const sendMail = require('../email.js');
const passport = require('passport');
const Internship  = require('../models/intership');
require('dotenv').config();


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
            internshipName: '',
            number: '',
            plan: '',
            location: '',
            collegeName: '',
            instagramId: '',
            linkedinId: '',
            notifications: [],
            referral: referralCode, // Assuming referral is a string
            testScore: '',
        });

        const registeredUser = await User.register(newUser, password); 
        req.login(registeredUser, (err) => {
            if (err) {
                throw err;
            }
            const recipientEmail = email;
sendMail(recipientEmail).then(() => {
}).catch(error => {
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

module.exports.couponApply = (req,res) => {
    let { coupon_code } = req.body;
    req.flash("success", "Your Cupon Code is applay now take test");
    res.redirect("/syllabus");
}



// This is reqiret to payment page for test

const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

module.exports.syllabusPage = async (req, res) => {
    const paymentInitUrl = 'https://zerotize.in/api_payment_init';
    const paymentStatusUrl = 'https://zerotize.in/api_payment_status';
    const account_id = process.env.UPI_ACCOUNT_ID; // Required - Account ID
    const secret_key = process.env.UPI_SECRET_KEY;
    const payment_purpose = 'Test';
    const payment_amount = '1';

    try {
        const email = req.user.email;
        const registeredUser = await User.findOne({ email: email });

        if (!registeredUser) {
            req.flash("error", "Sorry, Please login");
            return res.redirect('/login');
        }

        const payment_id = uuidv4();
        const payment_name = registeredUser.username;
        const payment_phone = registeredUser.number;
        const payment_email = registeredUser.email;
        const redirect_url = `http://localhost:8080/test?i=${payment_id}`;

        const initData = {
            account_id: account_id,
            secret_key: secret_key,
            payment_id: payment_id,
            payment_purpose: payment_purpose,
            payment_amount: payment_amount,
            payment_name: payment_name,
            payment_phone: payment_phone,
            payment_email: payment_email,
            redirect_url: redirect_url
        };

        const initResponse = await axios.post(paymentInitUrl, { init_payment: initData }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const payment_link = initResponse.data.response.payment_link;

        if (payment_link) {
            // Store payment_id in session
            req.session.payment_id = payment_id;

            return res.render("main/syllabus", { payment_link });
        }

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send("An error occurred");
    }
};


module.exports.TestPage = async (req, res) => {
    const paymentStatusUrl = 'https://zerotize.in/api_payment_status';
    const account_id = process.env.UPI_ACCOUNT_ID; // Required - Account ID
    const secret_key = process.env.UPI_SECRET_KEY;
    const payment_id = req.session.payment_id;

    console.log('Retrieved Payment ID from session:', payment_id); // Debug log

    if (!payment_id) {
        return res.status(400).send("No payment ID found in session");
    }

    const statusData = {
        account_id: account_id,
        secret_key: secret_key,
        payment_id: payment_id
    };

    try {
        const statusResponse = await axios.post(paymentStatusUrl, { fetch_payment: statusData }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Payment Status Response:', statusResponse.data); // Debug log

        const paymentStatus = statusResponse.data;
        const paymentMessage = statusResponse.data.response;

  
        return res.send({
            status: paymentStatus,
            message: paymentMessage
        });

    } catch (error) {
        console.error("Error fetching payment status:", error);
        return res.status(500).send("Error fetching payment status");
    }
};