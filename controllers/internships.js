const User = require('../models/user.js'); 
const Internship  = require('../models/intership');


module.exports.intershipspage = async (req, res) => {
    try {
        const internships = await Internship.find({}).lean();
        const email = req.user.email; 
        const registeredUser = await User.findOne({ email: email });
        if (!registeredUser) {
            return res.status(404).send("User not found");
        }
    
        res.render("main/internships", { user: registeredUser  , internships});
    
    } catch (e) {
        console.error("Error finding user:", e);
        res.status(500).send("Error finding user");
    }
};

