const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const staff = require("../data/staff");

const JWT_SECRET = process.env.JWT_SECRET;

function loginStaff(req, res) {
   const { email, password } = req.body;

   if (!email || !password) {
    return res.status(400).json({
        success: false,
        message: "Email and password are required.",
    });
   }
   
   // Find staff member by email
   const foundStaff = staff.find(
    (member) =>
        member.email === email
   );

   if (!foundStaff) {
    return res.status(401).json({
        success: false,
        message: "Invalid email or password."
    });
   }


   // Compare entered password with bcrypt hash
   const isPasswordCorrect = bcrypt.compareSync(password, foundStaff.password);
   if (!isPasswordCorrect) {
    return res.status(401).json({
        success: false,
        message: "Invalid email or password",
    });
   }

   // Generate JWT
   const token = jwt.sign(
    { id: foundStaff.id, email: foundStaff.email, role: foundStaff.role},
    JWT_SECRET,
    { expiresIn: "1h"}
);

    // Successful response
   res.status(200).json({
    success: true,
    message: "Login successful.",
    token,
    staff: {
        id: foundStaff.id,
        fullName: foundStaff.fullName,
        email: foundStaff.email,
        role: foundStaff.role
    }
   });
};

module.exports = loginStaff;