import { goToLobby } from "./gotoLobby";

const memoryContainer = document.getElementById("bug-room");

export function loadRoomFive(): void {
  if (!memoryContainer) return;

  memoryContainer.innerHTML = `
    <p>Welcome to Room Five Bug Room</p>
    <button id="fiveBackToRooms" class="btn-primary">Back</button>
  `;

  const backButton = document.getElementById("fiveBackToRooms");
  backButton?.addEventListener("click", goToLobby);
}