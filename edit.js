import users_json from "./data.json" assert { type: 'json' };

function edit() {alert("works");}
function listen(){
    document.getElementById("edit").addEventListener("click", edit());
}