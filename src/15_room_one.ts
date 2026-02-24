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
// 2. VIEW - HTML markup
// 3. RENDER - inject the wiew into doom
// 4. EVENTS
// 5. GAME LOGIC

// 1. Data
const memoryCards = [
  { id: 1, emoji: "👻", matched: false },
  { id: 2, emoji: "👻", matched: false },
  { id: 3, emoji: "🧠", matched: false },
  { id: 4, emoji: "🧠", matched: false },
  { id: 5, emoji: "🌛", matched: false },
  { id: 6, emoji: "🌛", matched: false },
  { id: 7, emoji: "🪼", matched: false },
  { id: 8, emoji: "🪼", matched: false },
  { id: 9, emoji: "💄", matched: false },
  { id: 10, emoji: "💄", matched: false },
  { id: 11, emoji: "🦄", matched: false },
  { id: 12, emoji: "🦄", matched: false },
];

memoryCards;

// 2. View
function fireWallView() {
  const gameBoard = document.querySelector("#firewall");
  const gameCard = document.querySelector("#firewall");

  gameBoard!.innerHTML = `
    <p>Welcome to Room One Firewall :)</p>
    <button id="back">Back</button>
  `;

  gameCard!.innerHTML += `
  <p>🔥</p>`;
}

// 3. Render
export function loadRoomOne(onBack: () => void) {
  backButtonSetup(onBack);
  fireWallView();
}

// 4. Här sätts event-lyssnare
function backButtonSetup(onBack: () => void) {
  const backButton = document.querySelector("#back");

  backButton?.addEventListener("click", onBack);
}

// 5. Logic
// false -> not matched
// true -> matched
// if the card is false -> turn
// if the card is true -> stay
