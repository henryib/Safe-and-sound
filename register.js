var badgeNumber = document.getElementById('badgenumber');
var badgeNumberRepeat = document.getElementById('badgenumber-repeat');
var password = document.getElementById('password');
var passwordRepeat = document.getElementById('password-repeat');

function passwordToggle() {
    if (password.type === "password") {
        password.type = "text";
        passwordRepeat.type = "text"
    } else {
        password.type = "password";
        passwordRepeat.type = "password";
    }
}

function checkBadgeNumber() {
    badgeNumberRepeat.setCustomValidity( badgeNumber.value != badgeNumberRepeat.value ? "Badge numbers must be matching" : '');
}

function checkPassword() {
    passwordRepeat.setCustomValidity( password.value != passwordRepeat.value ? "Passwords must be matching" : '');
}