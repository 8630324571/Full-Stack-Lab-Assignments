const express = require("express");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// EJS setup
app.set("view engine", "ejs");

// Temporary product data
let products = [
    {
        id: 1,
        name: "Laptop",
        price: 50000,
        description: "High-performance laptop"
    },
    {
        id: 2,
        name: "Mobile",
        price: 20000,
        description: "Android smartphone"
    }
];

let nextId = 3;

// READ: Display products
app.get("/", (req, res) => {
    res.render("index", { products });
});

// CREATE: Add product
app.post("/products", (req, res) => {
    const { name, price, description } = req.body;

    products.push({
        id: nextId++,
        name,
        price,
        description
    });

    res.redirect("/");
});

// UPDATE: Display edit page
app.get("/products/edit/:id", (req, res) => {
    const product = products.find(
        p => p.id === Number(req.params.id)
    );

    if (!product) {
        return res.status(404).send("Product not found");
    }

    res.render("edit", { product });
});

// UPDATE: Save edited product
app.post("/products/update/:id", (req, res) => {
    const product = products.find(
        p => p.id === Number(req.params.id)
    );

    if (!product) {
        return res.status(404).send("Product not found");
    }

    product.name = req.body.name;
    product.price = req.body.price;
    product.description = req.body.description;

    res.redirect("/");
});

// DELETE: Remove product
app.post("/products/delete/:id", (req, res) => {
    products = products.filter(
        p => p.id !== Number(req.params.id)
    );

    res.redirect("/");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});