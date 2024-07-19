const mongoose = require('mongoose');
const User = require('./models/user'); // Assuming your User model file is in 'models/User.js'

const internshipId = new mongoose.Types.ObjectId("60f1e0a07b856d001cc27e0c"); // Correct usage with 'new'

const newUser = new User({
    username: 'example_user',
    email: 'example@example.com',
    profile_dp: '/default/profile.jpg',
    bio: 'Sample bio',
    internshipName: 'Sample internship',
    internshipId: internshipId, // Assign the ObjectId instance
    plan: 'Basic',
    location: 'Sample location',
    collegeName: 'Sample college',
    instagramId: 'example_instagram',
    linkedinId: 'example_linkedin',
    notifications: [{ type: 'notification', noti_date: new Date() }],
    referral: 'sample_referral_id', // Assign the referral code directly as a string
    testScore: 80,
    internship: {
        task: 'Sample task',
        taskStatus: 'Complete',
        taskStart: new Date(),
        taskEnd: new Date(),
        taskSubmissionLink: 'https://example.com'
    }
});

// Save the new user
newUser.save()
    .then(user => {
        console.log('User saved:', user);
    })
    .catch(error => {
        console.error('Error saving user:', error);
    });