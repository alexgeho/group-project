import { goToLobby } from "./gotoLobby";
import { getPlayer } from "./fetchPlayerFromLs";
import { showPlayerStats } from "./showPlayerStats";
import { loadGameOverPage } from "./gameOverPage";
import { startRoomTimer, stopRoomTimer } from "./roomTimer";

// Speldata
//----------
const memoryContainer = document.getElementById("logic-module");
const roomNumber = 3;

const correctSolution = [
  "if",
  "(",
  "worksOnMyMachine",
  "&&",
  "noBugsFound",
  ")",
  "{",
  "deployToProduction();",
  "}"
]

const fragments = [
  "while",
  "if",
  "(",
  "noBugsFound",
  "true",
  "worksOnMyMachine",
  "&&",
  "console.log('it works')",
  ")",
  "{",
  "deployToProduction();",
  "false",
  "||",
  "}"
]

let selectedFragments: string [] = [];

// Renderar rummet - bygger upp HTML-strukturen
// ---------------------------------------------

function renderRoom(): void {
  if(!memoryContainer) return;
  memoryContainer.innerHTML = `
  <h2>Welcome to Room Three – Logic Module</h2>
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
    <div id="selected"></div>
    <div>
     <button id="checkBtn" class="btn-primary">Submit</button>
     <button id="undoBtn" class="btn-primary">Undo</button>
    </div>
   </div>
   <button id="backToRooms" class="btn-primary">Back</button>  
`;
}

// Uppdaterar vad spelaren har valt hittills
//------------------------------------------
function updateSelectedView(): void {
  const selectedContainer = document.getElementById("selected");
  if (selectedContainer) {
    selectedContainer.textContent = selectedFragments.join(" ");
  }
}

// Kontrollerar om spelaren har rätt lösning
//------------------------------------------
function checkSolution(): void {
  const isCorrect = JSON.stringify(selectedFragments) === JSON.stringify(correctSolution);

  stopRoomTimer();
  if (isCorrect) {
    const player = getPlayer ();
    if (player) {
      if (!player.artifacts.includes("t")) player.artifacts.push("t");
      if (!player.roomsCompleted.includes(roomNumber)) player.roomsCompleted.push(roomNumber);
      localStorage.setItem("player", JSON.stringify(player));
      showPlayerStats();
    }

    const message = "You deployed without testing... or did you? The logic holds. The system stabilizes. The letter T is yours.";
    loadGameOverPage(message, true);
  } else {
    const message = "Logic Error: The condition doesn´t hold. Production refuses to cooperate. Try again!";
    loadGameOverPage(message, false);
  }
  }

  // Lägger till fragment-knapparna i DOM:en
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
      })
    })
  }

  // Lägger till lyssnare på undo, check och back-knapparna
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
        const buttonToRestore = document.querySelector(`button[data-fragment="${lastFragment}"]`) as HTMLButtonElement;
        if (buttonToRestore) {
          buttonToRestore.style.display = "";
        }
        updateSelectedView();
      }
    });

    const checkBtn = document.getElementById("checkBtn");
    checkBtn?.addEventListener("click", checkSolution);
  }

  // Startar rummer 
  //----------------
  export function loadRoomThree(): void {
    selectedFragments = [];
    if (!memoryContainer) return;
    renderRoom();
    startRoomTimer( memoryContainer, 60);
    addFragmentListeners();
    addButtonListeners();
  }