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
    finalRoomCard?.classList.remove('portal-progress6');
    finalRoomCard?.classList.add('portal-progress1');
  } 

  resetTotalTimer()
  SetFinalRoomBtnStatus();
}