let score = 0;

let greenClicks = 0;
let redClicks = 0;

const ctx =
document
.getElementById("chart");

const chart =
new Chart(ctx,{
type:"line",

data:{
labels:[0],

datasets:[{
label:"Score History",

data:[0]
}]
}
});

function updateUI(){

document
.getElementById("score")
.innerText =
score.toFixed(2);

document
.getElementById("greenCount")
.innerText =
greenClicks;

document
.getElementById("redCount")
.innerText =
redClicks;

let badge = "Starter";

if(score >= 50)
badge = "🥉 Bronze";

if(score >= 100)
badge = "🥈 Silver";

if(score >= 500)
badge = "🥇 Gold";

document
.getElementById("badge")
.innerText =
badge;

chart.data.labels.push(
chart.data.labels.length
);

chart.data.datasets[0]
.data.push(score);

chart.update();

localStorage.setItem(
"score",
score
);
}

function addScore(){

let value =
parseFloat(
document
.getElementById("plusValue")
.value
) || 0;

score += value;

greenClicks++;

updateUI();
}

function subtractScore(){

let value =
parseFloat(
document
.getElementById("minusValue")
.value
) || 0;

score -= value;

redClicks++;

updateUI();
}

let saved =
localStorage.getItem(
"score"
);

if(saved){

score =
parseFloat(saved);

updateUI();
}
