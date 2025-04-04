const id = document.querySelector("#id");
const name = document.querySelector("#name");
const mail = document.querySelector("#email");

document.addEventListener("DOMContentLoaded", () => {
    const userData = localStorage.getItem("LogedInUser");
    if(!userData) {
        alert("NotLoggedInSuccessfully");
        window.location.href = "index.html";
        return;
    }
    const user = JSON.parse(userData);
    id.innerHTML = user.userId;
    name.innerHTML = user.userName;
    mail.innerHTML = user.email;
});