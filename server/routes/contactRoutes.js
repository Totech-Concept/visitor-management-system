const express = require("express");
const router = express.Router();

const contactController = require("../controllers/contactController");

// POST   /api/contact         -> submit the contact form
// GET    /api/contact         -> list all submitted messages
// GET    /api/contact/:id     -> get a single message
// DELETE /api/contact/:id     -> delete a message

router.post("/", contactController.createContact);
router.get("/", contactController.getAllContacts);
router.get("/:id", contactController.getContactById);
router.delete("/:id", contactController.deleteContact);

module.exports = router;