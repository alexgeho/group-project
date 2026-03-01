import { goToLobby } from "./gotoLobby";
import { loadGameOverPage } from "./gameOverPage";
import { startRoomTimer, stopRoomTimer } from "./roomTimer";
import { saveRoomProgress } from "./saveRoomProgress";

const memoryContainer = document.getElementById("bug-room");
const roomNumber = 5;
const roomArtifact = 'u';

console.log(memoryContainer, " timer element in room 5");

export function loadRoomFive(): void {
  if (!memoryContainer) return;
  memoryContainer.innerHTML = `
    <h2>Welcome to Room 5 - Bug Room</h2>
    <p>Warning! A rogue process has infiltrated the system. The bug is spreading and corrupting the portal's code. You must locate the error before it's too late.<br>–<br> <br>Analyze the code carefully <br> one wrong answer and the bug wins.</p>
    <div class="code-snippet">
      <pre><code>
        function purgeBug(infectionLevel: number, firewallPower: number): string {
          let systemIntegrity = 100;

          while (infectionLevel > 0) {
            infectionLevel - firewallPower;

            if (infectionLevel <= 0) {
              return "BUG ELIMINATED";
            }

            systemIntegrity - 10;

            if (systemIntegrity <= 0) {
              return "PORTAL DESTROYED";
            }
          }

          return "SYSTEM STABLE";
        }
      </code></pre>
    </div>
    <div class="bug-options">
    <form>
      <label>
        <input type="checkbox" name="bug1" value="logic"><br>
        <span class="custom-checkbox"></span>
        <span><strong>A)</strong>
        <span class="code">infectionLevel - firewallPower;</span>
        Should be
        <span class="code">infectionLevel -= firewallPower;</span>
        </span>
      </label>

      <label>
        <input type="checkbox" name="bug2" value="comparison"><br>
        <span class="custom-checkbox"></span>
        <span><strong>B)</strong>
        <span class="code">if (infectionLevel <= 0)</span>
        Should be
        <span class="code">if (infectionLevel === 0)</span>
        </span>
      </label>

      <label>
        <input type="checkbox" name="bug3" value="logic"><br>
        <span class="custom-checkbox"></span>
        <span><strong>C)</strong>
        <span class="code">systemIntegrity - 10;</span>
        Should be
        <span class="code">systemIntegrity -= 10;</span>
        </span>
      </label>

      <label>
        <input type="checkbox" name="bug4" value="loop"><br>
        <span class="custom-checkbox"></span>
        <span><strong>D)</strong>
        <span class="code">while (infectionLevel > 0)</span>
        Should be
        <span class="code">while (infectionLevel >= 0)</span>
        </span>
      </label>

      <label>
        <input type="checkbox" name="bug5" value="parameter"><br>
        <span class="custom-checkbox"></span>
        <span><strong>E)</strong>
        All of the alternatives
        </span>
      </label>

      <button type="submit" id="submitBugFix" class="btn-primary">
        Submit
      </button>
    </form>
  </div>

    <button id="fiveBackToRooms" class="btn-primary">Back</button>
  `;

  startRoomTimer(memoryContainer, 60);
  const backButton = document.getElementById("fiveBackToRooms");
  backButton?.addEventListener("click", () => {
    stopRoomTimer();
    goToLobby();
  });

  const submitButton = document.getElementById("submitBugFix");
  submitButton?.addEventListener("click", (e) => {
    e.preventDefault();
    if (checkAnswers()) {
      const message = "Congratulations! You've successfully debugged the code and eliminated the bug. The portal is now stable, and you can proceed to the next room.";

      saveRoomProgress(roomNumber, roomArtifact);
      loadGameOverPage(message, true);

    } else {
      const message = "Incorrect answer. Please review the code and try again.";
      loadGameOverPage(message, false);
      stopRoomTimer();
    }
  });
}
function checkAnswers(): boolean {
  const bug1 = (document.querySelector('input[name="bug1"]') as HTMLInputElement).checked;
  const bug2 = (document.querySelector('input[name="bug2"]') as HTMLInputElement).checked;
  const bug3 = (document.querySelector('input[name="bug3"]') as HTMLInputElement).checked;
  const bug4 = (document.querySelector('input[name="bug4"]') as HTMLInputElement).checked;
  const bug5 = (document.querySelector('input[name="bug5"]') as HTMLInputElement).checked;

  return bug1 && bug3 && !bug2 && !bug4 && !bug5;
}