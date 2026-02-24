/**
 * FIREWALL - Memory Game
 * 👾
 * The player have to get pairs of cards with the same emoji.
 * The cards are placed face down and the player can flip two cards at a time.
 * If the cards match, they stay face up.
 * If they don't match, they are flipped back face down.
 * The player wins when all pairs of cards are matched.
 */

// 1. DATA - the cards for the memory game
// 2. STATE
// 3. VIEW - HTML markup
// 4. RENDER - inject the view into DOM
// 6. GAME LOGIC
// 5. EVENTS

// 1. Data

type MemoryCard = {
  emoji: string;
  flipped: boolean; // är kortet vänt (true)
  matched: boolean; // är kortet matchat (true)
};

const memoryCards: MemoryCard[] = [
  { emoji: "👻", flipped: false, matched: false },
  { emoji: "👻", flipped: false, matched: false },
  { emoji: "🧠", flipped: false, matched: false },
  { emoji: "🧠", flipped: false, matched: false },
  { emoji: "🌛", flipped: false, matched: false },
  { emoji: "🌛", flipped: false, matched: false },
  { emoji: "🪼", flipped: false, matched: false },
  { emoji: "🪼", flipped: false, matched: false },
  { emoji: "💄", flipped: false, matched: false },
  { emoji: "💄", flipped: false, matched: false },
  { emoji: "🦄", flipped: false, matched: false },
  { emoji: "🦄", flipped: false, matched: false },
];

// 2. state

// 3. View
function fireWallView() {
  const firewallMarkup = document.querySelector("#firewall");
  if (!firewallMarkup) return;

  firewallMarkup.innerHTML = `
    <h2>You've entered a Firewall</h2>
    <p>It is your mission to break it</p>
    <div id="cardBoard" class="card-board"></div>
    <button id="back" class=btn-primary>Back</button>
  `;

  const cardsBoard = document.querySelector("#cardBoard");

  let cardsMarkup = "";

  memoryCards[5].flipped = true;

  // data-id - för att
  for (let i = 0; i < memoryCards.length; i++) {
    cardsMarkup += `
  <button class="card" data-id="${i}">
  ${memoryCards[i].flipped ? memoryCards[i].emoji : "🔥"}
  </button>
  `;
  }

  cardsBoard!.innerHTML = cardsMarkup;
}

// 3. Render
export function loadRoomOne(onBack: () => void) {
  fireWallView(); // 1️⃣ skapa HTML
  backButtonSetup(onBack); // 2️⃣ koppla event
}

// 5. Logic

// 1. tryck på kort 1 -> kortet vänds
// 2. tryck på kort 2 -> kortet vänds
// 3. matchar korten?
// 4. om ja -> gör ingenting
// 5. om nej -> vänd tillbaka

// 4. Här sätts event-lyssnare
function backButtonSetup(onBack: () => void) {
  const backButton = document.querySelector("#back");

  backButton?.addEventListener("click", onBack);
}
