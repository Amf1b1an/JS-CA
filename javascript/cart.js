
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const emptyCartMessage = document.getElementById("empty-cart-message");

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        emptyCartMessage.style.display = "block";
        totalPriceElement.textContent = "";
        return;
    } else {
        emptyCartMessage.style.display = "none";
    }

    let totalPrice = 0;

    cart.forEach((product, index) => {
        const itemElement = document.createElement("li");
        itemElement.innerHTML = `
            <div class="item-box">
                <img src="${product.image}" alt="${product.name}" width="100">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Price: ${product.price}</p>
                <button onclick="removeFromCart(${index})" class="remove-singular">Remove</button>
            </div>
            <hr>
        `;

        cartContainer.appendChild(itemElement);

        const priceNumber = parseFloat(product.price.replace(/[^0-9.]/g, "")) || 0;
        totalPrice += priceNumber;
    });

    totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

document.getElementById("clear-cart").addEventListener("click", function () {
    localStorage.removeItem("cart");
    loadCart();
});

document.getElementById("proceed-checkout").addEventListener("click", function () {
    window.location.href = "Checkou.html";
});

window.onload = function () {
    loadCart();
};

