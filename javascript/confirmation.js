window.onload = function () {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const confirmationContainer = document.getElementById("purchased-items");

    if (cart.length === 0) {
        confirmationContainer.innerHTML = "<p>No items purchased.</p>";
        return;
    }

    cart.forEach((product) => {
        const itemElement = document.createElement("li");
        itemElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" width="150">
            <h3>${product.name}</h3>
            <p>Price: ${product.price}</p>
        `;
        confirmationContainer.appendChild(itemElement);
    });

};

document.getElementById("return-home").addEventListener("click", function () {
    if (this.disabled) return;
    localStorage.removeItem("cart");
    window.location.href = "../index.html";
});