const express = require('express');
const cors = require("cors");
const visitorRoutes = require("./routes/visitorRoutes");
const contactRoutes = require("./routes/contactRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON requests
app.use(cors());
app.use(express.json());

app.use("/visitors", visitorRoutes);
app.use("/contact",contactRoutes);
app.use("/appointments", appointmentRoutes);


// Define a basic route
app.get('/', (req, res) => {
    res.send('Server is running successfully!');
});

// Define an API endpoint that returns data
app.get('/visitors', (req, res) => {
    res.json(visitors);
});

app.post('/visitors', (req, res) => {
    const newVisitor = {
      id: visitors.length + 1,
      ...req.body,
      status: "scheduled"
    }

    console.log(newVisitor)
    visitors.push(newVisitor)

    res.json({
      message: "Visitor added successfully"
    })
})

// Start the server and listen to the defined port
app.listen(PORT, () => {
    console.log(`Server is live at http://localhost:${PORT}`);
});