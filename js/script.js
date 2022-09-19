//Buttons
function addaccountButton() {
    location.href = "/addaccount.html"
}
function monthlycontButton() {
    location.href = "/monthlycont.html"
}
function dashboardButton() {
    location.href = "/dashboard.html"
}
function savehouseButton() {
    location.href = "/savehouse.html"
}

//Redirect click on icon to welcome page
function homeIconClick() {
    location.href = "/welcome.html"
}


function logoutButton() {
    localStorage.removeItem('FirstName');
    localStorage.removeItem('Email');
    location.href = "/index.html"
}


//***NithinnBeatrice - please check. Below code is throwing errors.

//Add name
// function renderUser() {
//     $.getJSON('https://nus-money.herokuapp.com/user', function (data) {
//         // JSON result in `data` variable

//         var FirstName = data['given_name'];

//         $(".userName").html(FirstName);
//     });
// }

// addEventListener("load", renderUser);

