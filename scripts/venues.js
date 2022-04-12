function activateButton(button) {
    if (button.innerHTML === "Deactivate") {
        button.innerHTML = "Activate";
        button.style.backgroundColor = "green";
    } else {
        button.innerHTML = "Deactivate";
        button.style.backgroundColor = "red";
    }
}