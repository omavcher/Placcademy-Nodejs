const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InterSchema = new Schema({
    intershipname: {
        type: String,
        required: true
    },
    numberofusersbuy: {
        type: Number,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    intershipdiscripction: {
        type: String,
        required: true
    },
    intershipdetails: {
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
        linkt: {
            type: String,
            default: false
        }
    }]
});

module.exports = mongoose.model('Internship', InterSchema);
