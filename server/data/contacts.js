const contacts = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    subject: "Course Inquiry",
    message: "I would like to know more about your courses.",
    createdAt: new Date("2026-08-01T09:15:00Z").toISOString(),
  },
  {
    firstName: "Mary",
    lastName: "Jonathan",
    email: "mary@example.com",
    subject: "Partnership",
    message: "I would like to partner with you.",
    createdAt: new Date("2026-08-01T09:15:00Z").toISOString(),
  },
];

let nextId = contacts.length + 1;

function getAll() {
  return contacts
}

function getById(id) {
  return contacts.find((contact) => contact.id === Number(id));
}

function create({ firstName, lastName, email, subject, message }) {
  const newContact = {
    id: nextId++,
    firstName,
    lastName,
    email,
    subject,
    message,
    createdAt: new Date().toISOString(),
  };
  contacts.push(newContact);
  return newContact;
}

function remove(id) {
  const index = contacts.findIndex((contact) => contact.id === Number(id))
  if (index === -1) return false;
  contacts.splice(index, 1);
  return true;
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
};