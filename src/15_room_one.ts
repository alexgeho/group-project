const memoryContainer = document.getElementById("firewall");

export function loadRoomOne(onBack: () => void): void {
  if (!memoryContainer) return;

  memoryContainer.innerHTML = `
    <p>Welcome to Room One Firewall</p>
    <button id="backToRooms">Back</button>
  `;

  const backButton = document.getElementById("backToRooms");
  backButton?.addEventListener("click", onBack);
}
