import { goToLobby } from "./gotoLobby";
import type { IPlayer } from "./models/Player";

export function loginUser(e: Event): void {
  e.preventDefault();
  const usernameInput = document.getElementById('player-name') as HTMLInputElement;
  if(!usernameInput.value.trim()) {
    alert('Please enter a valid name');
    return;
  }
  const player: IPlayer = {
    id: crypto.randomUUID(),
    name: usernameInput.value.trim(),
    points: 0,
    artifacts: ['a', 'b', 'c'],
    roomTimes: [{ roomId: 2, time: 120 }, { roomId: 4, time: 150 }, { roomId: 3, time: 200 }],
    roomsCompleted: [1,2,3],
  };

  localStorage.setItem("player", JSON.stringify(player));
  goToLobby();
}