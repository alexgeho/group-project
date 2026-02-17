const memoryContainer: HTMLElement | null =
  document.getElementById("room-one-content");

interface MemoryCard {
  id: number;
  value: string; // emoji
  isFlipped: boolean;
  isMatched: boolean;
}

const emojis = ["🌸", "🗝", "💎", "🔮"];

const cards: MemoryCard[] = [...emojis, ...emojis].map((emoji, index) => ({
  id: index,
  value: emoji,
  isFlipped: false,
  isMatched: false,
}));

// Shuffle the cards
function shuffleCards(cards: MemoryCard[]): MemoryCard[] {
  return cards.sort(() => Math.random() - 0.5);
}

// Render the cards
function renderCards(cards: MemoryCard[]): void {
  if (!memoryContainer) return;

  memoryContainer.innerHTML = "";

  cards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.textContent =
      card.isFlipped || card.isMatched ? card.value : "❓";

    cardElement.dataset.id = card.id.toString();

    memoryContainer.appendChild(cardElement);
  });
}

// 🗝 Använd denna funktion för att starta rummet
export function loadRoomOne(): void {
  shuffleCards(cards);
  renderCards(cards);
}
