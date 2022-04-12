function logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("police");
    window.location.replace("https://joaogarrido98.github.io/Safe-and-sound/login.html");
}

function getPolice() {
    let object = localStorage.getItem("police");
    let police = JSON.parse(object);
    return police;
}

window.addEventListener("load", () => {
    let jwt = localStorage.getItem("jwt");
    if (jwt === null) {
        window.location.replace("https://joaogarrido98.github.io/Safe-and-sound/login.html");
    }

    let managementDisplay = document.getElementById("management");
    let police = getPolice();
    if (!police["admin"]) {
        managementDisplay.style.display = "none";
    }
});

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