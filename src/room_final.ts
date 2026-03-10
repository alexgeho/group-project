import { getPlayer } from "./fetchPlayerFromLs";
import { goToLobby } from "./gotoLobby";
import { addHighscore, getHighscoreList } from "./highscore";
import { startRoomTimer, stopRoomTimer } from "./roomTimer";
import { loadFinalVictoryPage } from "./room-final-victory";

const memoryContainer = document.getElementById("destiny");

export function loadFinalRoom(): void {
  if (!memoryContainer) return;
  const player = getPlayer();
  const artifacts = player?.artifacts;
  memoryContainer.innerHTML = `
<h2>Final Room - Destiny</h2>
    <div class="riddle-text">
      <h3>⚠ DECRYPT SEQUENCE INITIATED ⚠</h3>
      <br>
      <h4>Analyze the following transmission carefully. Hidden within lies the key to the portal. If entered wrong answer you'll remain trapped forever...</h4>
      <br>
      <i>"The portal's final lock requires a sacred word — a name known to all who dwell in the digital realm. This tool was forged by humans in the year 2005, crafted by a single mind — a legend who built the Linux kernel. It was born out of frustration, designed to bring order to chaos.
      <br>
      Developers across the world use it every day to collaborate. It allows many minds to work as one, each contributing to a greater creation without destroying what others have built.
      <br>
      It is not a language. It is not a framework. It is the invisible backbone of modern software development.
      <br>
      You have collected the fragments. Now assemble them."</i>
      <br><br>
      What is the name of this tool?
      <p>Collected artifacts: ${artifacts}</p>
    </div>

    <form id="final-answer-form">
      <label>
      <span>Answer:</span>
      <input type="text" id="final-answer" />
      </label>

      <button type="submit" id="submitFinalAnswer" class="btn-primary">
        Unlock portal
      </button>
    </form>
    
    <button id="finalBackToRooms" class="btn-primary">Back</button>`;

  startRoomTimer(memoryContainer, 360);
  const backButton = document.getElementById("finalBackToRooms");
  backButton?.addEventListener("click", () => {
    stopRoomTimer();
    goToLobby();
  });
  const submitButton = document.getElementById("submitFinalAnswer");
  submitButton?.addEventListener("click", (e) => {
    e.preventDefault();
    if (checkAnswer()) {
      const player = getPlayer();
      const highscoreList = getHighscoreList();

      const formElement = document.querySelector("#final-answer-form");
      formElement?.classList.add("correct-answer");

      setTimeout(() => {
        if (player) {
          const existingPlayer = highscoreList.find(
            (item) => item.id === player.id,
          );

          if (existingPlayer) {
            if (player.points > existingPlayer.score) {
              existingPlayer.score = player.points;
              addHighscore(existingPlayer);
            }
          } else {
            addHighscore({
              id: player.id,
              name: player.name,
              score: player.points,
              date: new Date().toLocaleDateString(),
            });
          }
          loadFinalVictoryPage(
            "Congratulations! You have successfully completed the game.",
            true,
          );
        }
      }, 1800);
    } else {
      const formElement = document.querySelector("#final-answer-form");
      formElement?.classList.add("correct-answer");

      setTimeout(() => {
        loadFinalVictoryPage(
          "Oh no! You destroyed the portal. You are stuck here now forever!",
          false,
        );
      }, 1800);
    }
  });
}

function checkAnswer(): boolean {
  const answerInput = document.getElementById(
    "final-answer",
  ) as HTMLInputElement;
  const answer = answerInput.value.trim().toLowerCase();
  return answer === "github";
}
