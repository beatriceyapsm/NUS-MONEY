//calculate Monthly Contribution

var val0 = document.getElementById('val0');
var val1 = document.getElementById('val1');
var val2 = document.getElementById('val2');
var val3 = document.getElementById('val3');
var val4 = document.getElementById('val4');
var val5 = document.getElementById('val5');
var val6 = document.getElementById('val6');
var val7 = document.getElementById('val7');
var val8 = document.getElementById('val8');


val0.addEventListener("input", sum);
val1.addEventListener("input", sum);
val2.addEventListener("input", sum);
val3.addEventListener("input", sum);
val4.addEventListener("input", sum);
val5.addEventListener("input", sum);
val6.addEventListener("input", sum);
val7.addEventListener("input", sum);
val8.addEventListener("input", sum);

//Add Category items
function sum() {
    var myIncome = parseFloat(val0.value) || 0;
    var one = parseFloat(val1.value) || 0;
    var two = parseFloat(val2.value) || 0;
    var three = parseFloat(val3.value) || 0;
    var four = parseFloat(val4.value) || 0;
    var five = parseFloat(val5.value) || 0;
    var six = parseFloat(val6.value) || 0;
    var seven = parseFloat(val7.value) || 0;
    var eight = parseFloat(val8.value) || 0;

    var balance = myIncome - (one + two + three + four + five + six + seven + eight) || 0;

    others.innerHTML = "$ " + balance;

    prcnt1.innerHTML = ((one / myIncome) * 100).toFixed(2);
    prcnt2.innerHTML = ((two / myIncome) * 100).toFixed(2);
    prcnt3.innerHTML = ((three / myIncome) * 100).toFixed(2);
    prcnt4.innerHTML = ((four / myIncome) * 100).toFixed(2);
    prcnt5.innerHTML = ((five / myIncome) * 100).toFixed(2);
    prcnt6.innerHTML = ((six / myIncome) * 100).toFixed(2);
    prcnt7.innerHTML = ((seven / myIncome) * 100).toFixed(2);
    prcnt8.innerHTML = ((eight / myIncome) * 100).toFixed(2);
    prcnt9.innerHTML = ((balance / myIncome) * 100).toFixed(2);

    return [myIncome, one, two, three, four, five, six, seven, eight, balance];

}

//clear monthly contribution form
function myFunction() {
    document.getElementById("myForm").reset();
    others.innerHTML = "";
    prcnt1.innerHTML = "";
    prcnt2.innerHTML = "";
    prcnt3.innerHTML = "";
    prcnt4.innerHTML = "";
    prcnt5.innerHTML = "";
    prcnt6.innerHTML = "";
    prcnt7.innerHTML = "";
    prcnt8.innerHTML = "";
    prcnt9.innerHTML = "";
}

//**Nithin Handover**
//Getting data in JSON format for database 'update'
//No column for SavingsTowardsGoal - needs to be added.
//Buttton click to submit data to database and move to next page

function updateButton() {
    var val = sum();
    var update = { "Income": val[0], "SavingsTowardsGoal": val[1], "PersonalSavings": val[2], "Investment": val[3], "Housing": val[4], "Insurance": val[5], "Mobile": val[6],  "Transport": val[7],  "Food": val[8],  "Others": val[9], "email": localStorage.getItem('Email') };
    let updateJSON = JSON.stringify(update);
    addContribution(updateJSON);
    console.log(update);
}

function addContribution(postData) {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: postData,
    };

    fetch("https://nus-money.herokuapp.com/update/contribution", requestOptions)
        .then((response) => response.text())
        .then(console.log("Monthly Contribution Update Successfull"))
        .then(document.querySelector("#status").innerHTML = "Update Successfull");
}