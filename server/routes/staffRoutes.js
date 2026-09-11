const express = require("express");
const router = express.Router();
const pool = require("../config/db");

const loginStaff = require("../controllers/staffControllers");
const authMiddleware = require("../middleware/authMiddleware");

// POST /staff/login  -> sign in, returns a token
// GET  /staff/profile     -> get the currently signed-in user (requires token)

router.post("/login", loginStaff);

router.get("/profile", authMiddleware, async function getCurrentUser(req,res) {
    try {
        const [rows] = await pool.execute(
            "SELECT id, full_name, email, role FROM staff WHERE id = ?", [req.staff.id]
        );

        const user = rows[0];
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                id: user.id,
                fullName: user.full_name,
                email: user.email,
                role: user.role,
            },
        });

    } catch(error) {
        console.error("Get current user error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong while retrieving your profile."
        });
    }
}
);

module.exports = router;
