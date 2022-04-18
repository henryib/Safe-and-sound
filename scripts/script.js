document.addEventListener('DOMContentLoaded', () => {
    const socket = new WebSocket('wss://safe-sound-208.herokuapp.com/reports/add/police');


    socket.addEventListener('message', function (event) {
        let data = JSON.parse(event.data);
        let report = data.generic;
        console.log(report)
        let table_body = document.getElementById("live_table");
        let row = '<tr><td></td></tr>'
    });

});