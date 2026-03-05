export function resetUI(): void {
  document.querySelectorAll('.room-card').forEach(card => {
    card.classList.remove('completed');
  });

  document.querySelectorAll('.room-card button').forEach(btn => {
    (btn as HTMLButtonElement).disabled = false;
  });

  const progress = document.querySelector('#progress-bar') as HTMLProgressElement;
  if (progress) progress.value = 0;

  const artefacts = document.querySelector('#collected-artefacts') as HTMLSpanElement;
  if (artefacts) artefacts.textContent = '';
}