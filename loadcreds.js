import users_json from "./data.json" assert { type: 'json' };

function get_cred_element(x){
    var cred_element = "";
    cred_element += '<div id="credential">';
    cred_element += `<span id="cred-id">${users_json.users[x].id}</span>`;
    cred_element += `<span>Username: ${users_json.users[x].name}</span>`;
    cred_element += `<span>Email: ${users_json.users[x].email}</span>`;
    cred_element += `<span>Password: ${users_json.users[x].password}</span>`;
    cred_element += "</div>";
    return cred_element;
}

function list_all_creds(){
    var credlist = document.getElementById("credential-list");
    credlist.innerHTML = "";
    for(var x = 0; x < users_json.users.length; x++){
        var cred_element = get_cred_element(x);
        credlist.innerHTML += cred_element;
    }
}
function clear(){
    document.getElementById("search-results").innerHTML = "";
}
function search(){
    var searchresult = document.getElementById("search-results");
    searchresult.innerHTML = "";
    var searchdata = document.getElementById("search-data").value;
    if(searchdata == "") { searchresult.innerHTML = "<p id='invalid'>Search cannot be empty.</p>"; return; }
    // Search based on object id
    for(var x = 0; x < users_json.users.length; x++){
        if(users_json.users[x].id.toLowerCase().includes(searchdata.toLowerCase())){
            searchresult.innerHTML += get_cred_element(x);
        }
    }
    if(searchresult.innerHTML == "") {
        searchresult.innerHTML = "<p id='invalid'>No results.</p>"
    }
    document.getElementById("search-data").value = "";
}
function logic(){
    document.getElementById("search").addEventListener("click", search);
    document.getElementById("clear").addEventListener("click", clear);
}
list_all_creds();
logic();
export { list_all_creds };