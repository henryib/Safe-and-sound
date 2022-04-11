//if jwt token exists means you're logged in
//go to main page
let jwt = localStorage.getItem("jwt");
if (jwt !== null) {
    location.replace("/index.html")
}

//changes the visibility of the password on the input
function passwordToggle() {
    var password = document.getElementById("password");
    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}

//makes a post request to the api and tries to login
function login(badge, password) {
    fetch('https://safe-sound-208.herokuapp.com/police/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            police_password: password,
            police_badge: badge
        })
    })
        .then((response) => response.json())
        .then((data) => handleResponse(data))
        .catch(function (error) {
            console.log(error);
        });
};

//handles the response from the server
//either displays error or goes to main page
function handleResponse(data) {
    let response = data["success"];
    let message = data["message"];
    if (response) {
        localStorage.setItem("jwt", message);
        location.replace("/index.html");
    } else {
        let responseDisplay = document.getElementById("response");
        responseDisplay.style.display = "block";
        responseDisplay.innerHTML = message;
    }
    setTimeout(() => {
        response.style.display = "none";
    }, 4000)
}

document.addEventListener('DOMContentLoaded', () => {
    passwordToggle();

    //submit event for the form
    document.getElementById("form").addEventListener("submit", (e) => {
        e.preventDefault();
        let badge = document.getElementById("badgenumber").value;
        let password = document.getElementById("password").value;
        login(badge, password);
    })
})