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
        let police_active = police.police_active ? "Active" : "Deactivated";
        let police_admin = police.police_admin ? "Admin" : "Regular";
        let button_class_activation = police.police_active ? "active" : "deactivated";
        let button_class_admin = police.police_admin ? "admin" : "regular";
        let row = `<tr>
        <td class="police_badge">${police.badge}</td>
        <td class="police_admin"><button class="admin ${button_class_admin}">${police_admin}</button></td>
        <td class="police_active"><button class="activation ${button_class_activation}">${police_active}</button></td>
        </tr>`;
        table_body.append(row)
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loading").style.display = "block";
    let jwt = localStorage.getItem("jwt");
    let police = getAllPolice(jwt)
});
