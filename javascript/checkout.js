function loadCheckout() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const checkoutContainer = document.getElementById("checkout-items");
    const checkoutTotalPriceElement = document.getElementById("checkout-total-price");
    const buyNow = document.getElementById("buy-now")

    checkoutContainer.innerHTML = "";

    if (cart.length === 0) {
        checkoutContainer.innerHTML = "<p>Your cart is empty.</p>";
        checkoutTotalPriceElement.textContent = "";
        buyNow.disabled = true;
        buyNow.style.opacity = "0.5";
        buyNow.style.cursor = "not-allowed";
        return;
    } 

    let totalPrice = 0;

    cart.forEach((product) => {
        const itemElement = document.createElement("li");
        itemElement.innerHTML = `
            <div class="summary-box">
                <img src="${product.image}" alt="${product.name}" width="150">
                <div class="summary-items">
                    <h3>${product.name}</h3>
                    <p>Price: ${product.price}</p>
                </div>
            </div>
            <hr>
        `;

        checkoutContainer.appendChild(itemElement);

        const priceNumber = parseFloat(product.price.replace(/[^0-9.]/g, "")) || 0;
        totalPrice += priceNumber;
    });

    checkoutTotalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
}

function validateForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const payment = document.getElementById("payment").value.trim();
    const buyNow = document.getElementById("buy-now");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (name !== "" && email !== "" && payment !== "" && cart.length > 0) {
        buyNow.disabled = false; 
        buyNow.style.opacity = "1";
        buyNow.style.cursor = "pointer";
    } else {
        buyNow.disabled = true; 
        buyNow.style.opacity = "0.5";
        buyNow.style.cursor = "not-allowed";
    }
}


document.getElementById("name").addEventListener("input", validateForm);
document.getElementById("email").addEventListener("input", validateForm);
document.getElementById("payment").addEventListener("change", validateForm);

document.getElementById("checkout-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const payment = document.getElementById("payment").value;
    const cart = JSON.parse(localStorage.getItem("cart")) || []

    if (!name || !email) {
        alert("Please fill in all required fields.");
        return;
    }

    alert(`Thank you for your order, ${name}! A confirmation email has been sent to ${email}.`);

    window.location.href = "Confirmation.html"; 
});

document.getElementById("buy-now").addEventListener("click", function () {
    if (this.disabled) return;
    window.location.href = "Confirmation.html";
});


window.onload = function () {
    loadCheckout();
};
