/**
 * FIREWALL - Memory Game
 *
 * The player have to get pairs of cards with the same emoji.
 * The cards are placed face down and the player can flip two cards at a time.
 * If the cards match, they stay face up.
 * If they don't match, they are flipped back face down.
 * The player wins when all pairs of cards are matched.
 */

// Skickar vidare parametern från backButtonSetup()
export function loadRoomOne(onBack: () => void) {
  backButtonSetup(onBack);
}

function backButtonSetup(onBack: () => void) {
  const backButton = document.querySelector("back");

  backButton?.addEventListener("click", onBack);
}

const gameBoard = document.querySelector("#firewall");

gameBoard!.innerHTML = `
    <p>Welcome to Room One Firewall :)</p>
    <button id="backToRooms">Back</button>
  `;
