// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'placcademy1@gmail.com',
//     pass: 'axudkjkqttdztljo'
//   }
// });

// const mailOptions = {
//   from: 'placcademy1@gmail.com',
//   to: 'omawchar07@gmail.com',
//   subject: 'Welcome to Placcademy',
//   html: `<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Welcome to Placcademy</title>
//     <style>
//         body {
//             font-family: Arial, sans-serif;
//             margin: 0;
//             padding: 0;
//             background-color: #f3f4f6;
//             color: #333;
//         }
//         .container {
//             width: 100%;
//             max-width: 600px;
//             margin: 0 auto;
//             background-color: #ffffff;
//             padding: 20px;
//             border-radius: 10px;
//             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//             overflow: hidden;
//         }
//         .header {
//             text-align: center;
//             background-color: #FB4B04;
//             padding: 30px;
//             border-radius: 10px 10px 0 0;
//         }
//         .header h1 {
//             margin: 0;
//             color: #ffffff;
//             font-size: 28px;
//         }
//         .content {
//             padding: 30px;
//             text-align: center;
//         }
//         .content p {
//             font-size: 18px;
//             line-height: 1.6;
//             color: #555;
//         }
//         .button-container {
//             text-align: center;
//             margin-top: 25px;
//         }
//         .button {
//             background-color: #25D366;
//             color: #ffffff;
//             padding: 15px 30px;
//             text-decoration: none;
//             border-radius: 5px;
//             font-size: 18px;
//             display: inline-block;
//         }
//         .footer {
//             text-align: center;
//             padding: 20px;
//             font-size: 14px;
//             color: #999;
//         }
//         .footer a {
//             color: #FB4B04;
//             text-decoration: none;
//         }
//     </style>
// </head>
// <body>
//     <div class="container">
//         <div class="header">
//             <h1>Welcome to Placcademy</h1>
//         </div>
//         <div class="content">
//             <p>Thank you for joining us at Placcademy! We're excited to have you on board and can't wait to help you take your skills to the next level.</p>
//             <p>Join our community on WhatsApp to stay updated with the latest news, events, and opportunities:</p>
//             <div class="button-container">
//                 <a href="https://whatsapp.com/channel/0029VahD9FO2phHLzRHPBu3w" class="button">Join Our WhatsApp Community</a>
//             </div>
//         </div>
//         <div class="footer">
//             <p>If you have any questions, feel free to <a href="mailto:placcademy1@gmail.com">contact us</a>.</p>
//             <p>Follow us on social media for more updates.</p>
//         </div>
//     </div>
// </body>
// </html>`
// };

// async function sendMail() {
//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent: ' + info.response);
//   } catch (error) {
//     console.error('Error sending email: ', error);
//   }
// }

// sendMail();

require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const mailOptions = {
  from: 'placcademy1@gmail.com',
  to: '', // recipient email will be set in the function
  subject: 'Welcome to Placcademy',
  html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Placcademy</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f3f4f6;
            color: #333;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            text-align: center;
            background-color: #FB4B04;
            padding: 30px;
            border-radius: 10px 10px 0 0;
        }
        .header h1 {
            margin: 0;
            color: #ffffff;
            font-size: 28px;
        }
        .content {
            padding: 30px;
            text-align: center;
        }
        .content p {
            font-size: 18px;
            line-height: 1.6;
            color: #555;
        }
        .button-container {
            text-align: center;
            margin-top: 25px;
        }
        .button {
            background-color: #25D366;
            color: #ffffff;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 18px;
            display: inline-block;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 14px;
            color: #999;
        }
        .footer a {
            color: #FB4B04;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to Placcademy</h1>
        </div>
        <div class="content">
            <p>Thank you for joining us at Placcademy! We're excited to have you on board and can't wait to help you take your skills to the next level.</p>
            <p>Join our community on WhatsApp to stay updated with the latest news, events, and opportunities:</p>
            <div class="button-container">
                <a href="https://whatsapp.com/channel/0029VahD9FO2phHLzRHPBu3w" class="button">Join Our WhatsApp Community</a>
            </div>
        </div>
        <div class="footer">
            <p>If you have any questions, feel free to <a href="mailto:placcademy1@gmail.com">contact us</a>.</p>
            <p>Follow us on social media for more updates.</p>
        </div>
    </div>
</body>
</html>`
};

async function sendMail(to) {
  try {
    const mailOptionsWithRecipient = { ...mailOptions, to };
    const info = await transporter.sendMail(mailOptionsWithRecipient);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
}

module.exports = sendMail;
