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
});

// Logout button
function logoutUser() {
  if (confirm("Are you sure you want to log out?")) {
    localStorage.removeItem("currentUser"); // Clear user data from localStorage on logout
    alert("Logged out successfully.");
    window.location.href = 'login.html'; // Redirect to login page
  }
}
