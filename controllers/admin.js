const express = require('express');
const router = express.Router();
const { isAdmin } = require("../middleware"); // Ensure you have this middleware
require('dotenv').config();
const mongoose = require('mongoose');
const Internship  = require('../models/intership');


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
        console.log(`Error: ${error}`);
        res.redirect("/admin/dashboard");
    }
};