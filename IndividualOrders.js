document.addEventListener("DOMContentLoaded", async () => {
    // Check if user is logged in
    const userData = localStorage.getItem("LogedInUser");
    if(!userData) {
      alert("Please login first");
      window.location.href = "index.html";
      return;
    }
  
    // Get orderId from localStorage
    const orderId = localStorage.getItem("selectedOrderId");
    if(!orderId) {
      alert("No order selected");
      window.location.href = "profile.html";
      return;
    }
  
    // Set up back button
    const backBtn = document.getElementById("backBtn");
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        window.location.href = "profile.html";
      });
    }
  
    // Fetch order items
    await fetchOrderItems(orderId);
  });
  
  const fetchOrderItems = async (orderId) => {
    const URL = `http://localhost:8080/User/Orders/items/${orderId}`;
    
    try {
      const response = await fetch(URL);
      if(!response.ok) {
        throw new Error("Could not fetch order details");
      }
      
      const items = await response.json();
      
      if(items.length === 0) {
        document.getElementById("itemsContainer").innerHTML = "<p>No items found in this order</p>";
        return;
      }
  
      // Update order summary
      const order = items[0].order;
      document.getElementById("order-id").textContent = `Order ID: ${order.orderId}`;
      document.getElementById("order-date").textContent = `Date: ${formatOrderTime(order.time)}`;
      document.getElementById("order-total").textContent = `Total: ₹${order.totalPrice.toFixed(2)}`;
  
      // Display items
      const container = document.getElementById('itemsContainer');
      container.innerHTML = '';
  
      items.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card';
  
        itemCard.innerHTML = `
          <img src="${item.product.imageURL}" alt="${item.product.productName}" class="item-image">
          <div class="item-details">
            <h4 class="item-name">${item.product.productName}</h4>
            <p class="item-brand">Brand: ${item.product.brand}</p>
            <p class="item-price">Price: ₹${item.price.toFixed(2)}</p>
            <p class="item-quantity">Quantity: ${item.quantity}</p>
            <p class="item-description">${item.product.description}</p>
          </div>
        `;
  
        container.appendChild(itemCard);
      });
  
    } catch(error) {
      console.error("Error fetching order items:", error);
      document.getElementById("itemsContainer").innerHTML = 
        `<p class="error">Error loading order details. Please try again later.</p>`;
    }
  }
  
  function formatOrderTime(isoString) {
    const date = new Date(isoString);
  
    // Format: DD/MM/YYYY HH:MM
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
  
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }