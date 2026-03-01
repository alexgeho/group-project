import { loadGameOverPage } from "./gameOverPage";
let intervalId: number | null = null
let timeLeft = 0;

export function startRoomTimer(htmlElement: HTMLElement, seconds: number) {
    timeLeft = seconds;
    const timerElement = document.createElement("p") as HTMLParagraphElement;
    timerElement.className = "room-timer";
    htmlElement.appendChild(timerElement);
    timerElement.innerHTML = `Time left: ${timeLeft}s`

    intervalId = setInterval(() => {
        timeLeft--;
        timerElement.innerHTML = `Time left: ${timeLeft}s`;
        console.log(timeLeft, " time left in room timer");
        if (timeLeft <= 0) {
            stopRoomTimer();
            loadGameOverPage("Time's up! You Lose!", false);
        }
    }, 1000)
}

export function stopRoomTimer(): void {
    if (intervalId === null) {
        return
    }

    clearInterval(intervalId)
    intervalId = null
    // const player = getPlayer();
    // if (player && player.roomsCompleted && player.roomsCompleted.length > 0) {
    //     const currentRoom = roomNumber
    //     player.roomTimes = player.roomTimes || { currentRoom: currentRoom, time: timeLeft } as any;
    //     localStorage.setItem("player", JSON.stringify(player));
    // }
}

export function getTimeLeft(): number {
    return timeLeft;
}