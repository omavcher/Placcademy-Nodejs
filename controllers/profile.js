const User = require('../models/user.js'); // Make sure your user model is correctly imported


module.exports.profilepage = async (req, res) => {
    try {
        const email = req.user.email; // Use the email of the logged-in user
        const registeredUser = await User.findOne({ email: email });
console.log(registeredUser);
        if (!registeredUser) {
            return res.status(404).send("User not found");
        }

        res.render("main/profile", { user: registeredUser });

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


