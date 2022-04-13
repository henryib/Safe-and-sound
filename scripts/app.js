/**
 * removes all items from local storage and sends user back to login
 */
function logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("police");
    window.location.replace("https://joaogarrido98.github.io/Safe-and-sound/login.html");
}

//gets police object from local storage
function getPolice() {
    let object = localStorage.getItem("police");
    let police = JSON.parse(object);
    return police;
}

//when window loads check if there's a jwt token 
//if yes stay in normal stack if not goes to auth stack
window.addEventListener("load", () => {
    let jwt = localStorage.getItem("jwt");
    if (jwt === null) {
        window.location.replace("https://joaogarrido98.github.io/Safe-and-sound/login.html");
    }

    //if police is not an admin hide menu for management
    let managementDisplay = document.getElementById("management");
    let police = getPolice();
    if (!police["police_admin"]) {
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

    //on logout click call logout function
    document.getElementById("logout").addEventListener("click", () => {
        logout();
    });
});