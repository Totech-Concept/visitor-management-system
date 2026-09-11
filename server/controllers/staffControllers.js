const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const staffData = require("../data/staff");
const pool = require("../config/db");

const JWT_SECRET = process.env.JWT_SECRET;

function validateEmail(email) {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return isValidEmail.test(email);
}

async function loginStaff(req, res) {
   const { email, password, rememberMe } = req.body;

   if (!email || !password) {
    return res.status(400).json({
        success: false,
        message: "Email and password are required.",
    });
   }

   if (!validateEmail(email)) {
    return res.status(400).json({
        success: false,
        message: "Please provide a valid email address."
    });
   }

   try {
            const [rows] = await pool.execute(
                "SELECT * FROM staff WHERE email = ?", [email]
        );

        const user = rows[0];

        const invalidCredentialsResponse = () =>
            res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        
            if (!user) {
                return invalidCredentialsResponse();
            }


        // Compare entered password with bcrypt hash
        const isPasswordCorrect = bcrypt.compareSync(password, user.password_hash);
        if (!isPasswordCorrect) {
            return invalidCredentialsResponse();
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role},
            JWT_SECRET,
            { expiresIn: rememberMe ? "30d" : "1d"}
        );

        // Successful response
        res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
            user: {
                id: user.id,
                fullName: user.full_name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login error:", error);
    
        return res.status(500).json({
            success: false,
            message: "Something went wrong while logging in."
        });
    }
}


module.exports = loginStaff;