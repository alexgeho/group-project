/**
 * FIREWALL - Memory Game 🃏🃏
 *
 * The player have to get pairs of cards with the same emoji.
 * The cards are placed face down and the player can flip two cards at a time.
 * If the cards match, they stay face up.
 * If they don't match, they are flipped back face down.
 * The player wins when all pairs of cards are matched.
 */

import { goToLobby } from "./gotoLobby";
import { startRoomTimer, stopRoomTimer } from "./roomTimer";

const firewallContainer = document.getElementById("firewall");

export function loadRoomOne() {
  if (!firewallContainer) return;

  renderFirewallRoom();

  const timer = document.getElementById("timerContainer");
  if (!timer) return;
  startRoomTimer(timer, 60);
}

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

// 🖼 View - HTML Markup
// ──────────────────────────────────────────────────────────────────────────────────────

function renderFirewallRoom() {
  if (!firewallContainer) return;

  firewallContainer.innerHTML = `
    <div class="header">
      <h2>You've entered a Firewall</h2>
      <p>It is your mission to break it!</p>
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

// 🎮 GAME LOGIC
// ──────────────────────────────────────────────────────────────────────────────────────

function handleCardClick(id: number) {
  const clickedCard = memoryCards.find((card) => card.id === id);
  if (!clickedCard) return;

  clickedCard.flipped = true;

  renderCards();
  checkForMatch();
}

function getUnmatchedFlippedCards() {
  return memoryCards.filter(
    (card) => card.flipped && !card.matched, // { flipped: true, matched: false }
  );
}

function checkForMatch() {
  const flippedCards = getUnmatchedFlippedCards();

  // When two cards are open, check if they match
  if (flippedCards.length === 2) {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.emoji === secondCard.emoji) {
      firstCard.matched = true;
      secondCard.matched = true;
    } else {
      // Allow player to see both cards before flipping them back
      setTimeout(() => {
        firstCard.flipped = false;
        secondCard.flipped = false;
        renderCards();
      }, 500);
    }
  }
}

// 🎧 event-listeners
// ──────────────────────────────────────────────────────────────────────────────────────

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
