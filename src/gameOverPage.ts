import { goToLobby } from "./gotoLobby";

export function loadGameOverPage(message: string, isWin: boolean): void {

  const gameOverContainer = document.querySelector(".game-over");
  if (!gameOverContainer) return;

  document.querySelectorAll('main > section').forEach(section => section.classList.add('hidden'));
  gameOverContainer.classList.remove('hidden');

  gameOverContainer.innerHTML = `
    ${isWin ? `<h2 class="win">Congratulations!</h2> <p class="p-message-win">${message}</p>` : `<h2 class="lose">Game Over</h2> <p class="p-message-lose">${message}</p>`}
    
    <button id="backToLobbyBtn" class="btn-primary">Back to lobby</button>
  `;

  const backButton = document.getElementById("backToLobbyBtn");
  backButton?.addEventListener("click", () => {
    goToLobby();
  });
}