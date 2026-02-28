import { goToLobby } from "./gotoLobby";
import { getPlayer } from "./fetchPlayerFromLs";
import { showPlayerStats } from "./showPlayerStats";
import { loadGameOverPage } from "./gameOverPage";
import { startRoomTimer, stopRoomTimer } from "./28-roomTimer";

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

let selectedFragments: string[] = [];

export function loadRoomThree(): void {
selectedFragments = [];
console.log("Room Three loaded");
if (!memoryContainer) return;

memoryContainer.innerHTML = `
    <p>Welcome to Room Three – Logic Module</p>
    <div>
    <h3>Available Fragments</h3>
    <div id="fragments"></div>
    </div>
    <div class="solution-wrapper">
    <h3>Your Solution</h3>
    <div id="selected"></div>
    <div class="btn-group">
    <button id="checkBtn" class="btn-primary">Check Solution</button>
    <button id="undoBtn" class="btn-primary">Undo</button>
    </div>
    </div>
    <button id="backToRooms" class="btn-primary">Back</button>
  `;

    startRoomTimer(memoryContainer, 60);


function updateSelectedView() {
const selectedContainer = document.getElementById("selected");
if (selectedContainer) {
selectedContainer.textContent = selectedFragments.join(" ");
    }
  }

const fragmentsContainer = document.getElementById("fragments");
const buttonElements: HTMLButtonElement[] = [];
if (fragmentsContainer) {
for (let i = 0; i < fragments.length; i++) {
const fragment = fragments[i];
const button = document.createElement("button");
button.textContent = fragment;
button.dataset.fragment = fragment;
buttonElements.push(button);
fragmentsContainer.appendChild(button);
button.addEventListener("click", () => {
if (!selectedFragments.includes(fragment)) {
selectedFragments.push(fragment);
button.style.display = "none";
updateSelectedView();
  }
});
}
  }
  
const backButton = document.getElementById("backToRooms");
backButton?.addEventListener("click", goToLobby);
const undoBtn = document.getElementById("undoBtn");
undoBtn?.addEventListener("click", () => {
const lastFragment = selectedFragments.pop();
if (lastFragment) {
const buttonToRestore = buttonElements.find(
btn => btn.dataset.fragment === lastFragment
        );
if (buttonToRestore) {
buttonToRestore.style.display = "";
        }
updateSelectedView();
    }
  }
)
const checkBtn = document.getElementById("checkBtn");
checkBtn?.addEventListener("click", () => {
  const isCorrect = JSON.stringify(selectedFragments) === JSON.stringify(correctSolution); 
  
  if (isCorrect) {
    stopRoomTimer();
  const player = getPlayer();
  
  if (player) {
    
    if (!player.artifacts.includes("t")) player.artifacts.push("t");
    if (!player.roomsCompleted.includes(roomNumber)) player.roomsCompleted.push(roomNumber);

    // SPARA - detta gör att rutan kan bli grön senare
    localStorage.setItem("player", JSON.stringify(player));
    
    showPlayerStats(); 
  }
    const message = "You deployed without testing… or did you? The logic holds. The system stabilizes. The letter T is yours."
    
    loadGameOverPage(message, true); 

    } else {
      stopRoomTimer();

    const lossMessage = "Logic Error: The condition doesn’t hold. Production refuses to cooperate. Try again!";
  
    loadGameOverPage(lossMessage, false);
  }
  }
)};
