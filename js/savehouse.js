

function renderBTO(e) {
  e.preventDefault();
  var text = "BTO";
  var text = '<iframe width="1000" height="400" src="https://www.srx.com.sg/hdb/bto#bto-forecast" title="BTO Indicative Price"></iframe>';
  document.querySelector(".pricingpanel").innerHTML = text;

}
// function renderHDB(e){    

// var text = '<iframe width="600" height="400" src="https://data.gov.sg/dataset/resale-flat-prices/resource/f1765b54-a209-4718-8d38-a39237f502b3/view/093ff0f0-783f-4f6a-be52-7e506a8c58ca" frameBorder="0"> </iframe>';
//     document.querySelector(".pricingpanel").innerHTML = text;

//  }
function renderHDB1(e) {
  e.preventDefault();
  $.getJSON('https://data.gov.sg/api/action/datastore_search?resource_id=f1765b54-a209-4718-8d38-a39237f502b3&sort=month%20desc', function (data) {
    // JSON result in `data` variable

    var hdbdata = data.result.records;


    var text = "<table width class='table table-hover'><thead><td>Date</td> <td>Location</td> <td>Remaining Lease</td> <td>Size</td><td>Price</td></thead><tbody>";
    hdbdata.forEach(function (item) {
      text = text + `<tr class='table-primary'><td> ${item.month} </td> <td> ${item.town} </td> <td> ${item.remaining_lease} </td> <td> ${item.flat_type} </td>  
                  <td> ${item.resale_price} </td> </tr>`

    });
    text += "</tbody></table>"
    $(".pricingpanel").html(text);
  });
}


function renderCondo(e) {
  e.preventDefault();
  var text = '<iframe width="1000" height="400" src="https://www.squarefoot.com.sg/latest-transactions/sale/residential/condominium" title="Condo Indicative Price"></iframe>';
  document.querySelector(".pricingpanel").innerHTML = text;

}


BTO.addEventListener('click', renderBTO);
HDB.addEventListener('click', renderHDB1);
Condo.addEventListener('click', renderCondo);

//calculate Monthly Contribution

var total = document.getElementById('total');

total.addEventListener("input", goalamt);
addEventListener("load", totalfunds);
addEventListener("input", check);
addEventListener("input", diffdate);
addEventListener("input", monthcont);

var downpayment;
var funds;

//Add Category items  
function goalamt() {
  var myIncome = parseFloat(total.value) || 0;
  downpayment = (myIncome * 0.2) || 0;
  dprequire.innerHTML = "$ " + downpayment.toFixed(2);
  check();
  diffdate();
  monthcont();
}


function totalfunds() {
  var userurl = 'https://nus-money.herokuapp.com/user?Email=';
  var Email = localStorage.getItem('Email');
  userurl = userurl + Email;

  $.getJSON(userurl, function (data) {
    // JSON result in `data` variable

    var userdata = data;
    console.log(userdata);

    dpfunds.innerHTML = "$ " + userdata[0].DownPaymentAllocated;
     funds = parseFloat(userdata[0].DownPaymentAllocated) ;
      check();
      diffdate();
      monthcont();
   });
}

function check() {
    if (downpayment <= funds) {
    ready.innerHTML = "Yes";
  }
  else {
    ready.innerHTML = "No";
  }
}
function diffdate() {
  var t1 = new Date(document.getElementById('date1').value);
  var t2 = new Date(document.getElementById('date2').value);
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = new Date(mm + '/' + dd + '/' + yyyy);
  console.log(today);
  console.log(t1-today);
  var diffdays = (t1 - today) / (24 * 3600 * 1000);
  diffmth = diffdays / 30;
  if (funds < downpayment) {
    months.innerHTML = diffmth.toFixed(0) + " Months";
  }
  else {
    months.innerHTML = "NA";
  }
}
function monthcont() {
  if (funds < downpayment) {
    var addfunds = ((downpayment - funds) / diffmth)
    reqcont.innerHTML = "$ " + addfunds.toFixed(2)
  }
  else {
    reqcont.innerHTML = "NA"
  }
}

//Update DATA TO DB
function UpdateHouse(e) {
  var GoalAmount = document.getElementById('total');
  var PurchaseDate = document.getElementById('date1');
  var KeyCollectionDate = document.getElementById('date2');
  var DownPaymentRequired = document.getElementById('dprequire');
  var MonthlyContribution = document.getElementById('reqcont');
  var Email = localStorage.getItem('Email');

  var t1 = new Date(document.getElementById('date1').value);
  var t2 = new Date(document.getElementById('date2').value);
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = new Date(mm + '/' + dd + '/' + yyyy);
  console.log(today);
  console.log(t1-today);
  var diffdays = (t1 - today) / (24 * 3600 * 1000);
  diffmth = diffdays / 30;

  let postData = {
    //Create JS Object
    "GoalAmount": parseInt(GoalAmount.value),
    "PurchaseDate": PurchaseDate.value,
    "KeyCollectionDate": KeyCollectionDate.value,
    "DownPaymentRequired": 0.2 * parseInt(GoalAmount.value),
    "MonthstoGoal": diffmth,
    "MonthlyContribution": (0.2 * parseInt(GoalAmount.value) - funds) / diffmth,
    "Email": Email
  };

  // console.log(postData);
  let postDataJSON = JSON.stringify(postData); //Convert JS Object to JSON
  console.log(postDataJSON);
  addData(postDataJSON);
}

function addData(postData) {
  // pass your data in method
  //console.log(postData);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: postData,
  };

  fetch("https://nus-money.herokuapp.com/updatehouse", requestOptions)
    .then((response) => response.text())
    .then((result) => {renderuserdata(), rendersuccess()});

}


function renderuserdata(e) {
  var userurl = 'https://nus-money.herokuapp.com/user?Email=';
  var Email = localStorage.getItem('Email');
  userurl = userurl + Email;

  $.getJSON(userurl, function (data) {
    // JSON result in `data` variable

    var userdata = data;
    console.log(userdata);

    userdata.forEach(function (item) {
      //define date_formatter here
      var d_pd=new Date(`${item.PurchaseDate}`)
      var d_kc=new Date(`${item.KeyCollectionDate}`)
      text = `Amount: ${item.GoalAmount}<br>
    Purchase Date: ${d_pd.toDateString()}<br>
    Key Collection Date: ${d_kc.toDateString()}<br>
    DownPayment Required: ${item.DownPaymentRequired}<br>
    Monthly Contribution Required: ${item.MonthlyContribution}<br>`
    });

    document.getElementById("Currentsaved").innerHTML = text;
  });
};
addEventListener("load", renderuserdata);

function rendersuccess() {
  infosaved.innerHTML = "Information Saved!";
} ;

function NextMonthlyCon() {
  location.href = "/monthlycont.html"
}