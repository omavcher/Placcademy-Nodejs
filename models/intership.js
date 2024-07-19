const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InterSchema = new Schema({
    internshipname: {
        type: String,
        required: true
    },
    numberofusersbuy: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    internshipdescription: { // Ensure this matches the form field name
        type: String,
        required: true
    },
    internshipdetails: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    tasks: [{
        name: {
            type: String,
            required: true
        },
        linkt: { // Ensure this matches the form field name
            type: String,
            default: ''
        }
    }]
});

module.exports = mongoose.model('Internship', InterSchema);
