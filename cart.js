

document.addEventListener("DOMContentLoaded", updateCartDisplay);
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartItemsContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p class='empty'>Your cart is empty.</p>";
      totalElement.textContent = "0.00";
      return;
    }

    cart.forEach((item, index) => {
      const price = parseFloat(item.price.replace(/[^\d.]/g, "")) || 0;
      total += price;

      const itemDiv = document.createElement("div");
      itemDiv.className = "cart-item";
      itemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-info">
          <h4>${item.name}</h4>
          <p>${item.description}</p>
          <p><strong>${item.price}</strong></p>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
      `;
      cartItemsContainer.appendChild(itemDiv);
    });

    totalElement.textContent = total.toFixed(2);
}
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
}

