const email = document.getElementById('inputEmail');
const pass = document.getElementById("inputPassword");
const firstName = document.getElementById("inputFirstName");
const lastName = document.getElementById("inputLastName");
const b1 = document.getElementById("b1");

function postToServer(e) {
  e.preventDefault();
  var querryStr = "https://nus-money.herokuapp.com/login?email=" + email.value;

  fetch(querryStr)
    // when we get a response map the body to json
    .then((response) => response.json())
    // and pass the JSON data to mydata for rendering
    .then((data) => loginValidation(data));
}

function loginValidation(data) {
  console.log(data.success);
  if ((email.value == "") || (pass.value == "") || (firstName.value == "") || (lastName.value == "")) {
    var text1 = "<h8>Fields cannot be empty</h8>";
    document.querySelector(".mypanel").innerHTML = text1;
  } else if (data.success == true) {
    var text = "<h8>Email ID is already taken. Try again.</h8>";
    document.querySelector(".mypanel").innerHTML = text;
  }
  else {
    var querryLogin = "https://nus-money.herokuapp.com/new/login";
    var querryAsset = "https://nus-money.herokuapp.com/new/asset";
    var querryUser = "https://nus-money.herokuapp.com/new/user";

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
      .catch((error) => console.log("error", error));
    fetch(querryAsset, requestOptions)
      .then((response) => response.text())
      .catch((error) => console.log("error", error));
    fetch(querryUser, requestOptions)
      .then((response) => response.text())
      .catch((error) => console.log("error", error));
    var successText = "<h9>Account Creation Successful. <a href='login.html'>Proceed to login.</a></h9>"
    document.querySelector(".mypanel").innerHTML = successText;
  }
}


b1.addEventListener("click", postToServer);