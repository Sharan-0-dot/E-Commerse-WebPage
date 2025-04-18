// DOM Elements
const id = document.querySelector("#user-id");
const Name = document.querySelector("#user-Name");
const userData = localStorage.getItem("LogedInUser");
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

// Main Initialization
document.addEventListener("DOMContentLoaded", async () => {
  if (!userData) {
    alert("NotLoggedInSuccessfully");
    window.location.href = "index.html";
    return;
  }

  const user = JSON.parse(userData);
  id.innerHTML = `User Id : ${user.userId}`;
  Name.innerHTML = `User Name : ${user.userName}`;

  await loadProducts();
  setupEventListeners();
});

// Product Functions
const loadProducts = async (searchTerm = "") => {
    try {
      const url = searchTerm 
        ? `http://localhost:8080/Product/Search/${encodeURIComponent(searchTerm)}`
        : "http://localhost:8080/Product/";
  
      const response = await fetch(url, {
        mode: 'cors', // Explicitly request CORS mode
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) throw new Error("Failed to fetch products");
      
      const products = await response.json();
      renderProducts(products);
    } catch (error) {
      console.error("Error loading products:", error);
      productGrid.innerHTML = `<p class="error">Error loading products. Please try again.</p>`;
    }
};

const renderProducts = (products) => {
  productGrid.innerHTML = "";

  if (products.length === 0) {
    productGrid.innerHTML = `<p class="no-results">No products found</p>`;
    return;
  }

  products.forEach(product => {
    const productElement = document.createElement("div");
    productElement.className = "product";
    productElement.innerHTML = `
      <div class="image-container">
        <img src="${product.imageURL}" alt="${product.productName}" />
      </div>
      <h3>${product.productName}</h3>
      <p class="product-id" data-id="${product.productId}">ID: ${product.productId}</p>
      <p>${product.brand} - ${product.category}</p>
      <p>${product.description}</p>
      <div class="price">$${product.price}</div>
      <a href="#" class="btn">Add to Cart</a>
    `;
    productGrid.appendChild(productElement);
  });
};

// Cart Functions
const addToCart = (productElement) => {
  const productId = productElement.querySelector(".product-id").dataset.id;
  const name = productElement.querySelector("h3").innerText;
  const brandCategory = productElement.querySelector("p").innerText;
  const description = productElement.querySelectorAll("p")[1]?.innerText || "";
  const price = productElement.querySelector(".price").innerText;
  const image = productElement.querySelector("img").src;

  const product = {
    productId,
    name,
    description: `${brandCategory} - ${description}`,
    price,
    image
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
};

// Event Listeners
const setupEventListeners = () => {
  // Cart buttons
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn")) {
      event.preventDefault();
      addToCart(event.target.closest(".product"));
    }
  });

  // Search functionality
  searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim();
    loadProducts(searchTerm);
  });

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const searchTerm = searchInput.value.trim();
      loadProducts(searchTerm);
    }
  });
};