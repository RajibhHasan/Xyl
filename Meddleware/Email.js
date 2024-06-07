const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 465, // Default to 465 if not set
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Optional: Log environment variables for debugging (remove in production)
console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD);

const sendEmail = async (req, res, emailData) => {
    try {
        const mailOption = {
            from: process.env.EMAIL_USER, // sender address
            to: "sojib01943075658@gmail.com", // list of receivers
            subject: emailData.subject, // Subject line
            html: emailData.html,
        };
        console.log('Mail options:', mailOption);
        
        const info = await transporter.sendMail(mailOption);
        console.log('Email sent info:', info);
        console.log('Email sent successfully');
//         res.status(200).send('Email sent successfully'); // Ensure to send a response to the client
    } catch (e) {
        console.error('Error occurred while sending email:', e.message);
//         res.status(500).send('Error occurred while sending email'); // Ensure to send a response to the client
    }
};

module.exports = sendEmail;

