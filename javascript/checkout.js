function loadCheckout() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const checkoutContainer = document.getElementById("checkout-items");
    const checkoutTotalPriceElement = document.getElementById("checkout-total-price");

    checkoutContainer.innerHTML = "";

    if (cart.length === 0) {
        checkoutContainer.innerHTML = "<p>Your cart is empty.</p>";
        checkoutTotalPriceElement.textContent = "";
        return;
    }

    let totalPrice = 0;

    cart.forEach((product) => {
        const itemElement = document.createElement("li");
        itemElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" width="100">
            <h3>${product.name}</h3>
            <p>Price: ${product.price}</p>
        `;

        checkoutContainer.appendChild(itemElement);

        const priceNumber = parseFloat(product.price.replace(/[^0-9.]/g, "")) || 0;
        totalPrice += priceNumber;
    });

    checkoutTotalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
}

// 🛒 Handle Order Submission
document.getElementById("checkout-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;

    if (!name || !email || !address) {
        alert("Please fill in all required fields.");
        return;
    }

    alert(`Thank you for your order, ${name}! A confirmation email has been sent to ${email}.`);

    localStorage.removeItem("cart"); // Clear cart after checkout
    window.location.href = "thankyou.html"; // Redirect to a thank-you page
});

// 🚀 Load checkout page data
window.onload = function () {
    loadCheckout();
};
