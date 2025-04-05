const userId = document.querySelector("#userId")
const password = document.querySelector("#password");
const btn = document.querySelector("#btn");
const google = document.querySelector(".Google");

btn.addEventListener("click", async () => {
    const id = userId.value.trim();
    const pass = password.value.trim();

    if(!id || !pass) {
        alert("Please enter your credentials!");
        return;
    }

    const URL = `http://localhost:8080/User/${id}`;
    try {
        const response = await fetch(URL, {
            method : "GET",
            headers : {
                "Content-Type": "application/json"
            }
        });
        if(!response.ok) {
            alert("User Doesn't Exist, Register First OR Internal Server Error");
            return;
        }
        const data = await response.json();
        if(pass == data.password) {
            localStorage.setItem("LogedInUser", JSON.stringify(data));
            window.location.href = "Home.html";
        } else {
            alert("Password Incorrect");
        }
    } catch(error) {
        console.log(error);
        alert("The Server is not running try after some time");
    }
});

google.addEventListener("click", function () {
    alert("Google login feature coming soon!");
});