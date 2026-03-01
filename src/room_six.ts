import { goToLobby } from "./gotoLobby";
import { loadGameOverPage } from "./gameOverPage";
import { startRoomTimer, stopRoomTimer } from "./roomTimer";
import { saveRoomProgress } from "./saveRoomProgress";

const memoryContainer = document.getElementById("portal-control");
const roomNumber = 6;
const roomArtifact = 'b';

interface Portal {
  name: string;
  options: number[];
  currentPower: number;
}

const portals: Portal[] = [
  { name: "North", options: [18, 25, 40], currentPower: 0 },
  { name: "South", options: [20, 30, 45], currentPower: 0 },
  { name: "East", options: [15, 22, 28], currentPower: 0 },
  { name: "West", options: [8, 23, 35], currentPower: 0 },
];

const maxPower = 100;

export function loadRoomSix(): void {
  if (!memoryContainer) return;

  // Reset portals
  portals.forEach(portal => {
    portal.currentPower = 0;
  });

  memoryContainer.innerHTML = `
    <h2>Portal Control - Energy Distribution</h2>
    <div id="roomTimer"></div>
    <p>You must distribute exactly 100 energy units across the four portals to stabilize the system. Choose wisely.</p>
    
    <div id="portal-grid" class="portal-grid"></div>
    
    <div id="power-summary">
      <p>Total Energy: <span id="total-power">0</span> / ${maxPower}</p>
    </div>
    
    <button id="submitPowerDistribution" class="btn-primary">Submit Distribution</button>
    <button id="sixBackToRooms" class="btn-primary">Back</button>
  `;

  renderPortals();
  startRoomTimer(memoryContainer, 60);

  const backButton = document.getElementById("sixBackToRooms");
  backButton?.addEventListener("click", () => {
    stopRoomTimer();
    goToLobby();
  });

  const submitButton = document.getElementById("submitPowerDistribution");
  submitButton?.addEventListener("click", (e) => {
    e.preventDefault();
    checkPowerDistribution();
  });
}

function renderPortals(): void {
  const portalGrid = document.getElementById("portal-grid");
  if (!portalGrid) return;

  let portalMarkup = "";

  portals.forEach((portal, index) => {
    const optionsMarkup = portal.options
      .map(
        (option) =>
          `<button class="portal-option-btn" data-portal-index="${index}" data-value="${option}">
            ${option}
          </button>`
      )
      .join("");

    portalMarkup += `
      <div class="portal-card">
        <h3>${portal.name} Portal</h3>
        <div class="portal-options">
          ${optionsMarkup}
        </div>
        <p>Selected: <span class="power-display">${portal.currentPower || "—"}</span> units</p>
      </div>
    `;
  });

  portalGrid.innerHTML = portalMarkup;

  const buttons = document.querySelectorAll(".portal-option-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", handleOptionClick as EventListener);
  });
}

function handleOptionClick(event: Event): void {
  const button = event.target as HTMLButtonElement;
  const portalIndex = parseInt(button.getAttribute("data-portal-index") || "0");
  const value = parseInt(button.getAttribute("data-value") || "0");

  portals[portalIndex].currentPower = value;

  // Update button states - highlight active selection
  const portalCard = button.closest(".portal-card");
  if (portalCard) {
    const buttons = portalCard.querySelectorAll(".portal-option-btn");
    buttons.forEach((btn) => {
      btn.classList.remove("active");
    });
    button.classList.add("active");
  }

  updatePowerDisplay();
}

function updatePowerDisplay(): void {
  const totalPowerSpan = document.getElementById("total-power");
  if (!totalPowerSpan) return;

  const totalUsed = portals.reduce((sum, portal) => sum + portal.currentPower, 0);
  totalPowerSpan.textContent = totalUsed.toString();

  // Update individual displays
  const displays = document.querySelectorAll(".power-display");
  displays.forEach((display, index) => {
    display.textContent = portals[index].currentPower.toString();
  });
}

function checkPowerDistribution(): void {
  const totalUsed = portals.reduce((sum, portal) => sum + portal.currentPower, 0);

  // Check if total is exactly 100
  if (totalUsed !== maxPower) {
    const message = `Incorrect distribution. You used ${totalUsed}/${maxPower} units. You must use exactly 100 units to stabilize the system.`;
    loadGameOverPage(message, false);
    stopRoomTimer();
    return;
  }

  // Success! The puzzle is solved
  const message =
    "Perfect! The energy is perfectly balanced across all portals. The system is now stabilized and ready for launch!";
  saveRoomProgress(roomNumber, roomArtifact);
  loadGameOverPage(message, true);
}