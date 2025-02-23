const apiUrl = "https://v2.api.noroff.dev/gamehub/";

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; 
    console.log("Before adding:", cart);
    cart.push(product); 
    localStorage.setItem("cart", JSON.stringify(cart)); 
    console.log("After adding:", cart);
    alert("Product added to cart!"); 
}

async function fetchProduct(id) {
    try {
        const response = await fetch(`${apiUrl}${id}`);
        if (!response.ok) throw new Error("Game not found");

        const { data: product } = await response.json();
        console.log("Fetched Product Data:", product); 

        document.getElementById("product-title").textContent = product.title;
        document.getElementById("product-image").src = product.image.url;
        document.getElementById("product-image").alt = product.title;
        document.getElementById("product-description").textContent = product.description;
        document.getElementById("product-price").textContent = `$${product.discountedPrice ?? product.price}`;
        document.getElementById("genre").textContent = product.genre;
        document.getElementById("release-date").textContent = product.released;
        document.getElementById("age-rating").textContent = product.ageRating;
        document.getElementById("on-sale").textContent = product.onSale ? "On Sale" : "Not on Sale";

        document.getElementById("add-to-cart").addEventListener("click", function () {
            addToCart({
                name: product.title,
                image: product.image.url,
                description: product.description,
                age: product.ageRating,
                price: `$${product.discountedPrice ?? product.price}`
            });
        });

    } catch (error) {
        console.error("Error loading product:", error);
        document.getElementById("product-container").innerHTML = "<p>Game Not Found</p>";
    }
}


if (productId) {
    fetchProduct(productId);
} else {
    console.error("No product ID provided in the URL.");
    document.getElementById("product-container").innerHTML = "<p>No Product ID specified.</p>";
}
