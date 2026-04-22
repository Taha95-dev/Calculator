const display = document.getElementById("display");
const buttonsContainer = document.querySelector(".buttons");
const historyList = document.getElementById("history");
const clearHistoryBtn = document.getElementById("clearHistory");
const pi = document.getElementById("pi");
const E = document.getElementById("E");
const power = document.getElementById("power");

let history = [];

const buttons = [
    "AC","DE","/",".",
    "7","8","9","+",
    "4","5","6","-",
    "1","2","3","*",
    "(",")","0","="
];

// Generate buttons dynamically
buttons.forEach(label => {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.addEventListener("click", () => handleInput(label));
    buttonsContainer.appendChild(btn);
});

// Handle button clicks
function handleInput(label){
    if(label === "AC") {
        display.value = "";
    } else if(label === "DE") {
        display.value = display.value.slice(0,-1);
    } else if(label === "=") {
        try {
            const expression = display.value;
            const result = eval(expression);
            display.value = result;

            const record = expression + " = " + result;
            history.push(record);

            const li = document.createElement("li");
            li.textContent = record;
            historyList.appendChild(li);
        } catch {
            display.value = "Error";
        }
    } else {
        display.value += label;
    }
}

// Keyboard support
document.addEventListener("keydown", (e) => {
    const allowedKeys = "0123456789+-*/().";
    if(allowedKeys.includes(e.key)) {
        display.value += e.key;
    } else if(e.key === "Enter") {
        handleInput("=");
    } else if(e.key === "Backspace") {
        handleInput("DE");
    } else if(e.key === "Escape") {
        handleInput("AC");
    }
});

// Clear history button
clearHistoryBtn.addEventListener("click", () => {
    history = [];
    historyList.innerHTML = "";
});
pi.addEventListener("click", () => {
    display.value+= Math.PI
});
E.addEventListener("click", () => {
    display.value+= Math.E
});
power.addEventListener("click", () => {
    display.value+='**'
});

