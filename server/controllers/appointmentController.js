const pool = require("../config/db");
// const appointmentsData = require("../data/appointments");

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

// 1. GET ALL APPOINTMENTS
async function getAllAppointments(req, res) {
    try {
        const [appointments] = await pool.query(
            `SELECT 
                id,
                reference_number,
                full_name,
                company, 
                email, 
                phone, 
                purpose, 
                appointment_date, 
                appointment_time, 
                notes, 
                status, 
                created_at,
                updated_at 
            FROM appointments 
            ORDER BY appointment_date ASC, appointment_time ASC`
        );

        return res.status(200).json({
            success: true,
            data: appointments,
        });
    } catch (error) {

        console.error("Error fetching appointments:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch appointments.",
        });
    }
}

// GET APPOINTMENT BY ID
async function getAppointmentById(req, res) {
    const { id } = req.params;

    try {
        const [appointments] = await pool.query(`
            SELECT
                id,
                reference_number,
                full_name,
                company,
                email,
                phone,
                purpose,
                appointment_date,
                appointment_time,
                notes,
                status,
                created_at,
                updated_at
            FROM appointments
            WHERE id = ? 
        `, [id]);
    
        if(appointments.length === 0) {

            return res.status(404).json({
                success: false,
                message: `Appointment with id ${id} not found.`,
            });
        }

        return res.status(200).json({
            success: true,
            data: appointments[0],
        });
    } catch (error) {
        console.error("Error fetching appointment:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch appointment."
        });
    }
}

// 3. CREATE APPOINTMENT
async function createAppointment(req, res) {
    const { fullName, company, email, phone, purpose, date, time, notes } = req.body;

    // Check for missing required fields
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

    // Validate email
    if(!validateEmail(email)) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid email address.",
        });
    }

    // Validate date format
    if(!validateDate(date)) {
        return res.status(400).json({
            success: false,
            message: "Preferred date must be a valid date.",
        });
    }

    // Check that the date is not in the past
    if(isPastDate(date)) {
        return res.status(400).json({
            success: false,
            message: "Preferred date cannot be in the past.",
        });
    }


    try {
        // Check whether the appointment is already booked.
        const [existingAppointments] = await pool.query(`
            SELECT id
            FROM appointments
            WHERE appointment_date = ?
            AND appointment_time = ?
        `, [date, time]);

        if (existingAppointments.length > 0) {
            return res.status(409).json({
                success: false,
                message: `The ${time} slot on ${date} is already booked. Please choose another time.`,
            });
        }
    
        // Get the latest appointment ID
        const [lastAppointment] = await pool.query(`
            SELECT id
            FROM appointments
            ORDER BY id DESC
            LIMIT 1
        `);

        // Generate the next reference number
        const nextId = lastAppointment.length > 0
            ? lastAppointment[0].id + 1
            : 1;

        const referenceNumber = `CIT-APT-${1000 + nextId}`;

        // Insert appointment into database
        const [result] = await pool.query(`
            INSERT INTO appointments (
                reference_number,
                full_name,
                company,
                email,
                phone,
                purpose,
                appointment_date,
                appointment_time,
                notes,
                status
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            referenceNumber,
            fullName,
            company || "Individual",
            email,
            phone,
            purpose,
            date,
            time,
            notes || "",
            "confirmed"
        ]);

        // Get the newly appointment
        const [newAppointment] = await pool.query(`
            SELECT
                id,
                reference_number,
                full_name,
                company,
                email,
                phone,
                purpose,
                appointment_date,
                appointment_time,
                notes,
                status,
                created_at,
                updated_at
            FROM appointments
            WHERE id = ?
        `, [result.insertId]);

        return res.status(201).json({
            success: true,
            message: `Appointment confirmed! Your reference number is ${referenceNumber}.`,
            data: newAppointment[0],
        });
    } catch (error) {
        
        console.error("Error creating appointment:", error);

        // MySQL duplicate-entry error.
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                success: false,
                message: `The ${time} slot on ${date} is already booked. Please choose another time.`,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to create appointment."
        })
    }
}


// 4. DELETE / CANCEL APPOINTMENT
async function deleteAppointment(req, res) {
    const { id } = req.params;

    try {
        const [result] = await pool.query(
            `DELETE FROM appointments WHERE id = ?`,
            [id]
        );

        if(result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: `Appointment with id ${id} not found.`,
        });
    }

        return res.status(200).json({
            success: true,
            message: "Appointment cancelled."
        });
    } catch (error) {

        console.error("Error deleting appointment:", error);
        
        return res.status(500).json({
            success: false,
            message: "Failed to cancel appointment."
        });
    }
}

// Appointment statistics
const getAppointmentStats = async (req, res) => {
    try {
    

        const [todayRows] = await pool.query(`
            SELECT COUNT(*) AS count FROM appointments WHERE appointment_date = CURDATE()
            AND status = 'confirmed'
        `);

        const [upcomingRows] = await pool.query(`
            SELECT COUNT(*) AS count FROM appointments WHERE appointment_date > CURDATE()
            AND status = 'confirmed'
        `);

        const [confirmedRows] = await pool.query(`
            SELECT COUNT(*) AS count FROM appointments 
            WHERE status = 'confirmed'
        `);

        const [cancelledRows] = await pool.query(`
            SELECT COUNT(*) AS count FROM appointments 
            WHERE status != 'confirmed'
        `);

        res.status(200).json({
            today: Number(todayRows[0].count) || 0,
            upcoming: Number(upcomingRows[0].count) || 0,
            confirmed: Number(confirmedRows[0].count) || 0,
            cancelled: Number(cancelledRows[0].count) || 0
        });
    } catch (error) {
        console.error("Error fetching appointment statistics:", error);

        res.status(500).json({
            message: "Failed to fetch appointment statistics"
        });
    }
};

const updateAppointmentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Only cancellation is allowed through this endpoint for now
        // if (status !== "cancelled") {
        //     return res.status(400).json({
        //         message: "Invalid appointment status."
        //     });
        // }

        
        // Validate allowed status options
        const allowedStatuses = ["confirmed", "cancelled", "checked_in", "check_out"];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid appointment status."
            });
        }
        
        // Fetch the appointment
        const [appointmentRows] = await pool.query(
            `SELECT id, appointment_date, appointment_time, status FROM appointments WHERE id = ?`, [id]
        );

        if (appointmentRows.length === 0) {
            return res.status(404).json({
                message: "Appointment not found."
            });
        }

        const appointment = appointmentRows[0];

        // Handle Cancellation Specific Checks
        if (status === "cancelled") {
            if (appointment.status === 'cancelled') {
            return res.status(400).json({
                message: "This appointment has already been cancelled."
            });
        }

        // Only confirmed appointments can be cancelled
        if (appointment.status !== "confirmed") {
            return res.status(400).json({
                message: "Only confirmed appointments can be cancelled."
            });
        }

        // Do not allow cancellation of a past-date appointment
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const appointmentDate = new Date(appointment.appointment_date);
        appointmentDate.setHours(0, 0, 0, 0);

        if (appointmentDate < today) {
            return res.status(400).json({
                message: "A past appointment cannot be cancelled."
            });
        }

        // Check if a visitor has checked in or out
        const [visitorRows] = await pool.query(
            "SELECT id, status FROM visitors WHERE appointment_id = ? LIMIT 1", [id]
        );

        if (visitorRows.length > 0) {
            const visitorStatus = visitorRows[0].status?.toLowerCase();

            if (visitorStatus === "checked in" || visitorStatus === "checked_in" || visitorStatus === "checked out" || visitorStatus === "checked_out") {
                return res.status(400).json({
                    message: `This appointment cannot be cancelled because the visitor is already ${visitorRows[0].status}.`
                });
            }
        }
    }

        // Cancel appointment
        await pool.query(
            `UPDATE appointments SET status = 'cancelled' WHERE id = ?`, [id]
        );

        return res.status(200).json({
            message: "Appointment cancelled successfully."
        });
    } catch (error) {
        console.error("Error updating appointment status:", error);

        res.status(500).json({
            message: "Failed to update appointment status."
        });
    }
};

module.exports = {
    getAllAppointments,
    getAppointmentById,
    createAppointment,
    deleteAppointment,
    getAppointmentStats,
    updateAppointmentStatus
};