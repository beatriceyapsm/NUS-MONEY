//Get username from webpage 'local storage' (set via authentication.js)
function catchLocalStorageData() {
    userName.innerHTML = localStorage.getItem('FirstName');
    // console.log(localStorage.getItem('FirstName'));
};

function isLoggedIn() {
    if (!localStorage.getItem('FirstName')) {
        location.href = "/login.html"
    }
};