const mongoose = require('mongoose');
const Internship = require('./models/InterSchema'); // Adjust the path as per your project structure


const exampleData = [
    {
        intershipname: 'Example Internship 1',
        numberofusersbuy: 100,
        prise: 499,
        intershipdiscripction: 'This is an example internship description.',
        intershipdetails: 'Detailed information about the example internship.',
        picture: 'https://example.com/internship1.jpg',
        tasks: [
            { name: 'Task 1', like: true },
            { name: 'Task 2', like: false },
            { name: 'Task 3', like: true }
        ]
    },
    {
        intershipname: 'Example Internship 2',
        numberofusersbuy: 50,
        prise: 299,
        intershipdiscripction: 'Another example internship description.',
        intershipdetails: 'Details about the second example internship.',
        picture: 'https://example.com/internship2.jpg',
        tasks: [
            { name: 'Task A', like: false },
            { name: 'Task B', like: true },
            { name: 'Task C', like: true }
        ]
    }
];

// Function to insert example data
async function insertExampleData() {
    try {
        // await Internship.deleteMany({});

        await Internship.insertMany(exampleData);

        console.log('Example data inserted successfully.');
    } catch (error) {
        console.error('Error inserting example data:', error);
    } finally {
        mongoose.disconnect();
    }
}

insertExampleData();
