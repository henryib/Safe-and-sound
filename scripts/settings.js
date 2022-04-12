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
    }
};

function changePassword(password, jwt) {
    console.log(jwt)
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
        .then((data) => console.log(data))
        .catch(function (error) {
            console.log(error);
        });
}

function handleResponse(data) {

}

document.addEventListener("DOMContentLoaded", () => {
    let jwt = localStorage.getItem("jwt");
    document.getElementById("change-pass").addEventListener("submit", (e) => {
        e.preventDefault();
        let password = document.getElementById("password").value;
        let newPassword = document.getElementById("new-password").value;
        handleChangeRequest(password, newPassword, jwt);
    })
});