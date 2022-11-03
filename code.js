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
    bLoadParkingLots.addEventListener("click", fillParkingLotsList);

    bLoadParkingSpot.addEventListener("click", fillParkingSpotsList);

    bShowVehicles.addEventListener("click", fillCustomerInfoTable);
    /*
    bAdd.addEventListener("click", );

     */
    bClear.addEventListener("click", clearForm);
    /*
    bShowVehicleTicket.addEventListener("click", );
    bUnpark.addEventListener("click", );

     */
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
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
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

async function getUserId() {
    const response = await fetch(url + "token", {
        method : "GET",
        headers : {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }
    })
        .then((response) => response.json())
        .then((data) => data.data)
    records = await response;
    if (records == undefined) {
        throw new Error('User is not logged in');
    } else {
        return records.id;
    }
}

async function getApiParkingLots() {
    try {
        var user_id = await getUserId();
    } catch (err) {
        alert("User is not logged in.");
        return null;
    }

    const response = await fetch(url + "users/"+user_id+"/parkinglots", {
        method : "GET",
        headers : {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => data.data)
    return response;
}

async function clearParkingLotsList() {
    var selectBody = document.getElementById("current_parkinglots")
    selectBody.innerHTML = "";
    var option = document.createElement("option");
    option.textContent = "Choose a parking lot";
    option.value = "None";
    selectBody.appendChild(option);
}

async function fillParkingLotsList() {
    await clearParkingLotsList();
    records = await getApiParkingLots();
    if (records != null) {
        var selectBody = document.getElementById("current_parkinglots");
        records.forEach(function (item, index) {
            var opt = item.name;
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            selectBody.appendChild(el);
        })
    }
}

async function getParkingLotId() {
    const listParkingLots = document.getElementById("current_parkinglots");
    const current_value = listParkingLots.options[listParkingLots.selectedIndex].value;
    if (current_value != "None"){
        const response = await fetch(url + "parkinglots?name=" + current_value, {
            method : "GET",
            headers : {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => data.data)
        records = await response;
        return records[0].id;
    } else {
        alert("Choose a Parking Lot first");
        return null;
    }

}

async function getFreeParkingSpots(parking_lot_id) {
    const response = await fetch(url + "parkinglots/"
        + parking_lot_id + "/parkingspots?free_spots=TRUE", {
        method : "GET",
        headers : {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }
    })
        .then((response) => response.json())
        .then((data) => data.data)
    records = await response;
    return records;
}

async function clearParkingSpotsList() {
    var selectBody = document.getElementById("parkingspots")
    selectBody.innerHTML = "";
    var option = document.createElement("option");
    option.textContent = "Choose a parking spot";
    option.value = "None";
    selectBody.appendChild(option);
}

async function fillParkingSpotsList() {
    await clearParkingSpotsList();
    var current_parking_lot_id = await getParkingLotId();
    if (current_parking_lot_id != null) {
        const parking_spots = await getFreeParkingSpots(current_parking_lot_id);
        if (parking_spots != undefined) {
            var selectBody = document.getElementById("parkingspots");

            parking_spots.forEach(function (item, index) {
                var opt = "("+item.row+", "+item.column+")";
                var el = document.createElement("option");
                el.textContent = opt;
                el.value = opt;
                selectBody.appendChild(el);
            })
        }
    }
}

async function getCustomerInfo() {
    const listParkingLots = document.getElementById("current_parkinglots");
    const current_value = listParkingLots.options[listParkingLots.selectedIndex].value;

    if (current_value != "None"){
        var current_parking_lot_id = await getParkingLotId();
        if (current_parking_lot_id != null) {
            const cus_gov_id = document.getElementById("gov_id").value;

            if (cus_gov_id !=  "") {
                if (!isNaN(cus_gov_id)) {
                    const response = await fetch(url + "parkinglots/"
                        + current_parking_lot_id + "/persons?govid="+cus_gov_id, {
                        method : "GET",
                        headers : {
                            'Content-Type' : 'application/json',
                            'Accept' : 'application/json',
                            'Authorization' : 'Bearer ' + localStorage.getItem('token')
                        }
                    })
                        .then((response) => response.json())
                        .then((data) => data.data)
                    records = await response;
                    if (records != "Customer not found."){
                        return records;
                    } else {
                        alert("Cannot find customer");
                        return null;
                    }

                } else {
                    alert("Customer ID is not a number");
                    return null;
                }
            } else {
                alert("Customer ID is empty");
                return null;
            }
        }
    } else {
        alert("Choose a Parking Lot first");
        return null;
    }
}

async function clearCustomerInfoTable() {
    var tableBody = document.getElementById("customer_info");
    tableBody.innerHTML = "";
    var newRow = tableBody.insertRow(tableBody.rows.length);

    var idCell = newRow.createElement('th');
    var rowCell = newRow.createElement('th');
    var columnCell = newRow.createElement('th');

    idCell.innerHTML = "Gov ID";
    idCell.scope = 'col';
    rowCell.innerHTML = "Name";
    rowCell.scope = 'col';
    columnCell.innerHTML = "Surname";
    columnCell.scope = 'col';
}

async function fillCustomerInfoTable() {
    await clearCustomerInfoTable();
    const customer = await getCustomerInfo();
    console.log("fuck me ", customer);
    if (customer != null) {
        var tableBody = document.getElementById("customer_info");
        var newRow = tableBody.insertRow(tableBody.rows.length);

        var idCell = newRow.insertCell(0);
        var rowCell = newRow.insertCell(1);
        var columnCell = newRow.insertCell(2);

        idCell.innerHTML = customer.gov_id;
        rowCell.innerHTML = customer.name;
        columnCell.innerHTML = customer.surname;
    }
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