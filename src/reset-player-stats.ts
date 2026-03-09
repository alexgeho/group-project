import { getPlayer } from "./fetchPlayerFromLs"
import { goToLobby } from "./gotoLobby";
import { resetUI } from "./reset-ui";
import { showPlayerStats } from "./showPlayerStats";

export function ResetPlayerStats(){
  const player = getPlayer();
  if (player) {
    player.points = 0,
      player.artifacts = [],
      player.roomTimes = [],
      player.roomsCompleted = []
  }
  localStorage.setItem('player', JSON.stringify(player))
  resetUI();
  showPlayerStats();
  goToLobby();
}