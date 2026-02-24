export function loadRoomTwo(onComplete: () => void) {
  const container = document.getElementById('database');
  if (!container) return;
  container.innerHTML = 'Hello World';
}