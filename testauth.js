import users_json from "./data.json" assert { type: 'json' };

function test_auth(){
    var u_username = document.getElementById("username").value;
    var u_password = document.getElementById("password").value;

    if(u_username == users_json.users[0].name &&
        u_password == users_json.users[0].password){
        window.location.replace("main.html");
        return;
    }

    document.getElementById("password").value = "";
    document.getElementById("invalid").innerHTML = "Invalid credentials.";
}
function logic(){
    document.getElementById("submit-form").addEventListener("click", test_auth);
}
logic();