/*
 * 12_total_timer.ts
 * 
 * Measures the total game time played (room visit time) for a user
 * Timer starts or resumes when entering a room and pauses when exiting a room
 * Timer can be reset when needed
 * 
 * Data is passed via callback function - caller decides how to save/use it
 */

let totalSeconds: number = 0;
let intervalId: number | null = null;
let timerDisplay: HTMLElement | null = null;

timerDisplay = document.querySelector('#total-timer');
updateDisplay();

// START & RESUME TIMER - called when the user enters a room
export function startTotalTimer(updateUI?: (time: number) => void): void {
    if (intervalId !== null) return;

    intervalId = window.setInterval(() => {
        totalSeconds++;
        updateDisplay();
        if (updateUI) {
            updateUI(totalSeconds);
        }
    }, 1000);
}

// PAUSE TIMER - called when the user exits a room
export function pauseTotalTimer(): number {
    if (intervalId === null) return 0;

    window.clearInterval(intervalId);
    intervalId = null;
    return totalSeconds;
}

// Reset timer - only called when resetting the game
export function resetTotalTimer(): void {
    pauseTotalTimer();
    totalSeconds = 0;
    updateDisplay();
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
        timerDisplay.textContent = formatTime(totalSeconds);
    }
}