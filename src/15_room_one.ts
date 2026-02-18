const memoryContainer = document.getElementById("roomOneContent");

export function loadRoomOne(onBack: () => void): void {
  if (!memoryContainer) return;

  memoryContainer.innerHTML = `
    <p>Welcome to Room One</p>
    <button id="backToRooms">Back</button>
  `;

  const backButton = document.getElementById("backToRooms");
  backButton?.addEventListener("click", onBack);
}
