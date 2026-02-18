/*
 * 12_total_timer.ts
 * 
 * Measures the TOTAL time for the game.
 * The timer starts or resumes when entering a room
 * Timer pauses when exiting a room.
 */

let totalSeconds: number = 0;
let accumulatedSeconds: number = 0;  // Time from previous sessions
let isRunning: boolean = false;
let intervalId: number | null = null;
let timerDisplay: HTMLElement | null = null;
let startTime: number = 0;  // When current session started

// Initialize on load
timerDisplay = document.querySelector('#timer-display');
updateDisplay();

// START TIMER -- called when the user ENTERS a room
export function startTotalTimer(): void {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now();
        
        // check if timer is resuming or starting for the first time
        if (accumulatedSeconds > 0) {
            console.log('Total Timer resumed');
        } else {
            console.log('Total Timer started');
        }

        intervalId = window.setInterval(() => {
            const sessionTime = Math.floor((Date.now() - startTime) / 1000);
            totalSeconds = accumulatedSeconds + sessionTime;
            updateDisplay();
            saveToLocalStorage();
        }, 100); // Update more frequently for accurate time
    }
}

// PAUSE TIMER - called when the user EXITS a room
export function pauseTotalTimer(): void {
    if (isRunning) {
        isRunning = false;
        console.log('Total Timer paused');

        // Save time from this session
        const sessionTime = Math.floor((Date.now() - startTime) / 1000);
        accumulatedSeconds += sessionTime;

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
    accumulatedSeconds = 0;
    updateDisplay();
    localStorage.removeItem('totalSeconds');
    console.log('Total Timer reset');
}

// Load from localStorage (call manually to resume)
export function loadTotalTimerFromLocalStorage(): void {
    loadFromLocalStorage();
    console.log('Total Timer loaded from localStorage');
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
    accumulatedSeconds = saved ? parseInt(saved, 10) : 0;
    totalSeconds = accumulatedSeconds;
}
