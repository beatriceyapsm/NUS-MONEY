
let userurl = 'https://nus-money.herokuapp.com/user';
userurl = userurl + '?GoogleID=1';

function renderuserdata(e) {
    $.getJSON(userurl,function (data) {
      // JSON result in `data` variable

      var userdata = data;
    console.log(userdata);

    var text = "<table class='table table-striped table-hover'><thead><tr><th colspan='2'>Fund Distribution</th></tr></thead><tbody>"
    userdata.forEach(function (item) {
    text = text + `<tr>
        <th scope='row'>Saving towards Goal</th>
        <td>${item.GoalAmount}</td>
    <tr>
        <th scope='row'>Personal Savings</th>
        <td>${item.PersonalSavings}</td>
    </tr>
    <tr>
        <th scope='row'>Investment</th>
        <td>${item.Investment}</td>
    </tr>
    <tr>
        <th scope='row'>Housing</th>
        <td>${item.Housing}</td>
    </tr>
    <tr>
        <th scope='row'>Insurance</th>
        <td>${item.Insurance}</td>
    </tr>
    <tr>
        <th scope='row'>Mobile</th>
        <td>${item.Mobile}</td>
    </tr>
    <tr>
        <th scope='row'>Transport</th>
        <td>${item.Transport}</td>
    </tr>
    <tr>
        <th scope='row'>Food</th>
        <td>${item.Food}</td>
    </tr>
    <tr>
        <th scope='row'>Others</th>
        <td>${item.Others}</td>
    </tr>`



      });
      text += "</tbody></table>"

      document.getElementById("dashboard-data").innerHTML=text;
    });
  };
  addEventListener("load", renderuserdata);

function rendertotalContribution(e) {
    $.getJSON(userurl,function (data) {
      // JSON result in `data` variable

      var userdata = data;
    console.log(userdata);

    var text= "<p>Total Contribution</p>"
    userdata.forEach(function(item){
        text=text + `<p class="text-center">${item.GoalAmount}`});
        text += "</p>"
        document.getElementById("total_contribution").innerHTML=text;
    });
    };
    addEventListener("load", rendertotalContribution);

//why it is not working?

function rendermonthtosave(e){
    $.getJSON(userurl,function(data){
        var userdata=data;
        console.log(userdata);
        var text= "<p>hi</p>"
        userdata.forEach(function(item){
            text=text + `<P>Month save ${GoalAmount}`
        });
        text += "</p>"
        document.getElementById("monthstosave").innerHTML=text;
    });
};
    addEventListener("load",rendermonthtosave);

//const data = {
//    labels: [
        'Saving',
        'Saving for goal',
        'Investment',
        'Living expenses',
        'others'
//    ],
//    datasets: [{
//        label: 'My First Dataset',
//        data: [100, 50, 100, 50, 60],
//        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(84, 194, 54)',
            'rgb(194, 54, 182)'
//        ],
        hoverOffset: 5
//    }]
//};

//const config = {
//    type: 'pie',
//    data: data,
//    options: {}
//};


//const myChart = new Chart(
//    document.getElementById('myChart'),
//    config
//);

//Redirect click on icon to welcome page
function homeIconClick() {
  location.href = "/index.html"
}
