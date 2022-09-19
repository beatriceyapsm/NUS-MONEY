const uid = document.getElementById('inputEmail');
const pass = document.getElementById('inputPassword');
const b1 = document.getElementById('b1');

/* Query the API for LOGIN Details  */

function getFromServer(e) {
  e.preventDefault();
  var querryStr = "https://nus-money.herokuapp.com/login?email=" + uid.value + "&password=" + pass.value;
  var querryStr2 = "https://nus-money.herokuapp.com/user?Email=" + uid.value;
  // console.log(querryStr);
  //USING FETCH instead of Jquery
  fetch(querryStr2)
  // when we get a response map the body to json
  .then((response) => response.json())
  // and pass the JSON data to mydata for rendering
  .then((data2) => localStorage.setItem('FirstName',JSON.parse(JSON.stringify(data2[0])).FirstName));
  
  fetch(querryStr)
    // when we get a response map the body to json
    .then((response) => response.json())
    // and pass the JSON data to mydata for rendering
    .then((data) => loginValidation(data));


}

function loginValidation(data) {
  console.log(data.success);
  if (data.success == true) {
    //Storing data to local storage for the session
    // localStorage.setItem('FirstName', pass.value);
    localStorage.setItem('Email', uid.value);
    //Redirect user to welcome page
    window.location.href = "welcome.html";
  }
  else {
    var text = "<h8>Invalid ID or Password</h8>";
    document.querySelector(".mypanel").innerHTML = text;
  }
}


b1.addEventListener('click', getFromServer);

// //API URL
// let url = 'https://nus-money.herokuapp.com/Bea';

// //Fetch user's FirstName from data
// fetch(url).then(function (response) {
//   return response.json();
// }).then(function (data) {
//   console.log(data);
//   localStorage.setItem('name', data.data.FirstName);
// }).catch(function () {
//   console.log("There was an error in the auth script");
// });

// // function catchLocalStorageData() {
// //     userName.innerHTML = localStorage.getItem('name');
// //     console.log(localStorage.getItem('name'));
// // }

