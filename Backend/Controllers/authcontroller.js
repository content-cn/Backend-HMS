const User = require('../Models/authmodels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Secret key for JWT
const SECRET_KEY = process.env.JWT_SECRET;

// User Signup Controller
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create a new user and save it
        const newUser = new User({ name, email, password });
        await newUser.save();
        const mailOptions = {
            from: process.env.SENDGRID_FROM_EMAIL,
            to: email,
            subject: 'Welcome to Our Service',
            text:`Hello ${fullname},\n\nThank you for signing up! We're glad to have you on board.\n\nBest regards,\nYour Hospital Name`
          };
          await transporter.sendMail(mailOptions);
      

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
};

// User Signin Controller
const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({message:"Please fill all the required field!"})
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).send(error );
    }
};

module.exports = { signup, signin };
