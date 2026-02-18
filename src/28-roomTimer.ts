let seconds = 0
let intervalId: number | null = null 

export function startRoomTimer(updateUI: (time: number) => void) {
    if (intervalId !== null) {
        return
    }
        seconds = 0

        intervalId = setInterval(() => {
            seconds++;
            updateUI(seconds);
        }, 1000)
    }

    export function stopRoomTimer(): number {
        if (intervalId === null) {
            return 0
        }

        clearInterval(intervalId)
        intervalId = null

        console.log("Room time", seconds)

        return seconds
    }