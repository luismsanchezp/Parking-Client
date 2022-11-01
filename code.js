/* Here comes the Javascript code */

// Update the REST API server's URL
const url = "http://127.0.0.1:8000/api/v1/";

// List of records loaded from API REST
var records = [];

// Login modal dialog
const loginDialog = new bootstrap.Modal('#login-dialog', {
    focus: true
});

/**
 * Execute as soon as the page is completely loaded.
 */

window.onload = function () {
    // Set the listeners for the page's buttons

    const bLogin = document.getElementById("bLogin");
    const bLoginAccept = document.getElementById("blogin-accept");
    const bLoadParkingLots = document.getElementById("bLoadParkingLots");
    const bLoadParkingSpot = document.getElementById("bLoadParkingSpot");
    const bShowVehicles = document.getElementById("bShowVehicles");
    const bAdd = document.getElementById("bAdd");
    const bClear = document.getElementById("bClear");
    const bShowVehicleTicket = document.getElementById("bShowVehicleTicket");
    const bUnpark = document.getElementById("bUnpark");

    bLogin.addEventListener("click", handleLogin);
    bLoginAccept.addEventListener("click", handleLogin);
    bLoadParkingLots.addEventListener("click", loadParkingLotsList);
    bLoadParkingSpot.addEventListener("click", );
    bShowVehicles.addEventListener("click", );
    bAdd.addEventListener("click", );
    bClear.addEventListener("click", clearForm);
    bShowVehicleTicket.addEventListener("click", );
    bUnpark.addEventListener("click", );
};

/**
 * Clear the fields of the product's form.
 */

function clearForm() {
    // Here comes the code ...
}

/**
 * Handle the login/logout magic: 
 * 
 *  - Show the login dialog
 *  - Call the login procedure
 *  - Call the logout procedure
 * 
 * @param {*} event 
 */

function handleLogin(event) {
    var flag = event.target.innerText;

    if (flag == "Login") {  // Show the login dialog
        loginDialog.show();
    } else if (flag == "Accept") {  // Login the user (get new token)
        login();
        document.getElementById("bLogin").innerText = "Logout";
        loginDialog.hide();
    } else if (flag == "Logout") {  // Logout the user (release token)
        logout();
        document.getElementById("bLogin").innerText = "Login";
    } else {    // Error, the flag has unknown value
        alert("ERROR: flag type unknown: " + flag);
    }
}

/**
 * Login the user.
 */

async function login() {
    var emailValue = document.getElementById("login_email").value;
    var passwordValue = document.getElementById("login_password").value;

    const params = {
        email : emailValue,
        password : passwordValue
    };

    const response = await fetch(url + "login", {
        method : "POST",
        headers : {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        },
        body : JSON.stringify(params)
    });

    const answer = await response.json();
    if (response.status == 200)
    {
        var token = answer.token;
        localStorage.setItem('token', token);
        console.log("ok");
    }
    else
    {
        alert("Error logging : " + response.statusText);
    }
}

/**
 * Logout the user.
 */

async function logout() {
    const response = await fetch(url + "logout", {
        method : "POST",
        headers : {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            'Authorization' : 'Bearer' + localStorage.getItem('token')
        },

    });

    if(response.status == 200)
    {
        localStorage.removeItem('token');
        console.log("Ok");
    }
    else
    {
        alert("Error logging out: " + response.statusText);
    }
}

async function loadParkingLotsList() {

    const response = await fetch(url + "parkinglots", {
        method : "GET",
        headers : {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            'Authorization' : 'Bearer' + localStorage.getItem('token')
        }
    })

    var selectBody = document.getElementById("current_parkinglots")
    records = response.data;
    selectBody.innerHTML = "";

    records.forEach(function (item, index) {
        var opt = item.name;
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        selectBody.appendChild(el);
    })
}

/**
 * Create a new product.
 */

async function addRecord() {
    // Here comes the code ...
}

/**
 * Load the list of products.
 */

async function reloadList() {
    // Here comes the code ...
}

/**
 * Load the data of a product.
 * 
 * @param {*} id 
 */

function loadListItem(id) {
    // Here comes the code ...
}

/**
 * Delete a product.
 */

async function deleteRecord() {
    // Here comes the code ...
}