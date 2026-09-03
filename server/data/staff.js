const bcrypt = require("bcryptjs");

const staff = [
    {
        id: 1,
        fullName: "CIT Admin",
        email: "admin@citinstitute.ng",
        password: bcrypt.hashSync("admin123", 10),
        role: "Admin"
    }
];

module.exports = staff;