/*
 * 12_total_timer.ts
 * 
 * Measures the TOTAL time for the game.
 * The timer starts or resumes when entering a room
 * Timer pauses when exiting a room.
 */

let totalSeconds: number = 0;
let isRunning: boolean = false;
let intervalId: number | null = null;
let timerDisplay: HTMLElement | null = null;

// Initialize on load
timerDisplay = document.querySelector('#timer-display');
loadFromLocalStorage();
updateDisplay();

// START TIMER -- called when the user ENTERS a room
export function startTotalTimer(): void {
    if (!isRunning) {
        isRunning = true;
        
        // check if timer is resuming or starting for the first time
        if (totalSeconds > 0) {
            console.log('Total Timer resumed');
        } else {
            console.log('Total Timer started');
        }

        intervalId = window.setInterval(() => {
            totalSeconds++;
            updateDisplay();
            saveToLocalStorage();
        }, 1000);
    }
}

// PAUSE TIMER - called when the user EXITS a room
export function pauseTotalTimer(): void {
    if (isRunning) {
        isRunning = false;
        console.log('Total Timer paused');

        if (intervalId) {
            window.clearInterval(intervalId);
            intervalId = null;
        }
    }
}

// Get total time (in seconds)
export function getTotalSeconds(): number {
    return totalSeconds;
}

// Reset timer - only called when/if resetting the game
export function resetTotalTimer(): void {
    pauseTotalTimer();
    totalSeconds = 0;
    updateDisplay();
    localStorage.removeItem('totalSeconds');
}

// Format seconds to HH:MM:SS
function formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Update UI display
function updateDisplay(): void {
    if (timerDisplay) {
        timerDisplay.textContent = `Timer: ${formatTime(totalSeconds)}`;
    }
}

// Save to localStorage
function saveToLocalStorage(): void {
    localStorage.setItem('totalSeconds', String(totalSeconds));
}

// Load from localStorage
function loadFromLocalStorage(): void {
    const saved = localStorage.getItem('totalSeconds');
    totalSeconds = saved ? parseInt(saved, 10) : 0;
}
