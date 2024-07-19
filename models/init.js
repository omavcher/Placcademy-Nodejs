const mongoose = require('mongoose');
const Internship = require('./models/InterSchema');


const exampleData = 
    {
        intershipname: 'Example Internship 1',
        numberofusersbuy: 100,
        prise: 499,
        intershipdiscripction: 'This is an example internship description.',
        intershipdetails: 'Detailed information about the example internship.',
        picture: 'https://example.com/internship1.jpg',
        tasks: [
            { name: 'Task 1', link: '' },
            { name: 'Task 2', link: '' },
            { name: 'Task 3', link: '' },
            { name: 'Task 4', link: '' },
            { name: 'Task 5', link: '' },
            { name: 'Task 6', link: '' },
            { name: 'Task 7', link: '' },
            { name: 'Task 8', link: '' },
            { name: 'Task 9', link: '' },
            { name: 'Task 10', link: '' },     
        ]
    }


// Function to insert example data
async function insertExampleData() {
    try {
        // await Internship.deleteMany({});

        await Internship.insertMany(exampleData);

        console.log('Example data inserted successfully.');
    } catch (error) {
        console.error('Error inserting example data:', error);
    } 
}

insertExampleData();
