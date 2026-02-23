/**
 * FIREWALL - Memory Game
 *
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
  { emoji: "🍎", matched: false },
  { emoji: "🍎", matched: false },
];

memoryCards;

// 2. View
const gameBoard = document.querySelector("#firewall");

gameBoard!.innerHTML = `
    <p>Welcome to Room One Firewall :)</p>
    <button id="back">Back</button>
  `;

// 3. Render
export function loadRoomOne(onBack: () => void) {
  backButtonSetup(onBack);
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
