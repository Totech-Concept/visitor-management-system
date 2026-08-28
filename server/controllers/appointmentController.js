const appointments = require("../data/appointments");

const submitAppointment = (req, res) => {
    const {
        fullName,
        company,
        email,
        phone,
        purpose,
        date,
        time,
        notes
    } = req.body;

    const newAppointment = {
        fullName,
        company,
        email,
        phone,
        purpose,
        date,
        time,
        notes,
        status: "pending"
    };

    appointments.push(newAppointment);

    console.log(newAppointment);

    res.status(201).json({
        success: true,
        message: "Appointment booked successfully",
        appointment: newAppointment
    });
};

module.exports = submitAppointment;