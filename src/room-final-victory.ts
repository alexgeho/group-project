import { getPlayer } from "./fetchPlayerFromLs";
import { ResetPlayerStats } from "./reset-player-stats";
import { stopRoomTimer } from "./roomTimer";
import { GetDataToShare } from "./share-result";
import { pauseTotalTimer } from "./total_timer";

export function loadFinalVictoryPage(message: string, isWin: boolean): void {
  const player = getPlayer()
  pauseTotalTimer();
  
  const gameOverContainer = document.querySelector(".final-puzzle-victory");
  if (!gameOverContainer) return;

  document.querySelectorAll('main > section').forEach(section => section.classList.add('hidden'));
  gameOverContainer.classList.remove('hidden');

  gameOverContainer.innerHTML = `
    ${isWin ? `<div class="portale"></div>
              <div class="win-div">
                <h2 class="win">Congratulations!</h2> 
                <p class="p-message-win">${message}</p>
              </div>` : 
              `<div class="lose-div">
                  <h2 class="lose">Game Over</h2> 
                  <p class="p-message-lose">${message}</p>
                </div>`}
    
    <div class="share-box hidden"><p class="share-txt"></p><button class="copy-btn btn-primary">Copy!</button></div>
    <button id="shareBtn" class="btn-primary">Share 📎</button>
    <button id="playAgainBtn" class="btn-primary">Play Again</button>
  `;
  stopRoomTimer();
  const backButton = document.getElementById("playAgainBtn");
  backButton?.addEventListener("click", () => {
    ResetPlayerStats();
  });

  const shareBtn = document.getElementById('shareBtn');
  shareBtn?.addEventListener('click', () => {
    if (player) {
      GetDataToShare(player);
    }
  })
}