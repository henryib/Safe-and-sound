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
    document.getElementById('loading').style.display = 'none';
    let jwt = localStorage.getItem("jwt");
    let badge = evt.target.id;
    let type = null;
    if (evt.target.classList.contains("active")) {
        type = "deactivate";
    } else {
        type = "activate";
    }
    fetch(`https://safe-sound-208.herokuapp.com/police/${type}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify({
            police_badge: badge
        })
    })
        .then((response) => response.json())
        .then((data) => handleResponseActivation(data, evt.target))
        .catch(function (error) {
            console.log(error);
        });
}

function handleResponseActivation(data, button) {
    if (data["success"]) {
        location.reload();
    } else {
        alert(data["message"]);
    }
}

function addPolice() {
    let jwt = localStorage.getItem("jwt");
    let badge = document.getElementById("badgenumber").value;
    let password = document.getElementById("password").value;
    let admin = document.getElementById("admin").checked;
    fetch(`https://safe-sound-208.herokuapp.com/police/register`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify({
            police_badge: badge,
            police_password: password,
            police_admin: admin
        })
    })
        .then((response) => response.json())
        .then((data) => handleRegistration(data))
        .catch(function (error) {
            console.log(error);
        });
}

function handleRegistration(data) {
    let success = data["success"];
    let message = data["message"];
    if (success) {
        let modal = document.getElementById("myModal");
        modal.style.display = "none";
        alert(message);
        setTimeout(() => {
            location.reload();
        }, 3000);
    } else {
        alert(message);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loading").style.display = "block";
    let jwt = localStorage.getItem("jwt");
    let currentUser = JSON.parse(localStorage.getItem("police"));
    if (!currentUser["police_admin"]) {
        location.replace("https://joaogarrido98.github.io/Safe-and-sound/index.html");
    }

    getAllPolice(jwt)

    document.getElementById("add_police").addEventListener("submit", (e) => {
        e.preventDefault();
        addPolice();
    });

    document.getElementById("add").addEventListener("click", () => {
        modal.style.display = "block";
    });
});