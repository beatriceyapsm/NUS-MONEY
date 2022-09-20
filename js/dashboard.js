
let userurl = 'https://nus-money.herokuapp.com/user';
userurl = userurl + '?Email='+localStorage.getItem('Email');

function renderuserdata(e) {
    $.getJSON(userurl, function (data) {
        // JSON result in `data` variable

        var userdata = data;
        console.log(userdata);

        var text = "<table class='table table-striped table-hover'><thead><tr><th colspan='2'>Fund Distribution</th></tr></thead><tbody>"
        userdata.forEach(function (item) {
            text = text + `<tr>
        <th scope='row'>Saving towards Goal</th>
        <td>${item.SavingsTowardsGoal}</td>
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
            result = [item.GoalAmount, item.PersonalSavings]
            // console.log(data);
            return result;
        });
        text += "</tbody></table>"
        document.getElementById("dashboard-data").innerHTML = text;
    });
};
addEventListener("load", renderuserdata);

function rendertotalContribution(e) {
    $.getJSON(userurl, function (data) {
        // JSON result in `data` variable

        var userdata = data;
        console.log(userdata);

        var text = ""


        userdata.forEach(function (item) {
            var Currentcont= item.DownPaymentAllocated+item.SavingsTowardsGoal;
            var Percentagec= (Currentcont/item.DownPaymentRequired*100).toFixed(2);
            text = `
            <div class='col-md-auto'>
                    <p class='text-center'><p>Current Contributions/Goal</p><p class='text-center'>${Currentcont}/${item.DownPaymentRequired}</p></p>
                </div>
                <div class='col-md-9'>
                    <div class='progress' weight='30px'>
                        <!--function-->
                        <div class='progress-bar progress-bar-striped progress-bar-animated' role='progressbar' aria-valuenow='75'
                            aria-valuemin='0' aria-valuemax='100' style='width: ${Currentcont}'>${Percentagec}%</div>
                    </div>
                </div>
            `
        });
        document.getElementById("total_contribution").innerHTML = text;
    });
};

addEventListener("load", rendertotalContribution);




fetch(userurl)
    // when we get a response map the body to json
    .then(response => response.json())
    // and pass the JSON data to mydata for rendering
    .then(data => captureDataPiChart(data[0]));

function captureDataPiChart(data1) {    
    // savingsArray.push(data.SavingsTowardsGoal);
    var savingsArray = [data1.SavingsTowardsGoal, data1.PersonalSavings, data1.Investment, data1.Housing, data1.Insurance, data1.Mobile, data1.Transport, data1.Food, data1.Others];
    console.log(savingsArray);
    // return savingsArray;
    const labels = [
        'Saving towards Goal',
        'Personal Savings',
        'Investment	',
        'Housing',
        'Insurance',
        'Mobile',
        'Transport',
        'Food',
        'Other'
    ];
    
    const data = {
        labels: labels,
        datasets: [{
            label: 'My First dataset',
            backgroundColor: [
                'rgb(102, 204, 255)',
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(153, 102, 51)',
                'rgb(84, 194, 54)',
                'rgb(194, 54, 182)',
                'rgb(255, 153, 102)',
                'rgb(153, 153, 255)'
            ],
            data: savingsArray,
        }]
    };
    
    const config = {
        type: 'pie',
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Fund Distribution'
                },
                legend: {
                    labels: {
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }
    };
    
    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}