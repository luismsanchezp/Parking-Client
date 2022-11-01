/* Here comes the Javascript code */

// Update the REST API server's URL
const url = "http://192.168.1.69:8000/api/v1/";

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
    const bAdd = document.getElementById("bAdd");
    const bClear = document.getElementById("bClear");
    const bDelete = document.getElementById("bDelete");
    const bReload = document.getElementById("bReload");

    bLogin.addEventListener("click", handleLogin);
    bLoginAccept.addEventListener("click", handleLogin);
    bAdd.addEventListener("click", addRecord);
    bClear.addEventListener("click", clearForm);
    bDelete.addEventListener("click", deleteRecord);
    bReload.addEventListener("click", reloadList);
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
    // Here comes the code ...
}

/**
 * Logout the user.
 */

async function logout() {
    // Here comes the code ...
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