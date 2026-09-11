const appointments = [
    {
    id: 1,
    referenceNumber: "CIT-APT-1001",
    fullName: "Adaeze Okonkwo",
    company: "Individual",
    email: "adaeze.okonkwo@example.com",
    phone: "+234 800 000 0000",
    purpose: "Prospective Student Visit",
    date: "2026-08-25",
    time: "10:00 AM",
    notes: "Interested in the front-end development track.",
    status: "confirmed",
    createdAt: new Date("2026-08-15T09:00:00Z").toISOString(),
  },
];

let nextId = appointments.length + 1;

function generateReferenceNumber(id) {
  return `CIT-APT-${1000 + id}`;
}

function getAll() {
  return appointments;
}

function getById(id) {
  return appointments.find((appt) => appt.id === Number(id));
}

// Basic double-booking guard: same date + same time slot already taken.
function isSlotTaken(date, time) {
  return appointments.some((appt) => appt.date === date && appt.time === time)
}

function create({ fullName, company, email, phone, purpose, date, time, notes }) {
  const id = nextId++;
  const newAppointment = {
    id,
    referenceNumber: generateReferenceNumber(id),
    fullName,
    company: company || "Individual",
    email,
    phone,
    purpose,
    date,
    time,
    notes: notes || "",
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };
  appointments.push(newAppointment);
  return newAppointment;
}

function remove(id) {
  const index = appointments.findIndex((appt) => appt.id === Number(id));
  if(index === -1) return false;
  appointments.splice(index, 1);
  return true;
}


module.exports = {
  getAll,
  getById,
  create,
  remove,
  isSlotTaken,
}