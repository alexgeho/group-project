import { goToLobby } from "./gotoLobby";
import { loadGameOverPage } from "./gameOverPage";
import { startRoomTimer, stopRoomTimer } from "./roomTimer";
import { saveRoomProgress } from "./saveRoomProgress";

const portalContainer = document.getElementById("portal-control");
const roomNumber = 6;
const roomArtifact = "U";

interface Portal {
  name: string;
  options: number[];
  currentPower: number;
}

interface PortalConfig {
  name: string;
  correctValue: number;
  otherOptions: number[];
}

const portalConfigs: PortalConfig[] = [
  {
    name: "North",
    correctValue: 25,
    otherOptions: [10, 15, 18, 20, 30, 35, 40, 45],
  },
  {
    name: "South",
    correctValue: 30,
    otherOptions: [15, 20, 25, 35, 40, 45, 50],
  },
  {
    name: "East",
    correctValue: 22,
    otherOptions: [10, 15, 18, 25, 28, 32, 35],
  },
  { name: "West", correctValue: 23, otherOptions: [8, 12, 18, 28, 35, 40, 50] },
];

let portals: Portal[] = [];

const maxPower = 100;

// Randomly generate the portal options each time the room is loaded
function generateRandomPortals(): void {
  portals = portalConfigs.map((config) => {
    // Pick 2 random other values from otherOptions
    const shuffled = [...config.otherOptions].sort(() => Math.random() - 0.5);
    const options = [config.correctValue, shuffled[0], shuffled[1]];

    // Shuffle so the correct value is not always in the same position
    options.sort(() => Math.random() - 0.5);
    return {
      name: config.name,
      options,
      currentPower: 0,
    };
  });
}

export function loadRoomSix(): void {
  if (!portalContainer) return;

  generateRandomPortals();
  portals.forEach((portal) => (portal.currentPower = 0));

  portalContainer.innerHTML = `
    <h2>Portal Control</h2>
    <p>You must distribute exactly 100 energy units across the four portals to stabilize the system. Choose wisely.</p>
    
    <div class="portal-grid"></div>
    <div class="power-summary">
      <p>Total Energy: ??? / ${maxPower}</p>
    </div>

    <button id="submitPowerDistribution" class="btn-primary">Submit Distribution</button>
    <button id="sixBackToRooms" class="btn-primary">Back</button>
  `;

  renderPortals();
  startRoomTimer(portalContainer, 60);

  document.getElementById("sixBackToRooms")?.addEventListener("click", () => {
    stopRoomTimer();
    goToLobby();
  });

  document
    .getElementById("submitPowerDistribution")
    ?.addEventListener("click", (e) => {
      e.preventDefault();
      checkPowerDistribution();
    });
}

function renderPortals(): void {
  const portalGrid = document.querySelector(".portal-grid");
  if (!portalGrid) return;

  portalGrid.innerHTML = portals
    .map(
      (portal, index) => `
      <div class="portal-card">
        <h3>${portal.name} Portal</h3>
        <div class="portal-options">
          ${portal.options
            .map(
              (option) =>
                `<button class="portal-option-btn" data-portal-index="${index}" data-value="${option}">
                  ${option}
                </button>`,
            )
            .join("")}
        </div>
      </div>
    `,
    )
    .join("");

  document.querySelectorAll(".portal-option-btn").forEach((button) => {
    button.addEventListener("click", handleOptionClick as EventListener);
  });
}

function handleOptionClick(event: Event): void {
  const button = event.target as HTMLButtonElement;
  const index = parseInt(button.getAttribute("data-portal-index") || "0");
  const value = parseInt(button.getAttribute("data-value") || "0");

  portals[index].currentPower = value;

  // Update active button state
  button
    .closest(".portal-card")
    ?.querySelectorAll(".portal-option-btn")
    .forEach((btn) => {
      btn.classList.remove("active");
    });
  button.classList.add("active");
}

function checkPowerDistribution(): void {
  const totalUsed = portals.reduce(
    (sum, portal) => sum + portal.currentPower,
    0,
  );

  // Check if total is exactly 100
  if (totalUsed !== maxPower) {
    const message = `Incorrect distribution. You used ${totalUsed}/${maxPower} units. You must use exactly 100 units to stabilize the system.`;
    loadGameOverPage(message, false);
    stopRoomTimer();
    return;
  }

  // Success: puzzle solved
  const message =
    "Perfect! The energy is perfectly balanced across all portals. The system is now stabilized and ready for launch!";
  saveRoomProgress(roomNumber, roomArtifact);
  loadGameOverPage(message, true);
}
