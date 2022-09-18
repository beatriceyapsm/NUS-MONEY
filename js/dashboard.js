
let userurl = 'https://nus-money.herokuapp.com/user';

//Find logged in user email ID query API
userurl = userurl + `?Email=${localStorage.getItem('Email')}`;

function renderuserdata(e) {
    $.getJSON(userurl, function (data) {
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
        document.getElementById("dashboard-data").innerHTML = text; 
    });
};


// chartArray = [userdata.GoalAmount,userdata.PersonalSavings,userdata.Investment,userdata.Housing,userdata.Insurance,userdata.Mobile,userdata.Transport,userdata.Food,userdata.Others];
// console.log(chartArray);

const data = {
    labels: [
        'Saving towards Goal',
        'Personal Savings',
        'Investment',
        'Housing',
        'Insurance',
        'Mobile',
        'Transport',
        'Food',
        'Others'
    ],
    datasets: [{
        label: 'My First Dataset',
        data: [8000, 600, 600, 600, 600, 0, 0, 0,  600],
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(84, 194, 54)',
            'rgb(194, 54, 182)'
        ],
        hoverOffset: 5
    }]
};

const config = {
    type: 'pie',
    data: data,
    options: {}
};


const myChart = new Chart(
    document.getElementById('myChart'),
    config
);

addEventListener("load", renderuserdata);