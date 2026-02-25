/**
 * FIREWALL - Memory Game 🃏🃏
 *
 * The player have to get pairs of cards with the same emoji.
 * The cards are placed face down and the player can flip two cards at a time.
 * If the cards match, they stay face up.
 * If they don't match, they are flipped back face down.
 * The player wins when all pairs of cards are matched.
 */

// ──────────────────────────────────────────────────────────────────────────────────────
// 🔥 LOAD ROOM ONE
// ──────────────────────────────────────────────────────────────────────────────────────

export function loadRoomOne(onBack: () => void) {
  // 1️⃣ skapa HTML
  fireWallView();
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
  { emoji: "👾", flipped: false, matched: false },
  { emoji: "🪐", flipped: false, matched: false },
  { emoji: "🌎", flipped: false, matched: false },
  { emoji: "🧠", flipped: false, matched: false },
];

// ──────────────────────────────────────────────────────────────────────────────────────
// 🖼 View - HTML Markup
// ──────────────────────────────────────────────────────────────────────────────────────

function fireWallView() {
  const firewallMarkup = document.querySelector("#firewall");
  if (!firewallMarkup) return;

  firewallMarkup.innerHTML = `
    <h2>You've entered a Firewall</h2>
    <p>It is your mission to break it!</p>
    <div id="cardBoard" class="card-board"></div>
    <button id="back" class="btn-primary">Back</button>
  `;
}

function renderCards() {
  const cardsBoard = document.querySelector("#cardBoard");
  if (!cardsBoard) return;

  let cardsMarkup = "";

  for (let i = 0; i < memoryCards.length; i++) {
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

// ❌ false →
// ✅ true → the card is flipped

// 1. tryck på kort -> kortet vänds

function flippCardOnClick(index: number) {
  // 1. Ta reda på vilket kort som klickades baserat på index
  const clickedCard = memoryCards[index];
  console.log(clickedCard);
  // 2. Ändra status vid klick
  clickedCard.flipped = true;
  // 3. Rendera korten igen baserat på den nya statusen
  renderCards();
}

// 3. matchar korten?
// 4. om ja -> gör ingenting
// 5. om nej -> vänd tillbaka

// ──────────────────────────────────────────────────────────────────────────────────────
// 🎧 Här sätts event-lyssnare
// ──────────────────────────────────────────────────────────────────────────────────────

function addEventForEachCard() {
  // 1. Hämta element som ska ha event-lyssnare
  const cards = document.querySelectorAll<HTMLButtonElement>(".card");

  // 2. Sätt event-lyssnare på varje element,
  // 3. koppla funktion som ska triggas vid klick,
  // 4. vid klick - kom ihåg vilket kort som klickades
  cards.forEach((button, index) => {
    button.addEventListener("click", () => {
      flippCardOnClick(index);
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
