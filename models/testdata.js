const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: Map,
        of: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});

const quizSchema = new Schema({
    questions: [questionSchema]
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
