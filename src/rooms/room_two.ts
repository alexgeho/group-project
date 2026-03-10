import { startRoomTimer, stopRoomTimer } from "../game/roomTimer";
import { goToLobby } from "../navigation/gotoLobby";
import { loadGameOverPage } from "../ui/gameOverPage";
import { saveRoomProgress } from "../game/saveRoomProgress";

const dataBaseContainer = document.getElementById("database");
const roomNumber = 2;
const roomArtifact = "T";

export function loadRoomTwo(): void {
  initBrokenDatabase();

  /* Render room layout and inject HTML structure */
  if (!dataBaseContainer) return;

  dataBaseContainer.innerHTML = `
    <h2>The Database</h2>
    <p>Restore the secret key: <strong>M A R S</strong></p>

    <div id="storage-view"></div>

    <hr>

    <h3>Add / Update</h3>
    <input id="add-key" placeholder="Key" />
    <input id="add-value" placeholder="Value" />
    <button id="add-btn" class="btn-primary">Save</button>

    <h3>Remove</h3>
    <input id="remove-key" placeholder="Key" />
    <button id="remove-btn" class="btn-primary">Delete</button>

    <hr>

    <button id="check-btn" class="btn-primary">Check Database</button>
    <button id="reset-btn" class="btn-primary">Reset Room</button>
    <button id="back-to-lobby-btn" class="btn-primary">Back To Lobby</button>

  `;

  /*  */

  startRoomTimer(dataBaseContainer, 240);

  // Render current localStorage state in the UI
  renderStorageView();

  // Get room control buttons from DOM
  const addBtn = document.getElementById("add-btn");
  const removeBtn = document.getElementById("remove-btn");
  const checkBtn = document.getElementById("check-btn");
  const resetBtn = document.getElementById("reset-btn");
  const toLobbyBtn = document.getElementById("back-to-lobby-btn");

  // Handle navigation back to lobby
  toLobbyBtn?.addEventListener("click", () => {
    stopRoomTimer();
    goToLobby();
  });


  /* Attach event listeners to room action buttons */

  if (addBtn) addBtn.addEventListener("click", addOrUpdateItem);

  if (removeBtn) removeBtn.addEventListener("click", removeItem);

  if (checkBtn) {
    checkBtn.addEventListener("click", checkDatabase)
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      initBrokenDatabase();
      renderStorageView();
    });
  }


  /*  */
}
/* END function loadRoomTwo() */

/* Reset storage and initialize corrupted database state for the puzzle
 */
function initBrokenDatabase(): void {
  localStorage.removeItem("key1");
  localStorage.removeItem("key2");
  localStorage.removeItem("key3");
  localStorage.removeItem("key4");
  localStorage.removeItem("temp");
  localStorage.removeItem("debug");

  localStorage.setItem("key1", "M");
  localStorage.setItem("key3", "R");
  localStorage.setItem("temp", "123");
  localStorage.setItem("debug", "true");
}
/*  */

/* Display puzzle-related localStorage entries inside the storage view container
 */
function renderStorageView(): void {
  const container = document.getElementById("storage-view");
  if (!container) return;

  container.innerHTML = "";

  const puzzleKeys = ["key1", "key2", "key3", "key4", "temp", "debug"];

  for (let i = 0; i < puzzleKeys.length; i++) {
    const value = localStorage.getItem(puzzleKeys[i]);
    if (value !== null) {
      const row = document.createElement("div");
      row.textContent = puzzleKeys[i] + ": " + value;
      container.appendChild(row);
    }
  }
}
/*  */

/*  Add or update key-value pair in localStorage and refresh UI */
function addOrUpdateItem(): void {
  const keyInput = document.getElementById("add-key") as HTMLInputElement;
  const valueInput = document.getElementById("add-value") as HTMLInputElement;

  if (!keyInput.value || !valueInput.value) return;

  localStorage.setItem(keyInput.value, valueInput.value);

  keyInput.value = "";
  valueInput.value = "";

  renderStorageView();
}
/*  */

/* Remove specified key from localStorage and refresh UI */
function removeItem(): void {
  const keyInput = document.getElementById("remove-key") as HTMLInputElement;
  if (!keyInput.value) return;

  localStorage.removeItem(keyInput.value);

  keyInput.value = "";

  renderStorageView();
}
/*  */

/* Validate database configuration and check puzzle completion */
function checkDatabase(): boolean {
  const k1 = localStorage.getItem("key1");
  const k2 = localStorage.getItem("key2");
  const k3 = localStorage.getItem("key3");
  const k4 = localStorage.getItem("key4");

  if (!k1 || !k2 || !k3 || !k4) {
    loadGameOverPage("Database still corrupted.", false);
    return false;
  }

  if (
    localStorage.getItem("temp") !== null ||
    localStorage.getItem("debug") !== null
  ) {
    loadGameOverPage("Remove corrupted entries.", false);
    return false;
  }

  if (k1 === "M" && k2 === "A" && k3 === "R" && k4 === "S") {
    localStorage.setItem("T", "true");

    const message = "ACCESS GRANTED\nArtifact 'T' collected!";
    saveRoomProgress(roomNumber, roomArtifact);
    loadGameOverPage(message, true);

    return true;
  }

  loadGameOverPage("Incorrect configuration.", false);
  return false;
}
/*  */
