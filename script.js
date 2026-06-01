let score = 0;
let greenClicks = 0;
let redClicks = 0;
let history = [];

// Chart
const ctx = document.getElementById("chart");

const chart = new Chart(ctx,{
    type:"line",
    data:{
        labels:[0],
        datasets:[{
            label:"Score History",
            data:[0],
            borderWidth:3
        }]
    },
    options:{
        responsive:true
    }
});

function updateUI(){

    document.getElementById("score").innerText =
    score.toFixed(2);

    document.getElementById("greenCount").innerText =
    greenClicks;

    document.getElementById("redCount").innerText =
    redClicks;

    let badge = "Starter";

    if(score >= 50)
        badge = "🥉 Bronze";

    if(score >= 100)
        badge = "🥈 Silver";

    if(score >= 500)
        badge = "🥇 Gold";

    document.getElementById("badge").innerText =
    badge;

    localStorage.setItem("score",score);
    localStorage.setItem("greenClicks",greenClicks);
    localStorage.setItem("redClicks",redClicks);
}

function addScore(){

    let value =
    parseFloat(
        document.getElementById("plusValue").value
    ) || 0;

    score += value;
    greenClicks++;

    history.push({
        type:"add",
        value:value
    });

    chart.data.labels.push(
        chart.data.labels.length
    );

    chart.data.datasets[0].data.push(score);

    chart.update();

    updateUI();
}

function subtractScore(){

    let value =
    parseFloat(
        document.getElementById("minusValue").value
    ) || 0;

    score -= value;
    redClicks++;

    history.push({
        type:"subtract",
        value:value
    });

    chart.data.labels.push(
        chart.data.labels.length
    );

    chart.data.datasets[0].data.push(score);

    chart.update();

    updateUI();
}

function resetScore(){

    if(confirm("Reset everything?")){

        score = 0;
        greenClicks = 0;
        redClicks = 0;
        history = [];

        chart.data.labels = [0];
        chart.data.datasets[0].data = [0];
        chart.update();

        updateUI();
    }
}

function undoLast(){

    if(history.length === 0){
        return;
    }

    let last = history.pop();

    if(last.type === "add"){

        score -= last.value;
        greenClicks--;

    }else{

        score += last.value;
        redClicks--;

    }

    chart.data.labels.push(
        chart.data.labels.length
    );

    chart.data.datasets[0].data.push(score);

    chart.update();

    updateUI();
}

// Load Saved Data
let savedScore =
localStorage.getItem("score");

let savedGreen =
localStorage.getItem("greenClicks");

let savedRed =
localStorage.getItem("redClicks");

if(savedScore)
    score = parseFloat(savedScore);

if(savedGreen)
    greenClicks = parseInt(savedGreen);

if(savedRed)
    redClicks = parseInt(savedRed);

updateUI();
