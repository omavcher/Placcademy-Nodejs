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

module.exports.internshipDetailedPage = async (req, res) => {
    try {
        const { id } = req.params; // Corrected typo here
        const internship = await Internship.findById(id); // Changed to findById for a single document
        
        if (!internship) {
            return res.status(404).send("Internship not found");
        }

        res.render("main/detailedintershp", { internship });
    } catch (e) {
        console.error("Error finding internship:", e);
        res.status(500).send("Error finding internship");
    }
};

