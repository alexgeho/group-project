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
    artifacts: [],
    roomTimes: [],
    roomsCompleted: [],
  };

  localStorage.setItem("player", JSON.stringify(player));
  goToLobby();
}