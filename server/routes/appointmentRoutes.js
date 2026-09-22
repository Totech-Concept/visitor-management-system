const express = require("express");
const router = express.Router();

const appointmentController = require("../controllers/appointmentController");

// POST   /appointments       -> book an appointment
// GET    /appointments       -> list all appointments
// GET    /appointments/:id   -> get a single appointment
// DELETE /appointments/:id   -> cancel an appointment

router.post("/", appointmentController.createAppointment);
router.get("/", appointmentController.getAllAppointments);
router.get("/stats", appointmentController.getAppointmentStats);

router.patch("/:id/status", appointmentController.updateAppointmentStatus);

router.get("/:id", appointmentController.getAppointmentById);
router.delete("/:id", appointmentController.deleteAppointment);

module.exports = router;