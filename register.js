const userName = document.querySelector("#name");
const no = document.querySelector("#number");
const email = document.querySelector("#email");
const pass = document.querySelector("#password");
const confirmPass = document.querySelector("#confirm");
const btn = document.querySelector("#btn");

btn.addEventListener("click", async () => {
    const name = userName.value.trim();
    const number = no.value.trim();
    const Email = email.value.trim();
    const password = pass.value.trim();
    const confirm = confirmPass.value.trim();

    if(!name || !number || !Email || !password || !confirm) {
        alert("Enter valid Credentials");
        return;
    }
    if(password != confirm) {
        alert("Password not matching");
        return;
    }

    const obj = {
        userName: name,
        password: password,
        contact: number,
        email: Email
    }

    const URL = "https://ecommerce-springboot-c4eo.onrender.com/User/";
    const response = await fetch(URL, {
        method : "POST",
        headers : {
            "Content-Type": "application/json"
        },
        body : JSON.stringify(obj)
    });

    if(response.status === 409) {
        alert("The user with phone number or Email already Exists");
        return;
    }

    if(!response.ok) {
        alert("Internal server error unable to Register");
        return;
    }

    const data = await response.json();
    console.log(data);
    const id = data.userId;
    alert(`User Registered SuccessFully with userId : ${id}`);
})