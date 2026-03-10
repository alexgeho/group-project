import { getPlayer } from "../storage/fetchPlayerFromLs";

export function showPlayerStats(): void {
  const playerData = getPlayer();
  if (!playerData) {
    console.log('No player data found in localStorage.');
    return;
  }

  let aretfactsList = '';
  for (let i = 0; i < playerData.artifacts.length; i++) {
    aretfactsList += `[${playerData.artifacts[i]}] `;
  }

  const artefactSection = document.querySelector('#collected-artefacts') as HTMLSpanElement
  if (artefactSection) {
    artefactSection.textContent = `${aretfactsList}`;
  }

  const score = document.querySelector("#score") as HTMLSpanElement
  if (score) {
    score.textContent = `${playerData.points}`;
  }
  const progress = document.querySelector('#progress-bar') as HTMLProgressElement;
  if (progress) {
    progress.value = Number(playerData.roomsCompleted.length);
  }


  if (!playerData.roomTimes) {
    console.log('No roomTimes found for player');
    return;
  }
  for (let i = 0; i < playerData.roomTimes.length; i++) {
    const roomTime = playerData.roomTimes[i];
    const roomElement = document.querySelector(`.room-${roomTime.roomId}`);
    if (roomElement) {
      roomElement.classList.add('completed');
    }
  }
  const finalRoomCard = document.querySelector('.room-7');
  switch (playerData.roomsCompleted.length) {
    case 1:
      finalRoomCard?.classList.add('portal-progress1');
      break;
    case 2:
      finalRoomCard?.classList.add('portal-progress2');
      break;
    case 3:
      finalRoomCard?.classList.add('portal-progress3');
      break;
    case 4:
      finalRoomCard?.classList.add('portal-progress4');
      break;
    case 5:
      finalRoomCard?.classList.add('portal-progress5');
      break;
    case 6:
      finalRoomCard?.classList.add('portal-progress6');
      break;
  }

  const finishedRooms: number[] = playerData.roomsCompleted;

  finishedRooms.forEach(element => {
    const btn = document.getElementById(`enterRoom${element}`) as HTMLButtonElement
    if (btn) {
      btn.disabled = true;
    }
  });
}