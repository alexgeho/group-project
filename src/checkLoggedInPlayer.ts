import { goToLobby } from "./gotoLobby";

export function checkLoggedInPlayer(): void {
    const existingPlayer = localStorage.getItem('player');
    console.log('Player in localStorage:', existingPlayer);
    if(existingPlayer !== null) {
      goToLobby();
    }
    return;
}