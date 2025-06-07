const apiUrl = "https://v2.api.noroff.dev/gamehub/";

async function fetchAllProducts() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Failed to fetch products");
    

    const { data: products } = await response.json();
    


    const container = document.getElementById("products-container");
    if (!container) {
      throw new Error("Container with ID 'products-container' not found in HTML");
    }
    container.innerHTML = ""; 


    products.forEach(product => {

      const productBox = document.createElement("div");
      productBox.classList.add("game-box");


      productBox.innerHTML = `
        <a href="html/Product.html?id=${product.id}">
          <img src="${product.image.url}" class="game-poster" alt="Cover of ${product.title}">
        </a>
        <div class="Homepage-title-desc">
          <a href="html/Product.html?id=${product.id}">
            <h2 class="homepage-title">${product.title}</h2>
          </a>
          <div class="game-des-pricing">
            <p class="game-des">${product.description}</p>
            <p class="pricing">$${product.discountedPrice ?? product.price}</p>
          </div>
          <div class="homepage-genre-release">
            <p class="homepage-genre">${product.genre}</p>
            <p class="age-rating-product">${product.ageRating}</p>
            <p class="homepage-release">${product.released}</p>
          </div>
        </div>
      `;


      container.appendChild(productBox);
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    const container = document.getElementById("products-container");
    if (container) {
      container.innerHTML = "<p>Products could not be loaded.</p>";
    }
  }
}


document.addEventListener("DOMContentLoaded", fetchAllProducts);