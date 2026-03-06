import { SetFinalRoomBtnStatus } from "./final-room-btn-access";
import { resetTotalTimer } from "./total_timer";

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

  const finalRoomCard = document.querySelector('.room-7');
  if(finalRoomCard){
    if (finalRoomCard) {
      const classesToDelete = Array.from(finalRoomCard.classList)
        .filter(className => className.startsWith('portal-progress'));

      finalRoomCard.classList.remove(...classesToDelete);

      finalRoomCard.classList.add('portal-progress1');
    } 
  }
  resetTotalTimer()
  SetFinalRoomBtnStatus();
}