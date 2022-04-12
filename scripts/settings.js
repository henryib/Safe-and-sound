function passwordToggle() {
    var password = document.getElementById('password');
    var newPassword = document.getElementById('new-password');
    if (password.type === "password") {
        password.type = "text";
        newPassword.type = "text"
    } else {
        password.type = "password";
        newPassword.type = "password";
    }
}

function validateForm(password, newPassword) {
    let valid = true;
    if (password !== newPassword) {
        valid = false;
    }
    return (valid);
}

function handleChangeRequest(password, newPassword, jwt) {
    let valid = validateForm(password, newPassword);
    if (valid) {
        changePassword(password, jwt)
    } else {
        let responseDisplay = document.getElementById("response");
        responseDisplay.style.display = "block";
        responseDisplay.innerHTML = "Passwords do not match";
        document.getElementById("loading").style.display = "none";
        document.getElementById("change_btn").style.display = "block";
    }
};

function changePassword(password, jwt) {
    fetch('https://safe-sound-208.herokuapp.com/police/password', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify({
            police_password: password
        })
    })
        .then((response) => response.json())
        .then((data) => handleResponse(data))
        .catch(function (error) {
            console.log(error);
        });
}

function handleResponse(data) {
    let success = data["success"];
    let message = data["message"];
    let responseDisplay = document.getElementById("response");
    responseDisplay.style.display = "block";
    responseDisplay.innerHTML = message;
    let borderColor = "#1cac78";
    let bgColor = "#d0f8e9";
    if (!success) {
        borderColor = "#bf314a";
        backgroundColor = "#F7DFE3";
    }
    responseDisplay.style.borderBlockColor = borderColor;
    responseDisplay.style.backgroundColor = bgColor;
    document.getElementById("loading").style.display = "none";
    document.getElementById("change_btn").style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
    let jwt = localStorage.getItem("jwt");
    document.getElementById("change-pass").addEventListener("submit", (e) => {
        e.preventDefault();
        document.getElementById("loading").style.display = "block";
        document.getElementById("change_btn").style.display = "none";
        let password = document.getElementById("password").value;
        let newPassword = document.getElementById("new-password").value;
        handleChangeRequest(password, newPassword, jwt);
    })
});