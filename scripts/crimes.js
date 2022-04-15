// Fetch all the crimes
function getAllCrimes(jwt) {
    fetch('https://safe-sound-208.herokuapp.com/police/crimes', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`
        }
    })
        .then((response) => response.json())
        .then((data) => handleResponse(data, jwt))
        .catch(function (error) {
            console.log(error);
        });
}

// Handle post request after fetching all the crimes.
// Fill the table with the data fetched.
function handleResponse(data) {
    document.getElementById('loading').style.display = 'none';
    if (data['success']) {
        document.getElementById('crimes_table').style.display = 'block';
        let table_body = document.getElementById('crimes_list');
        let allRows = '';
        let objects = data['generic'];
        for (let i = 0; i < objects.length; i++) {
            let crime = objects[i];
            let crime_name = crime['crime_name'];
            let crime_description = crime['crime_description'];
            let crime_active = crime['crime_active'] ? 'Active' : 'Deactivated';
            let button_class_activation = crime['crime_active'] ? 'active' : 'deactivated';
            allRows += `<tr>
        <td class="crime_name">${crime_name}</td>
        <td class="crime_description">${crime_description}</td>
        <td class="crime_active"><button id="${crime["crime_id"]}" onClick="activationHandle(event)" class="${button_class_activation} activation">${crime_active}</button></td>
        </tr>`;
        }
        table_body.innerHTML = allRows;
    } else {
        let response = document.getElementById('response');
        response.style.display = 'block';
        response.innerHTML =
            data['message'] + '<br><br>' + 'Page will reload in 10 seconds';
        setTimeout(() => {
            location.reload();
        }, 10000);
    }
}

// Activating/Validating a crime
function activationHandle(evt) {
    document.getElementById('loading').style.display = 'none';
    let jwt = localStorage.getItem('jwt');
    let crime = evt.target.id;
    let type = null;
    if (evt.target.classList.contains('active')) {
        type = 'deactivate';
    } else {
        type = 'activate';
    }
    fetch(`https://safe-sound-208.herokuapp.com/crimes/${type}/${crime}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`
        }
    })
        .then((response) => response.json())
        .then((data) => handleResponseActivation(data))
        .catch(function (error) {
            console.log(error);
        });
}

// Handling response from activating/deactivation of crime
function handleResponseActivation(data) {
    if (data['success']) {
        location.reload();
    } else {
        alert(data['message']);
    }
}

// Adding a new crime
function addCrime() {
    let jwt = localStorage.getItem('jwt');
    let crime_name = document.getElementById("crime_name").value;
    let crime_description = document.getElementById("crime_description").value;
    let crime_severity = document.getElementById("crime_severity").value;

    fetch(`https://safe-sound-208.herokuapp.com/crimes/add`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`
        },
        body: JSON.stringify({
            crime_name: crime_name,
            crime_description: crime_description,
            crime_severity: crime_severity
        })
    })
        .then((response) => response.json())
        .then((data) => handleAdd(data))
        .catch(function (error) {
            console.log(error);
        });
}

// Handle the response from adding a crime:
function handleAdd(data) {
    let success = data['success'];
    let message = data['message'];
    if (success) {
        let modal = document.getElementById('myModal');
        modal.style.display = 'none';
        alert(message);
        setTimeout(() => {
            location.reload();
        }, 3000);
    } else {
        alert(message);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loading').style.display = 'block';
    let jwt = localStorage.getItem('jwt');

    getAllCrimes(jwt);

    let modal = document.getElementById('myModal');
    document.getElementById('close').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    document.getElementById('add').addEventListener('click', () => {
        modal.style.display = 'block';
    });

    document.getElementById('add_crimes').addEventListener('submit', (e) => {
        e.preventDefault();
        addCrime();
    });
});
