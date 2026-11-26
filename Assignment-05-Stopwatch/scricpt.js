let seconds = 0;
let timer = null;

const display = document.getElementById("display");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

// Format and display time
function updateDisplay() {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let remainingSeconds = seconds % 60;

    display.textContent =
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(remainingSeconds).padStart(2, "0");
}

// Start stopwatch
startBtn.addEventListener("click", function () {

    if (timer === null) {

        timer = setInterval(function () {
            seconds++;
            updateDisplay();
        }, 1000);

    }

});

// Pause stopwatch
pauseBtn.addEventListener("click", function () {

    clearInterval(timer);
    timer = null;

});

// Reset stopwatch
resetBtn.addEventListener("click", function () {

    clearInterval(timer);
    timer = null;

    seconds = 0;
    updateDisplay();

});