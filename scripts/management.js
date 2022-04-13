function getAllPolice(jwt) {
    fetch('https://safe-sound-208.herokuapp.com/police', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }
    })
        .then((response) => response.json())
        .then((data) => handleResponse(data))
        .catch(function (error) {
            console.log(error);
        });
}

function handleResponse(data) {
    document.getElementById("loading").style.display = "none";
    document.getElementById("police_table").style.display = "block";
    let table_body = document.getElementById("police_list");
    for (police in data) {
        console.log(police)
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loading").style.display = "block";
    let jwt = localStorage.getItem("jwt");
    let police = getAllPolice(jwt)
});
