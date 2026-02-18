/*
 * 12_total_timer.ts
 * 
 * Measures the TOTAL time for the game.
 * The timer starts or resumes when entering a room
 * Timer pauses when exiting a room.
 * 
 * Will be initialized in main.ts
 */

class TotalTimer {
    private totalSeconds: number = 0;
    private isRunning: boolean = false;
    private intervalId: number | null = null;
    private timerDisplay: HTMLElement | null = null;

    constructor() {
        // Find element to display the timer
        this.timerDisplay = document.querySelector('#timer-display');
        this.loadFromLocalStorage();
        this.updateDisplay();
    }


    // START TIMER -- called when the user ENTERS a room
    public startTimer(): void {
        if (!this.isRunning) {
            this.isRunning = true;
            
            // check if timer is resuming game time or starting for the first time
            if (this.totalSeconds > 0) {
                console.log('Total Timer resumed');
            } else {
                console.log('Total Timer started');
            }

            this.intervalId = window.setInterval(() => {
                this.totalSeconds++;
                this.updateDisplay();
                this.saveToLocalStorage();
            }, 1000);
        }
    }

    // PAUSE TIMER - called when the user EXITS a room
    public pauseTimer(): void {
        if (this.isRunning) {
            this.isRunning = false; // ← paused timer
            console.log('Total Timer paused');

            if (this.intervalId) {
                window.clearInterval(this.intervalId);
                this.intervalId = null;
            }
        }
    }

    // Get total time (in seconds)
    public getTotalSeconds(): number {
        return this.totalSeconds;
    }

    // Format seconds to HH:MM:SS
    private formatTime(seconds: number): string {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }


    // Update UI display. TODO: fix CSS
    private updateDisplay(): void {
        if (this.timerDisplay) {
            this.timerDisplay.textContent = `Timer: ${this.formatTime(this.totalSeconds)}`;
        }
    }


    // Save to localStorage. TODO: Use correct save logic in the future. Player data?
    private saveToLocalStorage(): void {
        localStorage.setItem('totalSeconds', String(this.totalSeconds));
    }

    // Load from localStorage. TODO: Use correct load logic in the future
    private loadFromLocalStorage(): void {
        const saved = localStorage.getItem('totalSeconds');
        this.totalSeconds = saved ? parseInt(saved, 10) : 0;
    }

    // Reset timer - only called when/if resetting the game
    public resetTimer(): void {
        this.pauseTimer();
        this.totalSeconds = 0;
        this.updateDisplay();
        localStorage.removeItem('totalSeconds');
    }
}

export default TotalTimer;
