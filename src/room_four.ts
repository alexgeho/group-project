import { goToLobby } from "./gotoLobby";
import { showPlayerStats } from "./showPlayerStats";
import { startRoomTimer, stopRoomTimer } from "./roomTimer";
import type { IPlayer } from "./models/Player";

// Krypterad text (Caesar shift 1). Dekoderad blir: "The portal letter is G"
const encryptedMessage = "Uif qpsubm mfuufs jt H.";
const shift = 1;
const portalLetter = "G";

// Dekoderar en text med Caesar-chiffer. Varje bokstav flyttas 1 'shift' steg bakåt i alfabetet.
 
function caesarDecode(text: string, shift: number): string {
  let result = "";

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const code = char.charCodeAt(0);

    if (code >= 65 && code <= 90) {
      let newCode = code - shift;
      if (newCode < 65) {
        newCode = newCode + 26;
      }
      result = result + String.fromCharCode(newCode);
    } else if (code >= 97 && code <= 122) {
      let newCode = code - shift;
      if (newCode < 97) {
        newCode = newCode + 26;
      }
      result = result + String.fromCharCode(newCode);
    } else {
      result = result + char;
    }
  }

  return result;
}

const decodedMessage = caesarDecode(encryptedMessage, shift);

// Lägger till en bokstav i spelarens artefakter och sparar i localStorage.

function addLetterToPlayer(letter: string): void {
  const playerJson = localStorage.getItem("player");
  if (playerJson === null) {
    return;
  }

  const player: IPlayer = JSON.parse(playerJson);

  if (player.artifacts.includes(letter)) {
    return;
  }

  player.artifacts.push(letter);

  if (player.roomsCompleted.includes(4) === false) {
    player.roomsCompleted.push(4);
  }

  localStorage.setItem("player", JSON.stringify(player));
  showPlayerStats();
}

// Kontrollerar om spelarens svar är rätt. 
 
function isCorrectAnswer(answer: string): boolean {
  const answerUpper = answer.toUpperCase().trim();
  const correctMessage = "THE PORTAL LETTER IS G";

  if (answerUpper === correctMessage) {
    return true;
  }

  return false;
}

export function loadRoomFour(): void {
  const container = document.getElementById("encryption");
  if (container === null) {
    return;
  }

  // G ska bara finnas om rum 4 är klarat. Tar bort G om den finns utan att rummet är klart.
  const playerJson = localStorage.getItem("player");
  if (playerJson) {
    const player = JSON.parse(playerJson) as IPlayer;
    const hasRoomFourCompleted =
      player.roomsCompleted && player.roomsCompleted.includes(4);
    if (
      player.artifacts &&
      player.artifacts.includes(portalLetter) &&
      !hasRoomFourCompleted
    ) {
      player.artifacts = player.artifacts.filter(function (a) {
        return a !== portalLetter;
      });
      localStorage.setItem("player", JSON.stringify(player));
      showPlayerStats();
    }
  }

  container.innerHTML = `
    <div class="room-four-content box">
      <div id="encryption-timer"></div>
      <h2>The Encryption</h2>
      <p>All communication in the Code World is encrypted. Decode the message, reveal its meaning, and collect a letter for the portal password.</p>
      <div class="encrypted-message">
        <label>Intercepted transmission:</label>
        <pre>${encryptedMessage}</pre>
      </div>
      <p class="hint">Tip: In a Caesar cipher, every letter is shifted the same number of steps in the alphabet (e.g. A→B, B→C). All letters are shifted equally.</p>
      <div class="login-form">
        <form id="decode-form">
          <label for="decode-input">
            <span>Decoded message:</span>
            <input
              type="text"
              id="decode-input"
              name="decode-input"
              placeholder="Your answer..."
              autocomplete="off"
            />
          </label>
          <button type="submit" class="btn-primary">Submit</button>
        </form>
      </div>
      <p id="decode-feedback" class="feedback"></p>
      <button id="encryption-back" class="btn-primary hidden">Back to lobby</button>
      <button id="encryption-back-early" class="btn-primary">Back</button>
    </div>
  `;

  const form = document.getElementById("decode-form") as HTMLFormElement;
  const input = document.getElementById("decode-input") as HTMLInputElement;
  const feedback = document.getElementById("decode-feedback") as HTMLParagraphElement;
  const backBtn = document.getElementById("encryption-back") as HTMLButtonElement;
  const backBtnEarly = document.getElementById("encryption-back-early") as HTMLButtonElement;
  const timerContainer = document.getElementById("encryption-timer") as HTMLDivElement;

  startRoomTimer(timerContainer, 180);

  backBtnEarly.addEventListener("click", function () {
    stopRoomTimer();
    goToLobby();
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const answer = input.value;
    const trimmedAnswer = answer.trim();

    if (isCorrectAnswer(trimmedAnswer)) {
      stopRoomTimer();
      addLetterToPlayer(portalLetter);

      feedback.textContent =
        'Correct! The message means: "' +
        decodedMessage +
        '" You collected the letter "' +
        portalLetter +
        '" for the portal password.';
      feedback.classList.remove("error");
      feedback.classList.add("success");

      form.classList.add("hidden");
      backBtnEarly.classList.add("hidden");
      backBtn.classList.remove("hidden");
    } else {
      feedback.textContent = "Not quite. Check the shift and try again.";
      feedback.classList.add("error");
      feedback.classList.remove("success");
    }
  });

  backBtn.addEventListener("click", function () {
    stopRoomTimer();
    goToLobby();
  });
}
