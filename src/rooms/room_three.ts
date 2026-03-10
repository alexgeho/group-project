import { goToLobby } from "../navigation/gotoLobby";
import { showPlayerStats } from "../ui/showPlayerStats";
import { loadGameOverPage } from "../ui/gameOverPage";
import { startRoomTimer, stopRoomTimer } from "../game/roomTimer";
import { saveRoomProgress } from "../game/saveRoomProgress";

// Game data
//----------
const logicModuleContainer = document.getElementById("logic-module");
const roomNumber = 3;

const correctSolution = [
  "if",
  "(",
  "worksOnMyMachine",
  ")",
  "{",
  "deployToProduction();",
  "}",
];

const fragments = [
  "true",
  "if",
  "(",
  "noBugsFound",
  "worksOnMyMachine",
  "&&",
  "console.log('it works')",
  ")",
  "{",
  "deployToProduction();",
  "}",
];

let selectedFragments: string[] = [];

// Renders the room - builds the HTML structure
// ---------------------------------------------

function renderRoom(): void {
  if (!logicModuleContainer) return;
  logicModuleContainer.innerHTML = `
  <h2>Logic Module</h2>
  <p class="game-instructions">
The deployment gate is locked. <br>
Only correct logic will unlock it.
  </p>
  <div>
    <h3>Available Fragments</h3>
    <div id="fragments"></div>
  </div>
  <div class="solution-wrapper">
    <h3>Your Solution</h3>
    <div id="selected">> _</div>
    <div>
     <button id="checkBtn" class="btn-primary">Submit</button>
     <button id="undoBtn" class="btn-primary">Undo</button>
    </div>
   </div>
   <button id="backToRooms" class="btn-primary">Back</button>  
`;
}

// Updates what the player has selected so far
//------------------------------------------
function updateSelectedView(): void {
  const selectedContainer = document.getElementById("selected");
  if (selectedContainer) {
    if (selectedFragments.length === 0) {
      selectedContainer.textContent = "> _";
    } else {
      selectedContainer.textContent = "> " + selectedFragments.join(" ");
    }
  }
}
// Checks if the player has the correct solution
//------------------------------------------
function checkSolution(): void {
  let isCorrect = selectedFragments.length === correctSolution.length;

  for (let i = 0; i < correctSolution.length && isCorrect; i++) {
    if (selectedFragments[i] !== correctSolution[i]) {
      isCorrect = false;
    }
  }
  if (isCorrect) {
    saveRoomProgress(roomNumber, "B");
    showPlayerStats();

    const message =
      "You deployed without testing... or did you? The logic holds. The system stabilizes. The letter B is yours.";
    loadGameOverPage(message, true);
  } else {
    stopRoomTimer();

    const message =
      "Logic Error: The condition doesn´t hold. Production refuses to cooperate. Try again!";
    loadGameOverPage(message, false);
  }
}

// Adds the fragment buttons to the DOM
// ---------------------------------------
function addFragmentListeners(): void {
  const fragmentsContainer = document.getElementById("fragments");
  if (!fragmentsContainer) return;

  fragments.forEach((fragment) => {
    const button = document.createElement("button");
    button.textContent = fragment;
    button.dataset.fragment = fragment;
    fragmentsContainer.appendChild(button);

    button.addEventListener("click", () => {
      if (!selectedFragments.includes(fragment)) {
        selectedFragments.push(fragment);
        button.style.display = "none";
        updateSelectedView();
      }
    });
  });
}

// Adds listeners to the undo, check and back buttons
// -------------------------------------------------------
function addButtonListeners(): void {
  const backButton = document.getElementById("backToRooms");
  backButton?.addEventListener("click", () => {
    stopRoomTimer();
    goToLobby();
  });

  const undoBtn = document.getElementById("undoBtn");
  undoBtn?.addEventListener("click", () => {
    const lastFragment = selectedFragments.pop();
    if (lastFragment) {
      const buttonToRestore = document.querySelector(
        `button[data-fragment="${lastFragment}"]`,
      ) as HTMLButtonElement;
      if (buttonToRestore) {
        buttonToRestore.style.display = "";
      }
      updateSelectedView();
    }
  });

  const checkBtn = document.getElementById("checkBtn");
  checkBtn?.addEventListener("click", checkSolution);
}

// Starts the room
//----------------
export function loadRoomThree(): void {
  selectedFragments = [];
  if (!logicModuleContainer) return;
  renderRoom();
  startRoomTimer(logicModuleContainer, 60);
  fragments.sort(() => Math.random() - 0.5);
  addFragmentListeners();
  addButtonListeners();
}
