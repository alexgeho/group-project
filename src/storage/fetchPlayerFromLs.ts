import type { IPlayer } from "../models/Player";

export function getPlayer(): IPlayer | null {
  const playerData = localStorage.getItem('player');
  if (playerData) {
    return JSON.parse(playerData);
  }
  return null;
}