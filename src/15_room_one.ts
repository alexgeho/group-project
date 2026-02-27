/**
 * FIREWALL - Memory Game 🃏🃏
 *
 * The player have to get pairs of cards with the same emoji.
 * The cards are placed face down and the player can flip two cards at a time.
 * If the cards match, they stay face up.
 * If they don't match, they are flipped back face down.
 * The player wins when all pairs of cards are matched.
 */

// receive a callback (onBack = goToLobby) from outside
export function loadRoomOne(onBack: () => void) {
  interface MemoryCard {
    emoji: string;
    flipped: boolean;
    matched: boolean;
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

  // 🖼 View - HTML Markup
  // ──────────────────────────────────────────────────────────────────────────────────────

  function renderRoom() {
    const firewallMarkup = document.querySelector("#firewall");
    if (!firewallMarkup) return;

    firewallMarkup.innerHTML = `
    <h2>You've entered a Firewall</h2>
    <p>It is your mission to break it!</p>
    <div id="roomTimer"></div>
    <div id="cardBoard" class="card-board"></div>
    <button id="back" class="btn-primary">Back</button>
  `;
  }

  function renderCards() {
    const cards = document.querySelector("#cardBoard");
    if (!cards) return;

    let cardsMarkup = "";

    for (let i = 0; i < memoryCards.length; i++) {
      cardsMarkup += `
      <button class="card">
        ${memoryCards[i].flipped ? memoryCards[i].emoji : "🔥"}
      </button>
    `;
    }

    cards.innerHTML = cardsMarkup;

    addEventListenerForEachCard();
  }

  // 🎮 GAME LOGIC
  // ──────────────────────────────────────────────────────────────────────────────────────

  function handleCardClick(index: number) {
    const clickedCard = memoryCards[index];
    if (!clickedCard) return;

    if (clickedCard.flipped) return;

    const flippedCards = memoryCards.filter(
      (card) => card.flipped === true && card.matched === false,
    );

    if (flippedCards.length >= 2) return;

    clickedCard.flipped = true;

    console.log(memoryCards[index]);

    renderCards();
    checkForMatch();
  }

  function checkForMatch() {
    const flippedCards = memoryCards.filter(
      (card) => card.flipped === true && card.matched === false,
    );

    if (flippedCards.length !== 2) return;

    const firstCard = flippedCards[0];
    const secondCard = flippedCards[1];

    if (firstCard.emoji === secondCard.emoji) {
      firstCard.matched = true;
      secondCard.matched = true;
    } else {
      setTimeout(function waitForIt() {
        firstCard.flipped = false;
        secondCard.flipped = false;
        renderCards();
      }, 500);
    }
  }

  // 🎧 event-listeners
  // ──────────────────────────────────────────────────────────────────────────────────────

  function addEventListenerForEachCard() {
    const cards = document.querySelectorAll<HTMLButtonElement>(".card");

    cards.forEach((button, index) => {
      button.addEventListener("click", () => {
        handleCardClick(index);
      });
    });
  }

  // receive a callback passed from loadRoomOne
  function addEventListenerForBackButton(onBack: () => void) {
    const backButton = document.querySelector("#back");

    // attach the callback to run on click
    backButton?.addEventListener("click", onBack);
  }

  //
  // ──────────────────────────────────────────────────────────────────────────────────────

  renderRoom();
  renderCards();
  addEventListenerForBackButton(onBack);
}
