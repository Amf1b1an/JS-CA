const apiUrl = "https://v2.api.noroff.dev/gamehub/";
const productId = "2ace4e1d-cad7-4d35-8d59-6c9ac3e3eaf8";

// 🛒 Function to Add Product to Cart
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Get existing cart or create an empty array
    cart.push(product); // Add the new product to the cart
    localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart to localStorage
    alert("Product added to cart!"); // Confirmation message (optional)
}

// 🎮 Fetch and Display API Product
async function fetchProduct(id) {
    try {
        const response = await fetch(`${apiUrl}${id}`);
        if (!response.ok) throw new Error("Game not found");

        const { data: product } = await response.json();
        console.log("Fetched Product Data:", product); // Debugging

        // 🖼️ Display product details
        document.getElementById("product-title").textContent = product.title;
        document.getElementById("product-image").src = product.image.url;
        document.getElementById("product-image").alt = product.title;
        document.getElementById("product-description").textContent = product.description;
        document.getElementById("product-price").textContent = `$${product.discountedPrice ?? product.price}`;

        // 🛒 Add to Cart button event listener
        document.getElementById("add-to-cart").addEventListener("click", function () {
            addToCart({
                name: product.title,
                image: product.image.url,
                description: product.description,
                price: `$${product.discountedPrice ?? product.price}`
            });
        });

    } catch (error) {
        console.error("Error loading product:", error);
        document.getElementById("product-container").innerHTML = "<p>Game Not Found</p>";
    }
}

// Fetch product details when the page loads
fetchProduct(productId);
