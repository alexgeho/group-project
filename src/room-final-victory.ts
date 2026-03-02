import { goToLobby } from "./gotoLobby";
import { stopRoomTimer } from "./roomTimer";

export function loadFinalVictoryPage(message: string, isWin: boolean): void {
  
  const gameOverContainer = document.querySelector(".final-puzzle-victory");
  if (!gameOverContainer) return;

  document.querySelectorAll('main > section').forEach(section => section.classList.add('hidden'));
  gameOverContainer.classList.remove('hidden');

  gameOverContainer.innerHTML = `
    ${isWin ? `<div class="win-div"><h2 class="win">Congratulations!</h2> <p class="p-message-win"></div>${message}</p>` : 
    `<div class="lose-div"><h2 class="lose">Game Over</h2> <p class="p-message-lose">${message}</p></div>`}
    
    <button id="backToLobbyBtn" class="btn-primary">Back to lobby</button>
  `;
  stopRoomTimer();
  const backButton = document.getElementById("backToLobbyBtn");
  backButton?.addEventListener("click", () => {
    goToLobby();
  });
}