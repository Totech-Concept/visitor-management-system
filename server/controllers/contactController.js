const { isValidElement } = require("react");
const contactsData = require("../data/contacts");

function validateEmail(email) {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return isValidEmail.test(email);
}

function getAllContacts(req, res) {
    const contacts = contactsData.getAll();
    return res.status(200).json({
        success: true,
        data: contacts
    });
}

function getContactById(req, res) {
    const { id } = req.params;
    const contact = contactsData.getById(id);

    if (!contact) {
        return res.status(404).json({
            success: false,
            message: `Contact with ${id} not found.`
        });
    }

    return res.status(200).json({
            success: true,
            data: contact
        });
}

function createContact(req, res) {
    const { firstName, lastName, email, subject, message } = req.body;

    const missingFields = [];
    if (!firstName) missingFields.push("firstName");
    if (!lastName) missingFields.push("lastName");
    if (!email) missingFields.push("email");
    if (!subject) missingFields.push("subject");
    if (!message) missingFields.push("message");

    if (missingFields.length > 0) {
        return res.status(400).json({
            success: false,
            message: `Missing required field(s): ${missingFields.join(", ")}`,
        });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid email address."
        });
    }

    const newContact = contactsData.create({
        firstName,
        lastName,
        email,
        subject,
        message,
    });

    return res.status(201).json({
        success: true,
        message: "Your message has been received. We'll get back to you soon.",
        data: newContact,
    });
}

function deleteContact(req, res) {
    const { id } = req.params;
    const wasDeleted = contacts.remove(id);

    if(!wasDeleted) {
        return res.status(404).json({
            success: false,
            message: `Contact with ${id} not found.`
        });

    }
        return res.status(200).json({
            success: true,
            message: "Contact deleted."
        });
}



// const submitContact = (req, res) => {
//     const newContact = req.body;

//     contacts.push(newContact);

//     console.log(newContact);

//     res.status(201).json({
//         success: true,
//         message: "Message submitted successfully"
//     });
// };

// module.exports = submitContact;

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    deleteContact,
};