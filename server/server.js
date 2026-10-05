require("dotenv").config();
require("./config/db");

const express = require('express');
const cors = require("cors");

const visitorRoutes = require("./routes/visitorRoutes");
const contactRoutes = require("./routes/contactRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const staffRoutes = require("./routes/staffRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(cors());
app.use(express.json());

app.use("/visitors", visitorRoutes);
app.use("/contact",contactRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/staff", staffRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/reports", reportRoutes);


// Define a basic route
app.get('/', (req, res) => {
    res.send('Server is running successfully!');
});

// 404 fallback
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route not found." });
});

// Central error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Something went wrong."});
})


// Start the server and listen to the defined port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});