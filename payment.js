const axios = require('axios');
const { v4: uuidv4 } = require('uuid'); 

const url = 'https://zerotize.in/api_payment_init';

// Generate a unique payment ID
const payment_id = uuidv4(); 

// Define the data
const account_id = 'AqflPGDd';           // Required - Account ID
const secret_key = 'w5XUH8uObdAhiMsl';   // Required - Secret key
const payment_purpose = 'test';              // Optional - Maximum 30 characters
const payment_amount = '10';               // Required - 1-100000
const payment_name = '';                 // Optional - 3-30 characters
const payment_phone = '';                // Optional - 7-15 digit numeric
const payment_email = '';                // Optional - Valid email address
const redirect_url = 'http://localhost:8080/internships';                 // Required - http://, https://, http://www, https://www

// Put the data into an object
const data = {
    account_id: account_id,
    secret_key: secret_key,
    payment_id: payment_id,
    payment_purpose: payment_purpose,
    payment_amount: payment_amount,
    payment_name: payment_name,
    payment_phone: payment_phone,
    payment_email: payment_email,
    redirect_url: redirect_url
};

// Setup request to send JSON via POST
axios.post(url, { init_payment: data }, {
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => {
    // Handle the response
    console.log(response.data);
})
.catch(error => {
    // Handle the error
    console.error(error);
});
