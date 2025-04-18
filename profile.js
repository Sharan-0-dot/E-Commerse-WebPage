const userData = localStorage.getItem("LogedInUser");
const userName = document.querySelector("#user-Name");
const userId = document.querySelector("#user-id");
const userEmail = document.getElementById("userEmail");
const userPhone = document.getElementById("userPhone");

document.addEventListener("DOMContentLoaded", async () => {
  if(!userData) {
    alert("NotLoggedInSuccessfully");
    window.location.href = "index.html";
    return;
  }
  const user = JSON.parse(userData);
  userId.innerHTML = `User Id : ${user.userId}`;
  userName.innerHTML = `Name : ${user.userName}`;
  userEmail.innerHTML = `<strong>Email:</strong> ${user.email}`;
  userPhone.innerHTML = `<strong>Phone:</strong> +91 ${user.contact}`;

  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", logoutUser);
  }

  await findRecentOrders(user.userId);
});

const findRecentOrders = async (userId) => {
  const URL = `https://ecommerce-springboot-yevz.onrender.com/User/Orders/${userId}`;
  try {
    const response = await fetch(URL);
    if(!response.ok) {
      console.log("Could not fetch the details");
      return;
    }
    const orderData = await response.json();

    const container = document.getElementById('OrdersContainer');
    container.innerHTML = '';

    orderData.forEach(order => {
      const orderDiv = document.createElement('div');
      orderDiv.className = 'orders';

      const id = document.createElement('h5');
      id.textContent = `Order-ID : ${order.orderId}`;

      const time = document.createElement('h5');
      time.textContent = `Time : ${formatOrderTime(order.time)}`;

      const price = document.createElement('h5');
      price.textContent = `Price : ₹${order.totalPrice}`;

      const viewBtn = document.createElement('button');
      viewBtn.className = 'view';
      viewBtn.textContent = 'view';
      viewBtn.addEventListener('click', () => {
        localStorage.setItem('selectedOrderId', order.orderId);
        window.location.href = 'IndividualOrders.html';
      });

      orderDiv.appendChild(id);
      orderDiv.appendChild(price);
      orderDiv.appendChild(time);
      orderDiv.appendChild(viewBtn);

      container.appendChild(orderDiv);
    });
  } catch(error) {
    console.log(error);
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

  return `${day}/${month}/${year}  ${hours}:${minutes}`;
}

// Logout button
function logoutUser() {
  if (confirm("Are you sure you want to log out?")) {
    localStorage.removeItem("LogedInUser");
    window.location.href = 'index.html';
  }
}
