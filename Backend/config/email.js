const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS // Your email password
    }
});

const sendOTP = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Admin Login OTP",
        text: `Your one-time login code is: ${otp}. It will expire in 5 minutes.`
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendOTP };
