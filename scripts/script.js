document.addEventListener('DOMContentLoaded', () => {
    const socket = new WebSocket('wss://safe-sound-208.herokuapp.com/reports/add/police');

    socket.addEventListener('message', function (event) {
        console.log('Message from server ', event.data);
    });

});