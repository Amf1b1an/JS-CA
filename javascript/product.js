fetch('https://v2.api.noroff.dev/gamehub/2ace4e1d-cad7-4d35-8d59-6c9ac3e3eaf8')
    .then(res => {
        if (res.ok) {
            console.log('VALID')
        } else {
            console.log("INVALID")
        }
    })
    .then(data => console.log(data))
    .catch(error => console.log('ERROR'))

async function fetchProduct(id){

    try {
        const response = await fetch (`${apiUrl}${id}`);
        if (!response.ok) throw new Error ("Game not found");

        const { data: product } = await response.json()


        document.getElementById("product-title").textContent = product.title;
        document.getElementById("product-image").src = product.image.url;
        document.getElementById("product-image").alt = product.title;
        document.getElementById("product-description").textContent = product.description;
        document.getElementById("product-price").textContent = `$${product.discountedPrice ?? product.price}`;
    } catch (error) {
        console.error("Error loading product:", error);

        document.getElementById("product-container").innerHTML = "<p>Game Not Found</p>"
    }
} 

const apiUrl = "https://v2.api.noroff.dev/gamehub/";
const productId = "2ace4e1d-cad7-4d35-8d59-6c9ac3e3eaf8"
fetchProduct(productId);

fetch(`${apiUrl}${productId}`)
    .then(res => {
        if (!res.ok) {
            console.log("INVALID URL");
            return;
        }
        return res.json(); // Convert response to JSON
    })
    .then(data => console.log("Fetched Data:", data))
    .catch(error => console.error("Fetch Error:", error));