/**
 * FIREWALL - Memory Game 🃏🃏
 *
 * The player has to get pairs of cards with the same emoji.
 * The cards are placed face down and the player can flip two cards at a time.
 * If the cards match, they stay face up.
 * If they don't match, they are flipped back face down.
 * The player wins when all pairs of cards are matched.
 */

import { goToLobby } from "./gotoLobby";
import { startRoomTimer, stopRoomTimer } from "./roomTimer";
import { loadGameOverPage } from "./gameOverPage";
import { saveRoomProgress } from "./saveRoomProgress";
import { showPlayerStats } from "./showPlayerStats";

export function loadRoomOne() {
  if (!firewallContainer) return;
  renderFirewallContainer();

  const timerContainer = document.getElementById("timerContainer");
  if (!timerContainer) return;

  startRoomTimer(timerContainer, 120);
}

const firewallContainer = document.getElementById("firewall");
const roomNumber = 1;
const roomArtifact = "I";

interface MemoryCard {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
}

const memoryCards: MemoryCard[] = [
  { id: 1, emoji: "🪐", flipped: false, matched: false },
  { id: 2, emoji: "🌙", flipped: false, matched: false },
  { id: 3, emoji: "🧠", flipped: false, matched: false },
  { id: 4, emoji: "👾", flipped: false, matched: false },
  { id: 5, emoji: "🛸", flipped: false, matched: false },
  { id: 6, emoji: "🌙", flipped: false, matched: false },
  { id: 7, emoji: "🛸", flipped: false, matched: false },
  { id: 8, emoji: "🌎", flipped: false, matched: false },
  { id: 9, emoji: "🧩", flipped: false, matched: false },
  { id: 10, emoji: "🌕", flipped: false, matched: false },
  { id: 11, emoji: "🌎", flipped: false, matched: false },
  { id: 12, emoji: "🧠", flipped: false, matched: false },
  { id: 13, emoji: "🦋", flipped: false, matched: false },
  { id: 14, emoji: "🪐", flipped: false, matched: false },
  { id: 15, emoji: "🦄", flipped: false, matched: false },
  { id: 16, emoji: "🧩", flipped: false, matched: false },
  { id: 17, emoji: "👾", flipped: false, matched: false },
  { id: 18, emoji: "🦋", flipped: false, matched: false },
  { id: 19, emoji: "🌕", flipped: false, matched: false },
  { id: 20, emoji: "🦄", flipped: false, matched: false },
];

function renderFirewallContainer() {
  if (!firewallContainer) return;

  firewallContainer.innerHTML = `
    <div class="header">
      <h2>The Firewall</h2>
      <p>Match all pairs of cards to break the firewall</p>
      <p>and collect the artifact needed for the password.</p> 
      <p>Be quick — time is running out!</p>
    </div>

    <div class="game">
      <div id="timerContainer" class="timer-container"></div>
      <div id="memoryContainer" class="memory-container"></div>
    </div>

    <button id="back" class="btn-primary">Back</button>
  `;

  addEventListenerForBackButton();
  renderCards();
}

function renderCards() {
  const cards = document.querySelector("#memoryContainer");
  if (!cards) return;

  let html = "";

  memoryCards.forEach((card) => {
    html += `
    <button class="card" data-id="${card.id}">
      ${card.flipped ? card.emoji : "🔥"}
    </button>`;
  });

  cards.innerHTML = html;

  addEventListenerForEachCard();
}

function handleCardClick(id: number) {
  const clickedCard = memoryCards.find((card) => card.id === id);

  if (!clickedCard) return;
  if (clickedCard.flipped) return; // Already open
  if (clickedCard.matched) return; // Already matched

  const flippedCards = getUnmatchedFlippedCards();
  if (flippedCards.length >= 2) return; // Two cards open

  clickedCard.flipped = true;

  renderCards();
  checkForMatch();
}

function getUnmatchedFlippedCards() {
  return memoryCards.filter((card) => card.flipped && !card.matched);
}

function checkForMatch() {
  const flippedCards = getUnmatchedFlippedCards();
  if (flippedCards.length !== 2) return; // Require exactly two cards

  const firstCard = flippedCards[0];
  const secondCard = flippedCards[1];

  // ✅ Match
  if (firstCard.emoji === secondCard.emoji) {
    firstCard.matched = true;
    secondCard.matched = true;

    renderCards();

    // All matched?
    if (memoryCards.every((card) => card.matched)) {
      handleGameComplete();
    }

    return;
  }

  // ❌ No match
  setTimeout(() => {
    firstCard.flipped = false;
    secondCard.flipped = false;

    renderCards();
  }, 500); // Briefly show both cards
}

function handleGameComplete() {
  console.log("GAME COMPLETE");
  stopRoomTimer();
  saveRoomProgress(roomNumber, roomArtifact);
  console.log(
    "About to save room number:",
    roomNumber,
    "room artefact:",
    roomArtifact,
  );
  showPlayerStats();

  const message = "You broke the firewall and collected artifact 'I'.";
  loadGameOverPage(message, true);
}

function addEventListenerForEachCard() {
  const cards = document.querySelectorAll<HTMLButtonElement>(".card");

  cards.forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);
      handleCardClick(id);
    });
  });
}

function addEventListenerForBackButton() {
  const backButton = document.querySelector<HTMLButtonElement>("#back");

  backButton?.addEventListener("click", goToLobby);
}
