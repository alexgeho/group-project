import { getPlayer } from "./fetchPlayerFromLs";

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

}