document.addEventListener('DOMContentLoaded', () => {
    function passwordToggle() {
        var password = document.getElementById("password");
        if (password.type === "password") {
            password.type = "text";
        } else {
            password.type = "password";
        }
    }
    
    function login() {
        fetch('https://safe-sound-208.herokuapp.com/police/login', { 
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                police_password: document.getElementById("password").value,
                police_badge: document.getElementById("badgenumber").value
            })
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch(function (error) {
                console.log(error);
            });
    };

    document.getElementById("form").addEventListener("submit", (e) => {
        e.preventDefault();
        
    })
})