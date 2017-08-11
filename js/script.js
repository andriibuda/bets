/**
 * Created by Bud.Andr on 10.08.2017.
 */

var erase = document.getElementById('delete');
var submit = document.getElementById('calculate');

submit.onclick = function (event) {
    event.preventDefault();

    var input = {
        budget : document.getElementById('budget').value,
        k      : document.getElementById('k').value,
        w_rate : document.getElementById('w_rate').value,
        n_bets : document.getElementById('n_bets').value,
        a_bet  : document.getElementById('a_bet').value
    };


    w_rate = (+input.w_rate)/100;
    console.log(w_rate);
    var bets = input.n_bets;

    for (var i = 0; i < bets; i++) {
        if (Math.random() < w_rate) {
            // console.log('Win');
            generateRow(input, 'Win');
        } else {
            // console.log('Lose');
            generateRow(input, 'Lose');
        }
    }

};

erase.onclick = function (event) {
    event.preventDefault();
    var table = document.getElementById('statusTable');
    var tableRows = table.getElementsByTagName('tr');
    var rowCount = tableRows.length;

    while(--rowCount) {
        table.deleteRow(rowCount);
    }

};


// Functions

function generateRow(data, status) {
    var income = data.a_bet,
        budget = data.budget;

    if (status == 'Win') {
        income = (income * data.k) - income;
        income = (Math.round(income * 100) / 100);
        budget = budgetCount(data.budget, income, 'win');

        income = '+' + income;
        console.log(income);
    } else {
        budget = budgetCount(data.budget, income, 'lose');
        // set negative value
        income = '-' + income;

    }

    var table = document.getElementById('statusTable');

    var row = table.insertRow(-1);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = status;
    cell2.innerHTML = income;
    cell3.innerHTML = '$'+budget;
}

function budgetCount(budget, income, status) {
    if ( typeof budgetCount.counter == 'undefined' ) {
        budgetCount.counter = budget;
    }

    if (status == 'win') {
        budgetCount.counter = +budgetCount.counter + +income;
    } else {
        budgetCount.counter = +budgetCount.counter - +income;
    }

    return budgetCount.round(budgetCount.counter);
}

budgetCount.round = function(value) {
    value = (Math.round(value * 100) / 100);
    return value;
};



function winCounter(status) {
    if ( typeof winCounter().wins == 'undefined' ) {
        winCounter.wins = 0;
    }

    if ( typeof winCounter().loses == 'undefined' ) {
        winCounter.loses = 0;
    }
    
    if (status == 'win') {
        ++winCounter.wins;
    } else {
        ++winCounter.loses;
    }
}

winCounter.getStats = function() {
    console.log('Wins: '+ winCounter.wins + ' Loses: ' + winCounter.loses);
};