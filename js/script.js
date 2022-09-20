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


function delButton() {
    var Email = localStorage.getItem('Email');
    let postData = {
        //Create JS Object
        "email": Email
      };
      
      let postDataJSON = JSON.stringify(postData); //Convert JS Object to JSON
      console.log(postDataJSON);
      delData(postDataJSON);
    }
    
    function delData(postData) {
      // pass your data in method
      //console.log(postData);
    
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
    
      var requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: postData,
      };
    
      fetch("https://nus-money.herokuapp.com/delete/user/", requestOptions)
        .then((response) => response.text())
        .then((result) =>  location.href = "/index.html");
    
    
}


