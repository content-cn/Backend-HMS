const AdminAuth = require("../Models/adminAuthModels");
const { sendOTP } = require("../config/email");
const jwt = require("jsonwebtoken");


exports.createAdmin = async (req, res) => {
    try {
        const { email, name, password } = req.body;

        // Check if the admin already exists
        const existingAdmin = await AdminAuth.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ error: "Admin already exists" });
        }

        

        // Create new admin without storing JWT token
        const admin = new AdminAuth({
            email,
            name,
                     // Expiry field will be populated when needed
        });

        await admin.save();
        res.status(201).json({ message: "Admin created successfully", admin });
    } catch (error) {
        console.error("Error creating admin:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.adminLogin = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the admin exists in the database
        const admin = await AdminAuth.findOne({ email });
        if (!admin) {
            return res.status(401).json({ error: "Unauthorized. Contact admin for access." });
        }

        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000);
        const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes

        // Save OTP and OTP expiry in the database
        admin.otp = otp;
        admin.otpExpires = otpExpires;
        await admin.save();

        // Send OTP via email
        await sendOTP(email, otp);

        res.json({ message: "OTP sent to your email" });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Find admin by email
        const admin = await AdminAuth.findOne({ email });

        if (!admin || admin.otp !== otp || new Date() > admin.otpExpires) {
            return res.status(400).json({ error: "Invalid or expired OTP" });
        }

        // OTP is correct, generate JWT token
        const token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login successful", token });

        // Clear OTP from DB after successful login
        admin.otp = null;
        admin.otpExpires = null;
        await admin.save();
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
