// const express = require('express');
// const router = express.Router();
// const { isAdmin } = require("../middleware"); // Ensure you have this middleware

// // Admin Login Route
// router.get('/login', (req, res) => {
//     res.send('admin/login'); // Ensure this view exists
// });

// router.post('/login', (req, res) => {
//     const { email, password } = req.body;
//     // Replace with actual password verification logic
//     if (email === 'omawchar07@gmail.com' && password === 'adminpass') {
//         req.session.isAdmin = true;
//         req.flash('success', 'Welcome to the admin panel!');
//         res.redirect('/admin/dashboard');
//     } else {
//         req.flash('error', 'Invalid credentials');
//         res.redirect('/admin/login');
//     }
// });

// // Admin Dashboard Route (protected)
// router.get('/dashboard', isAdmin, (req, res) => {
//     res.render('admin/dashboard'); // Ensure this view exists
// });

// module.exports = router;
