const express = require("express");
const router = express.Router();

const reportController = require("../controllers/reportController");
const authMiddleware = require('../middleware/authMiddleware');

router.get("/analytics", authMiddleware, reportController.getReportAnalytics);

module.exports = router;