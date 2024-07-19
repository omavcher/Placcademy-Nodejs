const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");
require('dotenv').config();
require("./auth")

const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local").Strategy; // Include LocalStrategy
const User = require('./models/user');
const ExpressError = require("./utils/ExpressError");


const mainRoutes = require("./routes/homeRoutes");
const internshipRoutes = require("./routes/internships");
const profileRoutes = require("./routes/profile");
const adminRoutes = require("./routes/admin");


const app = express();

// Session configuration
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "mysupersecretcode", // Use environment variable or fallback to hardcoded value
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    httpOnly: true,
    // secure: true, // Uncomment this if using HTTPS
  },
};


// Middleware setup
app.use(session(sessionOptions));
app.use(flash());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

// Passport configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// EJS setup
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/src', express.static(path.join(__dirname, 'src')));

// MongoDB connection
const MONGO_URL = process.env.MONGO_LINK;

mongoose.connect(MONGO_URL).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("Connection Error:", err);
});

// Flash messages middleware
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});




// Routes
app.use("/", mainRoutes);
app.use("/internships", internshipRoutes);
app.use("/profile", profileRoutes);
app.use("/admin",adminRoutes)


// 404 Error handler
app.use((req, res, next) => {
  next(new ExpressError(404, `Page Not Found - ${req.originalUrl}`));
});

// Generic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Something broke!");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


