import type { IPLayer } from "./models/Player";
import { goToLobby } from "./gotoLobby";

export function login(): void {
    const form = document.querySelector<HTMLFormElement>('#login-form');
    const input = document.querySelector<HTMLInputElement>('#player-name');
    const logoutBtn = document.querySelector<HTMLButtonElement>('#logout-btn');
    const enterBtn = document.querySelector<HTMLButtonElement>('#enter-btn');
    const loggedIn = document.querySelector<HTMLElement>('#loggedIn');
    const main = document.querySelector<HTMLElement>('main');


    form?.addEventListener('submit', createPlayer);
    logoutBtn?.addEventListener('click', handleLogout);
    goToLobby();
    // Initial UI render on page load
    renderPlayerInfo();

    // Creates a new player and stores it in localStorage
    function createPlayer(e: Event): void {
        e.preventDefault();
        if (!input) return;

        const name = input.value;

        console.log('name:::::', name);


        if (!name) return;

        const newPlayer: IPLayer = {
            id: crypto.randomUUID(),
            name,
            points: 0,
            artifacts: [],
            roomTimes: []
        };

        console.log('newPlayer:::::', newPlayer);

        const players: IPLayer[] = JSON.parse(
            localStorage.getItem('players') || '[]'
        );

        console.log('players:::::', players);


        players.push(newPlayer);


        localStorage.setItem('players', JSON.stringify(players));
        localStorage.setItem('currentPlayerId', newPlayer.id);

        renderPlayerInfo();
    }

    // Returns the currently logged-in player from localStorage
    function getCurrentPlayer(): IPLayer | null {
        const currentId = localStorage.getItem('currentPlayerId');
        if (!currentId) return null;

        const players: IPLayer[] = JSON.parse(
            localStorage.getItem('players') || '[]'
        );

        return players.find(p => p.id === currentId) || null;
    }

    // Show/hide enter button and main based on player state
    function renderPlayerInfo(): void {
        const player = getCurrentPlayer();

        if (!player) {

            return;
        }

        loggedIn!.textContent = `${player.name} | Points: ${player.points} | Artifacts: ${player.artifacts.length}`;
    }

    // Add this inside login() with other event listeners
    enterBtn?.addEventListener('click', function showMain(): void {
        if (main) main.style.display = 'block';
    });

    // Logs out the current player and resets UI
    function handleLogout(): void {
        localStorage.removeItem('currentPlayerId');
        if (input) input.value = '';
        renderPlayerInfo();
    }
}