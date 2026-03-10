import { getPlayer } from "../storage/fetchPlayerFromLs"
import { goToLobby } from "../navigation/gotoLobby";
import { resetUI } from "./reset-ui";
import { showPlayerStats } from "../ui/showPlayerStats";

export function ResetPlayerStats() {
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