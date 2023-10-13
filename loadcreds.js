import users_json from "./data.json" assert { type: 'json' };

function get_cred_element(x, use_first_div = true){
    var cred_element = "";
    if(use_first_div){cred_element += `<div class="credential" id="${x}">`;}
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
const confirm_edit = function(){
    var id = Number([...this.id][0]);
    var element = document.getElementById(id);
    document.getElementById(`${id}cancel-edit`).removeEventListener("click", cancel_edit);
    document.getElementById(`${id}confirm-edit`).removeEventListener("click", confirm_edit);
    element.innerHTML = get_cred_element(id, false);
}
const cancel_edit = function(){
    var id = Number([...this.id][0]);
    
}
const edit = function(){
    var id = Number(this.id);
    if(typeof id != "number") { return; }
    var newHtml = "";
    // change this later
    // remove event listener (for now)
    if(confirm("Edit this element?")){
        document.getElementById(this.id).removeEventListener("click", edit);
    } else { return; }
    newHtml += `<span id='cred-id'>${users_json.users[this.id].id}</span>`;
    newHtml += '<div class="edit-credential">';
    newHtml += '<div id="left">';
    newHtml += '<span>Username</span>';
    newHtml += '<span>Email</span>';
    newHtml += '<span>Password</span>';
    newHtml += '</div>';
    newHtml += '<div id="right">';
    newHtml += `<input class="edit-input" value="${users_json.users[this.id].name}">`;
    newHtml += `<input class="edit-input" value="${users_json.users[this.id].email}">`;
    newHtml += `<input class="edit-input" value="${users_json.users[this.id].password}">`;
    newHtml += "</div>";
    newHtml += "</div>";
    newHtml += `<div class="confirm-edit"> `;
    newHtml += `<button id="${this.id}confirm-edit" class="edit-button">Confirm</button>`;
    newHtml += `<button id="${this.id}cancel-edit" class="edit-button">Cancel</button></div>`;
    this.innerHTML = newHtml;
    document.getElementById(`${this.id}cancel-edit`).addEventListener("click", cancel_edit);
    document.getElementById(`${this.id}confirm-edit`).addEventListener("click", confirm_edit);
}
function enable_edit(){
    var cred_list = document.getElementsByClassName("credential");
    for(var x = 0; x < cred_list.length; x++){
        cred_list[x].addEventListener("click", edit);
    }
}
function logic(){
    document.getElementById("search").addEventListener("click", search);
    document.getElementById("clear").addEventListener("click", clear);
    enable_edit();
}
list_all_creds();
logic();
export { list_all_creds };