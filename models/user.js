const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const notificationSchema = new mongoose.Schema({
  type: {
      type: String,
      required: true
  },
  category: {
      type: String,
      required: true
  },
  message: {
      type: String,
      required: true
  },
  noti_date: {
      type: Date,
      default: Date.now
  }
});

const UserSchema = new Schema({
  googleId: String,
  username: {
    type: String,
    required: true
  },
  number: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  profile_dp: {
    type: String
  },
  bio: {
    type: String
  },
  internshipName: {
    type: String
  },
  internshipId: {
    type: Schema.Types.ObjectId,
    ref: 'Internship'
  },
  plan: {
    type: String
  },
  paymentHistory: [{
    amount: {
      type: Number,
    },
    transactionId: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  location: {
    type: String
  },
  collegeName: {
    type: String
  },
  instagramId: {
    type: String
  },
  linkedinId: {
    type: String
  },
  notifications: [notificationSchema],
  referral: {
    type: String
  },
  referralsUses: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  referralsId: {
    type: String
  },
  testScore: {
    type: Number
  },
  internship: {
    task: {
      type: String
    },
    taskStatus: {
      type: String
    },
    taskStart: {
      type: Date
    },
    taskEnd: {
      type: Date
    },
    taskSubmissionLink: {
      type: String
    }
  }
});

// Plugin passport-local-mongoose for handling username and password
UserSchema.plugin(passportLocalMongoose, {
  hashField: 'password', // Automatically hash password
  errorMessages: { UserExistsError: 'A user with the given email is already registered' } // Custom error message
});

// Export the User model
module.exports = mongoose.model('User', UserSchema);
