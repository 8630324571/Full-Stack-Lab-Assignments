const productList = document.getElementById("productList");
const productForm = document.getElementById("productForm");

// Fetch and display products
async function fetchProducts() {
    try {
        const response = await fetch("/api/products");
        const products = await response.json();

        displayProducts(products);

    } catch (error) {
        productList.innerHTML = "<p>Unable to load products.</p>";
        console.error(error);
    }
}

// Display products on frontend
function displayProducts(products) {
    productList.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <h3>${product.name}</h3>
            <p><strong>ID:</strong> ${product.id}</p>
            <p><strong>Price:</strong> ₹${product.price}</p>
            <p class="rating">⭐ Rating: ${product.rating}/5</p>
        `;

        productList.appendChild(card);
    });
}

// Add new product
productForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const price = document.getElementById("price").value;
    const rating = document.getElementById("rating").value;

    if (!name || price === "" || rating === "") {
        alert("Please fill all fields.");
        return;
    }

    try {
        const response = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                price,
                rating
            })
        });

        if (!response.ok) {
            throw new Error("Failed to add product.");
        }

        alert("Product added successfully!");

        productForm.reset();

        // Refresh product list
        fetchProducts();

    } catch (error) {
        alert("Error adding product.");
        console.error(error);
    }
});

// Load products when page opens
fetchProducts();