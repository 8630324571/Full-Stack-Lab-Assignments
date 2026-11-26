const express = require("express");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set EJS as template engine
app.set("view engine", "ejs");

// Route 1: Home page
app.get("/", (req, res) => {
    res.render("index");
});

// Route 2: About page
app.get("/about", (req, res) => {
    res.render("about");
});

// Route 3: Contact page
app.get("/contact", (req, res) => {
    res.render("contact");
});

// Route 4: Display users
app.get("/users", (req, res) => {
    const users = ["Rahul", "Aman", "Sonu", "Priya"];

    res.render("users", { users });
});

// Route 5: POST route for contact form
app.post("/submit", (req, res) => {
    const name = req.body.name;
    const message = req.body.message;

    res.render("result", {
        name: name,
        message: message
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});