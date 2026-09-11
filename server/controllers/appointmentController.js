const appointmentsData = require("../data/appointments");

function validateEmail(email) {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return isValidEmail.test(email);
}

function validateDate(date) {
    const isValidDate = /^\d{4}-\d{2}-\d{2}$/
    return isValidDate.test(date);
}

function isPastDate(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const inputDate = new Date(`${date}T00:00:00`);
    return inputDate < today;
}

function getAllAppointments(req, res) {
    const appointments = appointmentsData.getAll();
    return res.status(200).json({
        success: true,
        data: appointments,
    });
}

function getAppointmentById(req, res) {
    const { id } = req.params;
    const appointment = appointmentsData.getById(id);

    if(!appointment) {
        return res.status(404).json({
            success: false,
            message: `Appointment with id {id} not found.`,
        });
    }

    return res.status(200).json({
        success: true,
        data: appointment,
    });
}

function createAppointment(req, res) {
    const { fullName, company, email, phone, purpose, date, time, notes } = req.body;

    const missingFields = [];
    if (!fullName) missingFields.push("fullName");
    if (!email) missingFields.push("email");
    if (!phone) missingFields.push("phone");
    if (!purpose) missingFields.push("purpose");
    if (!date) missingFields.push("date");
    if (!time) missingFields.push("time");

    if(missingFields.length > 0) {
        return res.status(400).json({
            success: false,
            message: `Missing required field(s): ${missingFields.join(", ")}`,
        });
    }

    if(!validateEmail(email)) {
        res.status(400).json({
            success: false,
            message: "Please provide a valid email address.",
        });
    }

    if(!validateDate(date)) {
        res.status(400).json({
            success: false,
            message: "Preferred date must be a valid date.",
        });
    }

    if(isPastDate(date)) {
        res.status(400).json({
            success: false,
            message: "Preferred date cannot be in the past.",
        });
    }
    if (appointmentsData.isSlotTaken(date, time)) {
        return res.status(409).json({
            success: false,
            message: `The ${time} slot on ${date} is already booked. Please choose another time.`,
        });
    }

    const newAppointment = appointmentsData.create({
        fullName,
        company,
        email,
        phone,
        purpose,
        date,
        time,
        notes,
    });

    return res.status(201).json({
        success: true,
        message: `Appointment confirmed! Your reference number is ${newAppointment.referenceNumber}.`,
        data: newAppointment,
    });
}

function deleteAppointment(req, res) {
    const { id } = req.params;
    const wasDeleted = appointmentsData.remove(id);

    if(!wasDeleted) {
        return res.status(404).json({
            success: false,
            message: `Appointment with id ${id} not found.`,
        });
    }

    return res.status(200).json({
        success: true,
        message: "Appointment cancelled."
    });
}

module.exports = {
    getAllAppointments,
    getAppointmentById,
    createAppointment,
    deleteAppointment,
};