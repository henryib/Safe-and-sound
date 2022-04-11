const logout = () => {
    localStorage.removeItem("jwt");
    window.location.replace("/login.html");
}

document.addEventListener("DOMContentLoadded", () => {
    document.getElementById("logout").addEventListener("click", () => {
        logout();
    });
});