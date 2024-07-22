const User = require('../models/user.js'); // Make sure your user model is correctly imported


module.exports.profilepage = async (req, res) => {
    try {
        const email = req.user.email;
        const registeredUser = await User.findOne({ email: email });
        if (!registeredUser) {
            return res.status(404).send("User not found");
        }

const notifications = registeredUser.notifications
        res.render("main/profile", { user: registeredUser , notifications});

    } catch (e) {
        console.error("Error finding user:", e);
        res.status(500).send("Error finding user");
    }
};


module.exports.profileedit = async (req, res) => {
    try {
        let { id } = req.params;
        console.log(id)
        const registeredUser = await User.findOne({ _id: id });
        console.log(registeredUser)

        if (!registeredUser) {
            return res.status(404).send("User not found");
        }

        res.render("main/edit", { user: registeredUser }); // Render the edit profile view with user data
    } catch (e) {
        console.error("Error finding user:", e);
        res.status(500).send("Error finding user");
    }
};


module.exports.referralPage = async (req, res) => {
    try {
        const email = req.user.email;
        const registeredUser = await User.findOne({ email: email });

        if (!registeredUser) {
            return res.status(404).send("User not found");
        }
        const referrals = registeredUser.referralsUses || [];
        const referredUsers = [];

        for (let referralId of referrals) {
            const referredUser = await User.findById(referralId);
            if (referredUser) {
                referredUsers.push(referredUser);
            }
        }
        res.render("main/referral", { user: registeredUser, referredUsers });
    } catch (e) {
        req.flash("error", "Error finding user");
        res.redirect("/login");
    }
};




module.exports.editpro = async (req, res) => {
    res.send(req.file);
   
};