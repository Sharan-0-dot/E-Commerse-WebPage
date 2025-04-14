const id = document.querySelector("#user-id");
const Name = document.querySelector("#user-Name");
const userData = localStorage.getItem("LogedInUser");


document.addEventListener("DOMContentLoaded", async () => {
    if(!userData) {
        alert("NotLoggedInSuccessfully");
        window.location.href = "index.html";
        return;
    }
    const user = JSON.parse(userData);
    id.innerHTML = `User Id : ${user.userId}`;
    Name.innerHTML = `User Name : ${user.userName}`;

    await addProducts();
});

const addProducts = async () => {
  const ProductURL = "http://localhost:8080/Product/";

  try {
    const response = await fetch(ProductURL);
    if (!response.ok) throw new Error("Failed to fetch products");

    const products = await response.json();
    const productGrid = document.getElementById("productGrid");

    productGrid.innerHTML = ""; // Clear any existing content

    products.forEach(product => {
      const productElement = document.createElement("div");
      productElement.className = "product";
      productElement.innerHTML = `
        <div class="image-container">
        <img src="${product.imageURL}" alt="${product.productName}" />
        </div>
        <h3>${product.productName}</h3>
        <p>${product.brand} - ${product.category}</p>
        <p>${product.description}</p>
        <div class="price">₹${product.price}</div>
        <a href="#" class="btn">Add to Cart</a>
        `;
      productGrid.appendChild(productElement);
    });

  } catch (error) {
    console.error("Error loading products:", error);
  }
};