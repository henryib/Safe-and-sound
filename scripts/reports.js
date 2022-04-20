let reports = [];
let index = 0;
let report_id;


//get all reports from the server that are still to be resolved
function getReports(jwt) {
    fetch('https://safe-sound-208.herokuapp.com/reports/unresolved', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`
        }
    })
        .then((response) => response.json())
        .then((data) => handleGetReports(data))
        .catch(function (error) {
            console.log(error);
        });
}

function handleGetReports(data) {
    document.getElementById('loading').style.display = 'none';
    if (data['success']) {
        document.getElementById('table_reports').style.display = 'block';
        let table_body = document.getElementById("reports_table");
        let allRows = '';
        let data_report = data.generic;
        for (let i = 0; i < data_report.length; i++) {
            let report = data_report[i];
            reports.push(report);
            let date = report.report_date.replace("T", " ");
            allRows += `<tr><td>${report.report_id}</td><td>${report.report_user}</td><td>${report.report_phone}</td><td>${date}</td><td>${report.report_type}</td><td>${report.report_venue}</td><td><button onclick="showDetail(this)" class="more" id="${i}"><i class='bx bx-detail'></i></button></td></tr>`
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

//show details of a report on the modal
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

//close a report by updating the status of resolved to true
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

//handle server response from closing a report
function handleResolve(data) {
    if (data["success"]) {
        document.getElementById("myModal").style.display = "none";
        alert("Report deactivated");
        setTimeout(() => {
            location.reload();
        }, 2000)
    } else {
        alert(data["message"]);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let jwt = localStorage.getItem('jwt');

    getReports(jwt);

    document.getElementById("report_resolve").addEventListener("click", () => {
        let confirmation = confirm("Are you sure about this?");
        if (confirmation) {
            closeReport();
        }
    });

    //on button close click hide modal
    let modal = document.getElementById("myModal");

    document.getElementById("close").addEventListener("click", () => {
        modal.style.display = "none";
    });
});