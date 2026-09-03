const express = require("express");
const router = express.Router();

const loginStaff = require("../controllers/staffControllers");
const authMiddleware = require("../middleware/authMiddleware");


router.post("/login", loginStaff);

router.get("/profile", authMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
        message: "You are authenticated.",
        staff: req.staff,
    });
});

module.exports = router;
