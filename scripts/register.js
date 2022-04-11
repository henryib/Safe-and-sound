function passwordToggle() {
    var password = document.getElementById('password');
    var passwordRepeat = document.getElementById('password-repeat');
    if (password.type === "password") {
        password.type = "text";
        passwordRepeat.type = "text"
    } else {
        password.type = "password";
        passwordRepeat.type = "password";
    }
}

function checkPassword() {
    passwordRepeat.setCustomValidity(password.value != passwordRepeat.value ? "Passwords must be matching" : '');
}

document.addEventListener('DOMContentLoaded', () => {
    passwordToggle();

});
