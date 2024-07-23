const express = require('express');
const router = express.Router();
const { isAdmin } = require("../middleware"); // Ensure you have this middleware
require('dotenv').config();
const mongoose = require('mongoose');
const Internship  = require('../models/intership');
const User  = require('../models/user');


module.exports.adminlogin = (req, res) => {
    res.render('admin/login');
};


module.exports.adminlogindone = (req, res) => {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL  && password === process.env.ADMIN_PASS) {
        req.session.isAdmin = true;
        req.flash('success', 'Welcome to the admin panel!');
        res.redirect('/admin/dashboard');
    } else {
        req.flash('error', 'Invalid credentials');
        res.redirect('/admin/login');
    }
};

module.exports.dashboard = async (req, res) => {
    try {
    const studentCount = await User.countDocuments({});   
    const InternshipCount = await Internship.countDocuments({});   


    const StudentData = await User User.find({});


    res.render("admin/dashbord" , {studentCount , InternshipCount});
    } catch (error) {
        req.flash("error", error);
        res.redirect('/admin/login');
    }
};


module.exports.newintership = (req,res) =>{
    res.render("admin/new");
}

module.exports.createIntership = async (req, res) => {
    try {
        // Extract data from request body
        const {
            internshipname,
            numberofusersbuy,
            price,
            internshipdescription,
            internshipdetails,
            picture,
            taskname,
            tasklink
        } = req.body;

        // Validate required fields
        if (!internshipname || !numberofusersbuy || !price || !internshipdescription || !internshipdetails || !picture) {
            req.flash("error", "All fields are required.");
            return res.redirect("/admin/dashboard");
        }

        // Ensure tasks array is valid
        if (!taskname || !Array.isArray(taskname) || taskname.length === 0) {
            req.flash("error", "At least one task is required.");
            return res.redirect("/admin/dashboard");
        }

        const tasks = taskname.map((name, index) => ({
            name, // This should match your schema's `name` field
            linkt: tasklink[index] || '' // This should match your schema's `linkt` field
        }));

        const newInternship = new Internship({
            internshipname,
            numberofusersbuy,
            price,
            internshipdescription,
            internshipdetails,
            picture,
            tasks
        });

        const savedInternship = await newInternship.save();

        console.log(savedInternship);
        req.flash("success", "New Internship Added!");
        res.redirect("/admin/dashboard");
    } catch (error) {
        req.flash("error", "Internship Not Created");
        res.redirect("/admin/dashboard");
    }
};




module.exports.allStudents = async (req, res) => {
    try {
        const students = await User.find({});

        const paidStudents = students.filter(student => student.paymentHistory && student.paymentHistory.length > 0);
        const unpaidStudents = students.filter(student => !student.paymentHistory || student.paymentHistory.length === 0);

        res.render('admin/student', { paidStudents, unpaidStudents });
    } catch (error) {
        // Handle error and redirect with a flash message
        req.flash("error", "An error occurred while fetching student data.");
        res.redirect("/admin/dashboard");
    }
};


module.exports.allInternship = async (req, res) => {
    try {

        const internships = await Internship.find({});
        res.render('admin/allintership', { internships });
    } catch (error) {
        req.flash("error", error);
        res.status(500).send('Internal Server Error');
        res.redirect("/admin/dashboard");
    }
};


module.exports.editInternship = async (req, res) => {
    let { id } = req.params;
    try {
        const internship = await Internship.findById(id);
        
        if (!internship) {
            req.flash("error", "Internship not found");
            return res.redirect("/admin/internships");
        }
        res.render('admin/editInternship', { internship });
    } catch (error) {
        req.flash("error", error.message);
        res.status(500).send('Internal Server Error');
        res.redirect("/admin/dashboard");
    }
};

module.exports.editedtheinter = async (req, res) => {
    let { id } = req.params;
    try {
        const internship = await Internship.findById(id);
        
        if (!internship) {
            req.flash("error", "Internship not found");
            return res.redirect("/admin/internships");
        }

        internship.internshipname = req.body.internshipname;
        internship.numberofusersbuy = req.body.numberofusersbuy;
        internship.price = req.body.price;
        internship.internshipdescription = req.body.internshipdescription;
        internship.internshipdetails = req.body.internshipdetails;
        internship.picture = req.body.picture;
        
        internship.tasks = req.body.taskname.map((name, index) => ({
            name,
            linkt: req.body.tasklink[index] || ''
        }));

        await internship.save();

        req.flash("success", "Internship updated successfully");
        res.redirect("/admin/internship");
    } catch (error) {
        req.flash("error", error.message);
        res.status(500).send('Internal Server Error');
        res.redirect("/admin/internship");
    }
};



module.exports.deleteInternship = async (req, res) => {
    let { id } = req.params;
    try {
        // Ensure the ID is valid
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            req.flash("error", "Invalid Internship ID");
            return res.redirect("/admin/internship");
        }

        // Attempt to find and remove the internship
        const internship = await Internship.findByIdAndDelete(id);

        if (!internship) {
            req.flash("error", "Internship not found");
            return res.redirect("/admin/internship");
        }

        req.flash("success", "Internship deleted successfully");
        res.redirect("/admin/internship");
    } catch (error) {
        console.error("Error deleting internship:", error); // Log the error details
        req.flash("error", "Internal Server Error");
        res.status(500).send('Internal Server Error');
        res.redirect("/admin/internship");
    }
};


module.exports.renderEmailForm = async (req, res) => {
res.render('admin/emailForm');
}


const nodemailer = require('nodemailer');

// Array of email configurations
const emailConfigs = [
    {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER1,
            pass: process.env.EMAIL_PASS1
        }
    },
    {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER2,
            pass: process.env.EMAIL_PASS2
        }
    },
    {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER3,
            pass: process.env.EMAIL_PASS3
        }
    },
    {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER4,
            pass: process.env.EMAIL_PASS4
        }
    }
];

module.exports.sendEmail = async (req, res) => {
    const { recipients, subject, message } = req.body;

    let emailSent = false;
    let errorMsg = '';

    for (const config of emailConfigs) {
        const transporter = nodemailer.createTransport(config);

        const mailOptions = {
            from: config.auth.user,
            to: recipients,
            subject: subject,
            html: message
        };

        try {
            await transporter.sendMail(mailOptions);
            emailSent = true;
            req.flash("success", "Email sent successfully!");
            break;
        } catch (error) {
            console.error("Error sending email with account", config.auth.user, ":", error);
            errorMsg = error.message;
        }
    }

    if (!emailSent) {
        req.flash("error", "Failed to send email. " + errorMsg);
    }

    res.redirect("/admin/email");
};

module.exports.rendernotificationsender =  (req, res) => {
    res.render("admin/notificationpanl");
}



module.exports.emailNotificationSendr = async (req, res) => {
    try {
        const { email, category, message } = req.body;
        const user = await User.findOne({ email: email });

        if (user) {
            user.notifications.push({ type: 'notification', category, message });
            await user.save();


            req.flash('success', 'Notification was Send!');
            return res.redirect('/admin/dashboard');
        } else {
            req.flash('error', 'User not found');
            return res.redirect('/admin/dashboard');
        }
    } catch (error) {
        req.flash('error', error.message);
        res.status(500).redirect('/admin/dashboard');
    }
};


module.exports.NotificationSendr = async (req, res) => {
    try {
        const { category, message } = req.body;

        if (!category || !message) {
            req.flash('error', 'Category and Message are required.');
            return res.redirect('/admin/dashboard');
        }

        const users = await User.find({});

        const notification = {
            type: 'notification',
            category,
            message,
            noti_date: new Date()
        };
        for (let user of users) {
            user.notifications.push(notification);
            await user.save();
        }
        req.flash('success', 'Notification sent to all users!');
        res.redirect('/admin/dashboard');
    } catch (error) {
        req.flash('error', error.message);
        res.status(500).redirect('/admin/dashboard');
    }
};




module.exports.TestAllow = async (req, res) => {
    try {
        const students = await User.find({});

       
        res.render('admin/testnoti', { students });
    } catch (error) {
        // Handle error and redirect with a flash message
        req.flash("error", "An error occurred while fetching student data.");
        res.redirect("/admin/dashboard");
    }
}

module.exports.testAllowedUser = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);

        const student = await User.findById(id);
        
        if (student) {
            const currentTestAllowStatus = student.internship.testallow;
            const newTestAllowStatus = !currentTestAllowStatus;

            await User.updateOne(
                { _id: id },
                { $set: { "internship.testallow": newTestAllowStatus } }
            );

            req.flash('success', `${student.username} is now ${newTestAllowStatus ? 'allowed' : 'not allowed'} to test`);
        } else {
            req.flash('error', 'Student not found');
        }

        res.redirect('/admin/dashboard');
    } catch (error) {
        console.error('Error updating student data:', error);
        req.flash('error', 'An error occurred while updating student data.');
        res.redirect('/admin/dashboard');
    }
};


module.exports.testDataPage = async (req, res) => {
    res.render('admin/testDataPage');
    
}