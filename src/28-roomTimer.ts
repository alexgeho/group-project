let seconds = 0
let intervalId: number | null = null 

export function startRoomTimer() {
    if (intervalId !== null) {
        return
    }
        seconds = 0

        intervalId = setInterval(() => {
            seconds++
        }, 1000)
    }

    export function stopRoomTimer() {
        if (intervalId === null) {
            return 0
        }

        clearInterval(intervalId)
        intervalId = null

        return seconds
    }