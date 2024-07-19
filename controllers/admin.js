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

module.exports.dashboard =  (req, res) => {
    res.render("admin/dashbord");
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