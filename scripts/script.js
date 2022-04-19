let reports = [];
let i = 0;

function showDetail(e) {
    let modal = document.getElementById("myModal");
    modal.style.display = "block";

    let id = e.id;
    console.log(id)
    console.log(reports[id])
    document.getElementById("id").innerText = `Details for report #${reports[id].report_id}`;
    document.getElementById("detail").innerText = reports[id].report_details;
    document.getElementById("location").innerText = reports[id].report_location[0] + ", " + reports[id].report_location[1];
    document.getElementById("severity").innerText = reports[id].report_severity;
}

function closeReport() {

}

document.addEventListener('DOMContentLoaded', () => {
    const socket = new WebSocket('wss://safe-sound-208.herokuapp.com/reports/add/police');

    socket.addEventListener('message', function (event) {
        let data = JSON.parse(event.data);
        let report = data.generic;
        reports.push(report);
        let date = report.report_date.replace("T", " ");
        let table_body = document.getElementById("live_table");
        let table_index = document.getElementById("table_index");
        let tr = table_index.insertRow(1);
        let row = `<td>${report.report_id}</td><td>${report.report_user}</td><td>${report.report_phone}</td><td>${date}</td><td>${report.report_type}</td><td>${report.report_venue}</td><td><button onclick="showDetail(this)" class="more" id="${i}"><i class='bx bx-detail'></i></button></td>`;
        tr.innerHTML = row;
        i++;
    });
});