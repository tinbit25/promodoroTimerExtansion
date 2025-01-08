const timerDisplay = document.getElementById("timer-display");
const startPauseBtn = document.getElementById("start-pause-btn");
const resetBtn = document.getElementById("reset-btn");

let isRunning = false;

// Format time as mm:ss
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

// Update the timer display
function updateDisplay(timeLeft) {
  timerDisplay.textContent = formatTime(timeLeft);
}

// Handle start/pause button click
startPauseBtn.addEventListener("click", () => {
  if (isRunning) {
    chrome.runtime.sendMessage({ action: "stopTimer" });
    startPauseBtn.textContent = "Start";
  } else {
    chrome.runtime.sendMessage({ action: "startTimer" });
    startPauseBtn.textContent = "Pause";
  }
  isRunning = !isRunning;
});

// Handle reset button click
resetBtn.addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "stopTimer" });
  updateDisplay(25 * 60); // Reset to default 25 minutes
  startPauseBtn.textContent = "Start";
  isRunning = false;
});

// Request current timer status when popup opens
chrome.runtime.sendMessage({ action: "getStatus" }, (response) => {
  if (response) {
    updateDisplay(response.timeLeft);
    isRunning = response.isRunning;
    startPauseBtn.textContent = isRunning ? "Pause" : "Start";
  }
});
