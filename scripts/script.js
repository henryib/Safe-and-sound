let reports = [];
let i = 0;
let report_id;

//show the details of the report inside the modal
function showDetail(e) {
    let modal = document.getElementById("myModal");
    modal.style.display = "block";
    let id = e.id;
    report_id = reports[id].report_id;
    document.getElementById("id").innerText = `Details for report #${reports[id].report_id}`;
    document.getElementById("detail").innerText = reports[id].report_details;
    document.getElementById("location").innerText = reports[id].report_location[0] + ", " + reports[id].report_location[1];
    document.getElementById("severity").innerText = reports[id].report_severity;
}

//close a report, update resolved to true
function closeReport() {
    let jwt = localStorage.getItem('jwt');
    fetch(`https://safe-sound-208.herokuapp.com/reports/resolve/${report_id}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`
        }
    })
        .then((response) => response.json())
        .then((data) => handleResolve(data))
        .catch(function (error) {
            console.log(error);
        });
}

//handle server response from closing the report
function handleResolve(data) {
    if (data["success"]) {
        document.getElementById("myModal").style.display = "none";
        alert("Report deactivated\n Page will reload in 2 secs");
        setTimeout(() => {
            location.reload();
        }, 1500)
    } else {
        alert(data["message"]);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const socket = new WebSocket('wss://safe-sound-208.herokuapp.com/reports/add/police');

    //when websocket receives a message from the server 
    //add row to table with its info
    socket.addEventListener('message', function (event) {
        let data = JSON.parse(event.data);
        let report = data.generic;
        reports.push(report);
        let date = report.report_date.replace("T", " ");
        let table_body = document.getElementById("live_table");
        let tr = table_body.insertRow(0);
        let row = `<td>${report.report_id}</td><td>${report.report_user}</td><td>${report.report_phone}</td><td>${date}</td><td>${report.report_type}</td><td>${report.report_venue}</td><td><button onclick="showDetail(this)" class="more" id="${i}"><i class='bx bx-detail'></i></button></td>`;
        tr.innerHTML = row;
        i++;
    });

    document.getElementById("report_resolve").addEventListener("click", () => {
        let confirmation = confirm("Are you sure about this?");
        if (confirmation) {
            closeReport();
        }
    });

    document.getElementById("close").addEventListener("click", () => {
        modal.style.display = "none";
    });
});