document.addEventListener('DOMContentLoaded', () => {
    const socket = new WebSocket('wss://safe-sound-208.herokuapp.com/reports/add/police');


    socket.addEventListener('message', function (event) {
        console.log('Message from server ', event);
        console.log('Message from server ', event.data);
        let report = event.data.generic;
        let table_body = document.getElementById("live_table");
        let row = '<tr><td></td></tr>'
    });

});