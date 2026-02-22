export function showPlayerStats(): void {
  const playerData = localStorage.getItem('player');
  if (!playerData) {
    console.log('No player data found in localStorage.');
    return;
  }
  else {
    const parsedPlayerData = JSON.parse(playerData);

    let aretfactsList = '';
    for (let i = 0; i < parsedPlayerData.artifacts.length; i++) {
      aretfactsList += `[${parsedPlayerData.artifacts[i]}] `;
    }

    const artefactSection = document.querySelector('#collected-artefacts') as HTMLSpanElement
    if (artefactSection) {
      artefactSection.textContent = `${aretfactsList}`;
    }

    const progress = document.querySelector('#progress-bar') as HTMLProgressElement;
    console.log(progress);
    if (progress) {
      progress.value = Number(parsedPlayerData.roomsCompleted.length);
    }


    console.log('Player data found in localStorage:', parsedPlayerData.roomTimes);
    if (!parsedPlayerData.roomTimes) {
      console.log('No roomTimes found for player');
      return;
    }
    for (let i = 0; i < parsedPlayerData.roomTimes.length; i++) {
      const roomTime = parsedPlayerData.roomTimes[i];
      const roomElement = document.querySelector(`.room-${roomTime.roomId}`);
      if (roomElement) {
        roomElement.classList.add('completed');
      }
    }
  }
}