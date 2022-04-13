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
        .then((data) => handleResponse(data, jwt))
        .catch(function (error) {
            console.log(error);
        });
}

function handleResponse(data) {
    document.getElementById("loading").style.display = "none";
    if (data["success"]) {
        document.getElementById("police_table").style.display = "block";
        let table_body = document.getElementById("police_list");
        let allRows = "";
        let objects = data["generic"];
        for (let i = 0; i < objects.length; i++) {
            let police = objects[i];
            let police_active = police["police_active"] ? "Active" : "Deactivated";
            let police_admin = police["police_admin"] ? "Admin" : "Regular";
            let button_class_activation = police["police_active"] ? "active" : "deactivated";
            let button_class_admin = police["police_admin"] ? "isAdmin" : "isRegular";
            allRows += `<tr>
        <td class="police_badge">${police["police_badge"]}</td>
        <td class="police_admin"><button class="${button_class_admin}">${police_admin}</button></td>
        <td class="police_active"><button id="${police["police_badge"]}" onClick="activationHandle(event)" class="${button_class_activation} activation">${police_active}</button></td>
        </tr>`;
        }
        table_body.innerHTML = allRows;
    } else {
        let response = document.getElementById("response");
        response.style.display = "block";
        response.innerHTML = data["message"] + "<br><br>" + "Page will reload in 10 seconds";
        setTimeout(() => {
            location.reload();
        }, 10000)
    }
}

function activationHandle(evt) {
    let jwt = localStorage.getItem("jwt");
    if (evt.target.classList.contains("active")) {
        let badge = evt.target.id;
        fetch(`https://safe-sound-208.herokuapp.com/police/deactivate/${badge}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        })
            .then((response) => response.json())
            .then((data) => handleResponseDeactivation(data, evt.target))
            .catch(function (error) {
                console.log(error);
            });
    } else {
        alert("Already Deactivated");
    }
}

function handleResponseDeactivation(data, button) {
    console.log(data)
    console.log(button)
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loading").style.display = "block";
    let jwt = localStorage.getItem("jwt");
    let currentUser = JSON.parse(localStorage.getItem("police"));
    if (!currentUser["police_admin"]) {
        location.replace("https://joaogarrido98.github.io/Safe-and-sound/index.html");
    }

    getAllPolice(jwt)

});
