// Fetch all the venues
function getAllVenues(jwt) {
    fetch('https://safe-sound-208.herokuapp.com/police/venues', {
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

// Handle post request after fetching all the venues.
// Fill the table with the data fetched.
function handleResponse(data) {
    document.getElementById('loading').style.display = 'none';
    if (data['success']) {
        document.getElementById('venues_table').style.display = block;
        let table_body = document.getElementById('venues_list');
        let allRows = '';
        let objects = data['generic'];
        for (let i = 0; i < objects.length; i++) {
            let venue = objects[i];
            let venue_name = venue['venue_name'];
            let venue_location = venue['venue_city'];
            let venue_active = venue['venue_active'] ? 'Active' : 'Deactivated';
            let button_class_activation = venue['venue_active'] ? 'active' : 'deactivated';
            allRows += `<tr>
        <td class="venue_name">${venue_name}</td>
        <td class="venue_location">${venue_location}</td>
        <td class="venue_active"><button id="${venue["venue_id"]}" onClick="activationHandle(event)" class="${button_class_activation} activation">${venue_active}</button></td>
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

// Activating/Validating a venue?
function activationHandle(evt) {
    let jwt = localStorage.getItem('jwt');
    let venue = evt.target.id;
    let type = null;
    if (evt.target.classList.contains('active')) {
        type = 'deactivate';
    } else {
        type = 'activate';
    }
    fetch(`https://safe-sound-208.herokuapp.com/venues/${type}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`
        },
        body: JSON.stringify({
            venue_id: venue
        })
    })
        .then((response) => response.json())
        .then((data) => handleResponseActivation(data, evt.target))
        .catch(function (error) {
            console.log(error);
        });
}

// Handling response from activating/deactivation of venue
function handleResponseActivation(data, button) {
    if (data['success']) {
        location.reload();
    } else {
        alert(data['message']);
    }
}

// Adding a new venue
function addVenue() {
    let jwt = localStorage.getItem('jwt');
    let venue_name = document.getElementById("venue_name").value;
    let venue_city = document.getElementById("venue_city").value;
    let venue_lat = document.getElementById("venue_lat").value;
    let venue_long = document.getElementById("venue_long").value;

    fetch(`https://safe-sound-208.herokuapp.com/venues/add`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`
        },
        body: JSON.stringify({
            venue_city: venue_city,
            venue_lat: venue_lat,
            venue_long: venue_long,
            venue_name: venue_name
        })
    })
        .then((response) => response.json())
        .then((data) => handleAdd(data))
        .catch(function (error) {
            console.log(error);
        });
}

// Handle the response from adding a venue:
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


// Event listener located in management.js
// Not sure if still need.
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loading').style.display = 'block';
    let jwt = localStorage.getItem('jwt');

    // Call the method to begin:
    getAllVenues(jwt);


    // Modal that appears in management.js 
    // Not sure if still need

    let modal = document.getElementById('myModal');
    document.getElementById('close').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    document.getElementById('add').addEventListener('click', () => {
        modal.style.display = 'block';
    });

    document.getElementById('add_venue').addEventListener('submit', (e) => {
        e.preventDefault();
        addVenue();
    });
});
