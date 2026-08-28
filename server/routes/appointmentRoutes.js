const express = require("express");
const router = express.Router();

const submitAppointment = require("../controllers/appointmentController");

router.post("/", submitAppointment);

module.exports = router;