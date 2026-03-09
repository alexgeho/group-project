import { getPlayer } from "./fetchPlayerFromLs";
export function SetFinalRoomBtnStatus(){
  const playerData = getPlayer();
  const finalRoomBtn = document.querySelector("#enterRoom7") as HTMLButtonElement;
  if (playerData) {
    if (finalRoomBtn) {
      finalRoomBtn.disabled = true;
      finalRoomBtn.classList.remove('portal-progress3')
      if (playerData!.roomsCompleted.length >= 6) {
        finalRoomBtn.disabled = false;
        finalRoomBtn.classList.add('portal-progress3')
      }
    }
  } else {
    console.log("No player data found in localStorage.");
  }
}