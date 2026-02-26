/**
 * FIREWALL - Memory Game 🃏🃏
 *
 * The player have to get pairs of cards with the same emoji.
 * The cards are placed face down and the player can flip two cards at a time.
 * If the cards match, they stay face up.
 * If they don't match, they are flipped back face down.
 * The player wins when all pairs of cards are matched.
 */

import { stopRoomTimer } from "./28-roomTimer";
import { showPlayerStats } from "./showPlayerStats";

// ──────────────────────────────────────────────────────────────────────────────────────
// 🔥 LOAD ROOM ONE
// ──────────────────────────────────────────────────────────────────────────────────────

export function loadRoomOne(onBack: () => void) {
  // 1️⃣ skapa HTML
  renderRoom();
  renderCards();
  // 2️⃣ koppla event
  backButtonSetup(onBack);
}

// ──────────────────────────────────────────────────────────────────────────────────────
// 🗂 DATA - memory card information
// ──────────────────────────────────────────────────────────────────────────────────────

interface MemoryCard {
  emoji: string;
  flipped: boolean; // är kortet vänt (true)
  matched: boolean; // är kortet matchat (true)
}

const memoryCards: MemoryCard[] = [
  { emoji: "🪐", flipped: false, matched: false },
  { emoji: "🌙", flipped: false, matched: false },
  { emoji: "🧠", flipped: false, matched: false },
  { emoji: "👾", flipped: false, matched: false },
  { emoji: "🛸", flipped: false, matched: false },
  { emoji: "🌙", flipped: false, matched: false },
  { emoji: "🛸", flipped: false, matched: false },
  { emoji: "🌎", flipped: false, matched: false },
  { emoji: "🧩", flipped: false, matched: false },
  { emoji: "🌕", flipped: false, matched: false },
  { emoji: "🌎", flipped: false, matched: false },
  { emoji: "🧠", flipped: false, matched: false },
  { emoji: "🦋", flipped: false, matched: false },
  { emoji: "🪐", flipped: false, matched: false },
  { emoji: "🦄", flipped: false, matched: false },
  { emoji: "🧩", flipped: false, matched: false },
  { emoji: "👾", flipped: false, matched: false },
  { emoji: "🦋", flipped: false, matched: false },
  { emoji: "🌕", flipped: false, matched: false },
  { emoji: "🦄", flipped: false, matched: false },
];

// ──────────────────────────────────────────────────────────────────────────────────────
// 🖼 View - HTML Markup
// ──────────────────────────────────────────────────────────────────────────────────────

function renderRoom() {
  const firewallMarkup = document.querySelector("#firewall");
  if (!firewallMarkup) return;

  firewallMarkup.innerHTML = `
    <h2>You've entered a Firewall</h2>
    <div id="roomHeader"></div>
    <p>It is your mission to break it!</p>
    <div id="cardBoard" class="card-board"></div>
    <button id="back" class="btn-primary">Back</button>
  `;

  const roomHeader = document.querySelector<HTMLElement>("#roomHeader");
  if (!roomHeader) return;
}

function renderCards() {
  const cardsBoard = document.querySelector("#cardBoard");
  if (!cardsBoard) return;

  let cardsMarkup = "";

  for (let i = 0; i < memoryCards.length; i++) {
    // 1. Skriv button markup
    // 2. hämta cards från arrayen
    // 3. ...
    cardsMarkup += `
      <button class="card">
        ${memoryCards[i].flipped ? memoryCards[i].emoji : "🔥"}
      </button>
    `;
  }

  cardsBoard.innerHTML = cardsMarkup;

  addEventForEachCard();
}

// ──────────────────────────────────────────────────────────────────────────────────────
// 🎮 GAME LOGIC
// ──────────────────────────────────────────────────────────────────────────────────────

/* 
Simply changing the status of the card from 
❌ false ➔ ✅ true
the cards are false to begin with 
*/

// 1. click on card -> true -> flip

function handleCardClick(index: number) {
  const clickedCard = memoryCards[index];

  // 🛑 GUARDS
  if (!clickedCard) return;
  if (clickedCard.flipped) return;

  // Aktiva öppna kort (inte matchade)
  const flippedCards = memoryCards.filter(
    (card) => card.flipped === true && card.matched === false,
  );

  // avbryt om två redan är öppna
  if (flippedCards.length >= 2) return;

  // ✅ Ändra status
  clickedCard.flipped = true;

  console.log(memoryCards[index]);

  renderCards();
  checkForMatch();
}

// 2. matchar korten?

function checkForMatch() {
  // Aktiva öppna kort (inte matchade)
  const flippedCards = memoryCards.filter(
    (card) => card.flipped === true && card.matched === false,
  );

  // kör endast funktionen då två kort är öppna
  if (flippedCards.length !== 2) return;

  // hämta de två korten öppna korten i den nya arrayen
  const firstCard = flippedCards[0];
  const secondCard = flippedCards[1];

  // Change state if match
  if (firstCard.emoji === secondCard.emoji) {
    firstCard.matched = true;
    secondCard.matched = true;

    // All cards are matched -> artefact
    if (memoryCards.every((card) => card.matched === true)) {
      handleRoomComplete();
    }
  } else {
    setTimeout(function waitForIt() {
      firstCard.flipped = false;
      secondCard.flipped = false;
      renderCards();
    }, 500);
  }

  console.log("Aktiva öppna:", flippedCards.length);

  // No match -> flip back
}

function handleRoomComplete() {
  stopRoomTimer();
  /*const timeLeft = getTimeLeft();
  player.roomTimes*/

  const playerItem = localStorage.getItem("player");
  if (!playerItem) return;

  const player = JSON.parse(playerItem);

  // Om artefakt INTE finns..
  if (!player.artifacts.includes("G")) {
    // lägg till den
    player.artifacts.push("G");
    localStorage.setItem("player", JSON.stringify(player));
    showPlayerStats();
  }
}

// 4. om ja -> gör ingenting
// 5. om nej -> vänd tillbaka

// ──────────────────────────────────────────────────────────────────────────────────────
// 🎧 Hevent-lyssnare
// ──────────────────────────────────────────────────────────────────────────────────────

function addEventForEachCard() {
  // 1. Hämta element som ska ha event-lyssnare
  const cards = document.querySelectorAll<HTMLButtonElement>(".card");

  // 2. Sätt event-lyssnare på varje element,
  // 3. koppla funktion som ska triggas vid klick,
  // 4. vid klick - kom ihåg vilket kort som klickades
  cards.forEach((button, index) => {
    button.addEventListener("click", () => {
      handleCardClick(index);
    });
  });
}

function backButtonSetup(onBack: () => void) {
  // 1. Hämta element
  const backButton = document.querySelector("#back");

  // 2. Sätt event-lyssnare på elementet
  // 3. koppla indirekt en funktion som ska köras vid klick
  backButton?.addEventListener("click", onBack);
}
