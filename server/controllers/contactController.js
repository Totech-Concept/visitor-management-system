const pool = require("../config/db");
// const contactsData = require("../data/contacts");

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// GET all contacts
async function getAllContacts(req, res) {
    try {
        const [contacts] = await pool.query(`
            SELECT id, first_name AS firstName, last_name AS lastName, email, subject, message, created_at AS createdAt
            FROM contacts ORDER BY created_at DESC    
        `);

        return res.status(200).json({
            success: true,
            data: contacts
        });
    } catch (error) {
        console.error("Error fetching contacts:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch contact messages."
        });
    }
}

// GET contact by id
async function getContactById(req, res) {
    try {
        const { id } = req.params;
    
        if (!/^\d+$/.test(id) || Number(id) < 1) {
            return res.status(400).json({
                success: false,
                message: "Invalid contact ID."
            });
        }

        const [contacts] = await pool.query(`
            SELECT id, first_name AS firstName, last_name AS lastName, email, subject, message,
            created_at AS createdAt FROM contacts WHERE id = ?`, [id]
        );
        
            if (contacts.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: `Contact with ID ${id} not found.`
            });
        }

        return res.status(200).json({
                success: true,
                data: contacts[0]
            });
        } catch (error) {
            console.error("Error fetching contact:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to fetch contact message."
            });
        }
    }

    // CREATE contact
async function createContact(req, res) {
    try {
        const { firstName, lastName, email, subject, message } = req.body;

        const missingFields = [];

        if (typeof firstName !== "string" || !firstName.trim()) 
            missingFields.push("firstName");
        
        if (typeof lastName !== "string" || !lastName.trim()) 
            missingFields.push("lastName");
        
        if (typeof email !== "string" || !email.trim()) 
            missingFields.push("email");
        
        if (typeof subject !== "string" || !subject.trim()) 
            missingFields.push("subject");
        
        if (typeof message !== "string" || !message.trim()) 
            missingFields.push("message");
        
        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Missing required field(s): ${missingFields.join(", ")}`,
            });
        }

        const cleanEmail = email.trim();

        if (!validateEmail(cleanEmail)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address."
            });
        }

        if (
            firstName.trim().length > 100 ||
            lastName.trim().length > 100 ||
            cleanEmail.length > 150 ||
            subject.trim().length > 200
        ) {
            return res.status(400).json({
                success: false,
                message: "One or more fields exceed the allowed length."
            });
        }

        const [result] = await pool.execute(`
            INSERT INTO contacts (first_name, last_name, email, subject, message)
            VALUES (?, ?, ?, ?, ?)`,
            [
                firstName.trim(),
                lastName.trim(),
                cleanEmail,
                subject.trim(),
                message.trim(),
            ]
        );

        return res.status(201).json({
            success: true,
            message: "Your message has been received. We'll get back to you soon.",
            data: {
                id: result.insertId,
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: cleanEmail,
                subject: subject.trim(),
                message: message.trim()
            }
        });
    } catch (error) {
        console.error("Error creating contact:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to submit your message."
        });
    }
}

// DELETE contact
async function deleteContact(req, res) {
    try {
        const { id } = req.params;

        if (!/^\d+$/.test(id) || Number(id) < 1) {
            return res.status(400).json({
                success: false,
                message: "Invalid contact ID."
            });
        }

        const [result] = await pool.execute(
            "DELETE FROM contacts WHERE id = ?", [id]
        );

        if(result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: `Contact with ID ${id} not found.`
            });

        }
            return res.status(200).json({
                success: true,
                message: "Contact deleted successfully."
            });
        } catch (error) {
            console.error("Error deleting contact:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to delete contact message"
            });
        }
    }




    module.exports = {
        getAllContacts,
        getContactById,
        createContact,
        deleteContact,
    };