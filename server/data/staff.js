const bcrypt = require("bcryptjs");

const staff = [
    {
        id: 1,
        fullName: "CIT Admin",
        email: "admin@citinstitute.ng",
        passwordHash: bcrypt.hashSync("admin123", 10),
        role: "Admin"
    }
];

function getByEmail(email) {
    return staff.find((user) => user.email.toLowerCase() === String(email).toLowerCase());
}

function getById(id) {
    return staff.find((user) => user.id === Number(id));
}

// const hash = bcrypt.hashSync("admin123", 10);

// console.log(hash);

module.exports = {
    getByEmail,
    getById,
};