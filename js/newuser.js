var email = document.getElementById('inputEmail');
const pass = document.getElementById("inputPassword");
const firstName = document.getElementById("inputFirstName");
const lastName = document.getElementById("inputLastName");
const b1 = document.getElementById("b1");
const outpanel = document.getElementById("mypanel");    // querySelector(".outpanel")

// var querryStr1 = "https://nus-money.herokuapp.com/new/login"
// var querryStr2 = "https://nus-money.herokuapp.com/new/asset"
// var querryStr3 = "https://nus-money.herokuapp.com/new/user"

// var querryLogin = "https://localhost:3000/new/login"
// var querryAsset = "https://localhost:3000/new/asset"
// var querryUser = "https://localhost:3000/new/user"
// var querryEmail = "https://nus-money.herokuapp.com/user?Email="



// function postToServer(e) {
//   e.preventDefault(); //to prevent form from submitting and refreshing the page
//   async function checkEmail() {
//     querryEmail = querryEmail + email.value;
//     const response = await fetch(querryEmail);
//     const data = await response.json();
//     var emailAddress = JSON.stringify(data.Email);
//     if (emailAddress == email.value) {
//       var text = "<h8>Email is already taken. Try again.</h8>";
//       document.querySelector(".mypanel").innerHTML = text;
//     }
//   };
//   // console.log(emailAddress);
//   let postData = {
//     //Create JS Object
//     email: email.value,
//     password: pass.value,
//     FirstName: firstName.value,
//     LastName: lastName.value
//   };
//   // console.log(postData);
//   let postDataJSON = JSON.stringify(postData); //Convert JS Object to JSON
//   // console.log(postDataJSON);
//   addData(postDataJSON);
//   // console.log(postDataJSON);
// };


// function addData(postDataJSON) {
//   var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");

//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: postDataJSON,
//   };

//   fetch(querryLogin, requestOptions)
//     .then((response) => response.text())
//     // .then((result) => (outpanel.innerHTML = "<h8>" + result.success + "</h8>"))
//     .catch((error) => console.log("error", error));
//   fetch(querryAsset, requestOptions)
//     .then((response) => response.text())
//     // .then((result) => (outpanel.innerHTML = "<h8>" + result.success + "</h8>"))
//     .catch((error) => console.log("error", error));
//   fetch(querryUser, requestOptions)
//     .then((response) => response.text())
//     // .then((result) => (outpanel.innerHTML = "<h8>" + result.success + "</h8>"))
//     .catch((error) => console.log("error", error));
// };


function postToServer(e) {
  e.preventDefault();
  var querryEmail = "https://nus-money.herokuapp.com/user?Email=" + email.value;
  fetch(querryEmail)
    // when we get a response map the body to json
    .then((response) => response.json())
    // and pass the JSON data to mydata for rendering
    .then((data) => loginValidation(data));
};

function loginValidation(data) {
  console.log(data.success);
  if (data.success == false) {
    var text = "<h8>Email is already taken. Try again.</h8>";
    document.querySelector(".mypanel").innerHTML = text;
  } else {
    var querryLogin = "https://localhost:3000/new/login";
    var querryAsset = "https://localhost:3000/new/asset";
    var querryUser = "https://localhost:3000/new/user";

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let postData = {
      email: email.value,
      password: pass.value,
      FirstName: firstName.value,
      LastName: lastName.value
    };
    let postDataJSON = JSON.stringify(postData); //Convert JS Object to JSON

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: postDataJSON
    };

    fetch(querryLogin, requestOptions)
      .then((response) => response.text())
      // .then((result) => (outpanel.innerHTML = "<h8>" + result.success + "</h8>"))
      .catch((error) => console.log("error", error));
    fetch(querryAsset, requestOptions)
      .then((response) => response.text())
      // .then((result) => (outpanel.innerHTML = "<h8>" + result.success + "</h8>"))
      .catch((error) => console.log("error", error));
    fetch(querryUser, requestOptions)
      .then((response) => response.text())
      .then((result) => (outpanel.innerHTML = "<h9>Update Successfull</h9>"))
      .catch((error) => console.log("error", error));
  }
}

b1.addEventListener("click", postToServer);