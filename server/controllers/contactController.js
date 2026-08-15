const contacts = require("../data/contacts");

const submitContact = (req, res) => {
    const newContact = req.body;

    contacts.push(newContact);

    console.log(newContact);

    res.status(201).json({
        success: true,
        message: "Message submitted successfully"
    });
};

module.exports = submitContact;