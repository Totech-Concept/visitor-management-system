const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization || "";

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Authentication required.",
        });
    }


    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Authentication token missing"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.staff = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });
    }
};

module.exports = authMiddleware;