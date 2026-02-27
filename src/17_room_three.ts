import { goToLobby } from "./gotoLobby";
import type { IPlayer } from "./models/Player";
import { showPlayerStats } from "./showPlayerStats";

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

function getCurrentPlayer(): IPlayer | null {
const playerData = localStorage.getItem('player');
if (!playerData) return null;
return JSON.parse(playerData);
}

function savePlayer(player: IPlayer): void {
localStorage.setItem('player', JSON.stringify(player));
}

export function loadRoomThree(): void {
selectedFragments = [];
console.log("Room Three loaded");
if (!memoryContainer) return;

function updateSelectedView() {
const selectedContainer = document.getElementById("selected");
if (selectedContainer) {
selectedContainer.textContent = selectedFragments.join(" ");
    }
  }

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
    <button id="undoBtn">Undo</button>
    <button id="checkBtn">Check Solution</button>
    </div>
    </div>
    <button id="backToRooms">Back</button>
  `;

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
const player = getCurrentPlayer();
console.log("player:", player);

if (player) {
if (!player.artifacts.includes("t")) {
  player.artifacts.push("t");
}

if (!player.roomsCompleted.includes(roomNumber)) {
  player.roomsCompleted.push(roomNumber);
}

  savePlayer(player);
  showPlayerStats();
  console.log("Updating header");
}
alert("Correct! You solved the room! 🎉");
  } else {
alert("Wrong solution, try again!");
  }
}
)
}