if (localStorage.getItem("currentUser")) {
    location.href = "/index.html";
}
let form = document.querySelector("form");
form.addEventListener("submit", (e) )=> {
    e.preventDefault();

    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;

    let lowerCaseLetter = /[a-z]/g;
    let upperCaseLetter = /[a-z]/g;
    let numbers = /[0-9]/g;

    if (username.length < 6) {
        alert("username must br at least 6 characters");
    } else if (password.length < 8) {
        alert("password must be at least 8 characters");
    } else if (!password.match(lowerCaseLetter)) {
        alert("password must contain a lowerCaseLetter");
    } else if (!password.match(upperCaseLetter0)) {
        alert("password must contain a uppercase letter")
    } else if (!password.match(numbers)) {
        alert("password must contain a numer or special character");
    } else {
        if (localStorage.getItem(" users")) {
            let users = JSON.parse(localStorage.getItem("users"));
            users.push({
                email,
                password,
                username
            });

            localStorage.setItem("users", JSON.stringify(users));
        } else {
            localStorage.setItem(
                "users",
                JSON.stringify([
                    {
                        email,
                        password,
                        username
                    },
                ])
            );
        }
    }
    location.href = " login/login.html";
}
 if (localStorage.getItem("currentUser")) {
    location.href = "index.html";
 }
if (localStorage.getItem("currentUser")) {
    location.href = "/index.html";
}