export function displayWelcomeMessage(): void {
  const storedPlayer = localStorage.getItem("player");
  const playNameSpan = document.getElementById(
    "player-name-display",
  ) as HTMLSpanElement;
  playNameSpan.textContent = storedPlayer
    ? JSON.parse(storedPlayer).name
    : "Unkown Marauder";
}
