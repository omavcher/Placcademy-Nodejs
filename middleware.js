
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
      req.session.redirectUrl = req.originalUrl;
      req.flash("error", "You must be logged in to access this page.");
      return res.redirect("/login");
  }
  next();
};
module.exports.isAdmin = (req, res, next) => {
  if (req.session && req.session.isAdmin) {
      return next();
  }
  req.flash("error", "You must be an admin to access this page.");
  res.redirect("/");
};
