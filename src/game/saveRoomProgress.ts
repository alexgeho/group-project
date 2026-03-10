import { getPlayer } from "../storage/fetchPlayerFromLs";
import { stopRoomTimer, getTimeLeft } from "./roomTimer";

export function saveRoomProgress(roomNumber: number, roomArtifact: string): void {
  const player = getPlayer();
  if (player) {
    if (!player.artifacts.includes(roomArtifact) && !player.roomsCompleted.includes(roomNumber)) {
      player.artifacts.push(roomArtifact);
      player.roomsCompleted.push(roomNumber);
      player.roomTimes.push({ roomId: roomNumber, time: getTimeLeft() });
      player.points += getTimeLeft();
    }
    localStorage.setItem("player", JSON.stringify(player));
    stopRoomTimer();
  }
}