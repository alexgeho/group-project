/*
 * 12_total_timer.ts
 * 
 * Measures the total game time played (room visit time) for a user
 * Timer starts or resumes when entering a room and pauses when exiting a room
 * Timer can be reset when needed
 * 
 * TO-DO: Integrate with actual progress saving logic, instead of saving
 * to localStorage (currently used for testing/logging purposes)
 */

let totalSeconds: number = 0;
let intervalId: number | null = null;
let timerDisplay: HTMLElement | null = null;

timerDisplay = document.querySelector('#total-timer');
updateDisplay();

// START & RESUME TIMER - called when the user enters a room
export function startTotalTimer(): void {
    if (intervalId !== null) return;

    console.log(totalSeconds > 0 ? 'Total Timer resumed' : 'Total Timer started');

    intervalId = window.setInterval(() => {
        totalSeconds++;
        updateDisplay();
        saveToLocalStorage(); // Save the current time to localStorage every second (for now)
    }, 1000);
}

// PAUSE TIMER - called when the user exits a room
export function pauseTotalTimer(): void {
    if (intervalId === null) return;

    console.log('Total Timer paused');
    window.clearInterval(intervalId);
    intervalId = null;
}

// Reset timer - only called when resetting the game
export function resetTotalTimer(): void {
    pauseTotalTimer();
    totalSeconds = 0;
    updateDisplay();
    localStorage.removeItem('totalSeconds');
    console.log('Total Timer reset');
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

// Save to localStorage (currently used for testing/logging purposes)
// TO-DO: integrate data progress saving logic, or optimize to save only when pausing or exiting a room? 
function saveToLocalStorage(): void {
    localStorage.setItem('totalSeconds', String(totalSeconds));
}
