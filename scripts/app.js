let jwt = localStorage.getItem("jwt");
console.log(jwt)
if (jwt === null) {
    window.location.replace("/login.html");
}

function logout() {
    localStorage.removeItem("jwt");
    window.location.replace("/login.html");
}

document.addEventListener("DOMContentLoaded", () => {
    const body = document.querySelector('body'),
        sidebar = body.querySelector('nav'),
        toggle = body.querySelector(".toggle"),
        modeSwitch = body.querySelector(".toggle-switch"),
        modeText = body.querySelector(".mode-text");


    toggle.addEventListener("click", () => {
        sidebar.classList.toggle("close");
    })


    modeSwitch.addEventListener("click", () => {
        body.classList.toggle("dark");

        if (body.classList.contains("dark")) {
            modeText.innerText = "Light mode";
        } else {
            modeText.innerText = "Dark mode";

        }
    });
    document.getElementById("logout").addEventListener("click", () => {
        logout();
    });
});