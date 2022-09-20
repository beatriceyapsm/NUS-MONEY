// Adding account rows

$(function () {

    // Start counting from the third row
    var counter = 2;

    $("#insertRow").on("click", function (event) {
        event.preventDefault();

        var newRow = $("<tr>");
        var cols = '';

        // Table columns
        cols += '<th scrope="row">' + counter + '</th>';
        // cols += '<td><input class="form-control rounded-0" type="text" name="firstname" placeholder="Account Name"></td>';
        // cols += '<td><input class="form-control rounded-0" type="number" name="lastname" placeholder="Balance"></td>';
        // cols += '<td><button class="btn btn-danger rounded-0" id ="deleteRow"><i class="fa fa-trash"></i></button</td>';

        cols += `<td>
        <select class="form-control" name="Bank" id="bank">
        <option value="">Select</option>
        <option value="DBS">DBS Bank</option>
        <option value="UOB">UOB</option>
        <option value="Citibank">Citibank</option>
        <option value="Maybank">Maybank</option>
        <option value="SCB">Standard Chartered</option>
        <option value="SBI">SBI</option>
        <option value="CIMB">CIMB</option>
        <option value="OCBC">OCBC</option>
        </select>
        </td>
        <td><input type="number" class="form-control" placeholder="xxx-xx-xxx" aria-label="Account number"></td>
        <td ><input type="number" class="form-control" placeholder="$" aria-label="Balance" name="balance"></td>
        <td><button class="btn btn-danger rounded-0" id ="deleteRow"><i class="fa fa-trash"></i></button</td>`;

        // Insert the columns inside a row
        newRow.append(cols);

        // Insert the row inside a table
        $(".table").append(newRow);

        // Increase counter after each row insertion
        counter++;
    });

    // Remove row when delete btn is clicked
    $(".table").on("click", "#deleteRow", function (event) {
        $(this).closest("tr").remove();
        counter -= 1
    });
});


//Summary Calculation

var val0 = document.getElementById('acc1');
var val1 = document.getElementById('bal1');
var val2 = document.getElementById('downPayment');
var val3 = document.getElementById('bank1');

val0.addEventListener("input", sum);
val1.addEventListener("input", sum);
val2.addEventListener("input", sum);
val3.addEventListener("input", sum);

//Add Category items
function sum() {
    var acc1 = parseFloat(val0.value) || 0;
    var bal1 = parseFloat(val1.value) || 0;
    var downPayment = parseFloat(val2.value) || 0;

    sum1.innerHTML = "$ " + bal1.toFixed(2);
    sum2.innerHTML = "$ " + downPayment.toFixed(2);
    sum3.innerHTML = "$ " + (bal1 - downPayment).toFixed(2);

    return [acc1, bal1, downPayment];

}

//**Nithin Handover**
//Getting data in JSON format for database 'update'
//Ideally needs a seperate table if use is allowed to enter multiple accounts, but let's not complicate for now. Use the same user table and just add 1 account..
//Buttton click to submit data to database and move to next page

function updateButton() {
    var val = sum();
    var updateAccount = { "accountname": val3.value, "accountnumber": val[0], "balance": val[1], "email": localStorage.getItem('Email') };
    var updateDownpayment = { "DownPaymentAllocated": val[2], "email": localStorage.getItem('Email') };
    let updateAccountJSON = JSON.stringify(updateAccount);
    let updateDownpaymentJSON = JSON.stringify(updateDownpayment);
    addAccount(updateAccountJSON);
    addDownpayment(updateDownpaymentJSON);
    console.log(updateAccount);
    console.log(updateDownpayment);
}

function addAccount(postData) {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: postData,
    };

    fetch("https://nus-money.herokuapp.com/update/assets", requestOptions)
        .then((response) => response.text())
        .then(console.log("Account Update Successful"));
}

function addDownpayment(postData) {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: postData,
    };

    fetch("https://nus-money.herokuapp.com/update/downpayment", requestOptions)
        .then((response) => response.text())
        .then(console.log("Downpayment Update Successfull"))
        .then(document.querySelector("#status").innerHTML = "Update Successful");
}