document.addEventListener('DOMContentLoaded', () => {
    const socket = new WebSocket('wss://safe-sound-208.herokuapp.com/reports/add/police');
    let reports = [];
    let i = 0;

    socket.addEventListener('message', function (event) {
        i++;
        let data = JSON.parse(event.data);
        let report = data.generic;
        reports.push(report);
        let date = report.report_date.replace("T", " ");
        let table_body = document.getElementById("live_table");
        let row = `<tr><td>${report.report_user}</td><td>${report.report_phone}</td><td>${date}</td><td>${report.report_type}</td><td>${report.report_venue}</td><td><button class="more" id="${i}"><i class='bx bx-detail'></i></button></td></tr>`;
        table_body.innerHTML += row;
    });

});