import type { IPLayer } from "./models/Player";

export function login(): void {
    const form = document.querySelector<HTMLFormElement>('#login-form');
    const input = document.querySelector<HTMLInputElement>('#player-name');
    const logoutBtn = document.querySelector<HTMLButtonElement>('#logout-btn');
    const loggedIn = document.querySelector<HTMLElement>('#loggedIn');

    form?.addEventListener('submit', createPlayer);
    logoutBtn?.addEventListener('click', handleLogout);

    // Initial UI render on page load
    renderPlayerInfo();

    // Creates a new player and stores it in localStorage
    function createPlayer(e: Event): void {
        e.preventDefault();
        if (!input) return;

        const name = input.value.trim();
        if (!name) return;

        const newPlayer: IPLayer = {
            id: crypto.randomUUID(),
            name,
            points: 0,
            artifacts: [],
            roomTimes: []
        };

        const players: IPLayer[] = JSON.parse(
            localStorage.getItem('players') || '[]'
        );

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

    // Updates the UI based on current player state
    function renderPlayerInfo(): void {
        const player = getCurrentPlayer();

        if (!player) {
            form!.style.display = 'block';
            logoutBtn!.style.display = 'none';
            loggedIn!.style.display = 'none';
            return;
        }

        form!.style.display = 'none';
        logoutBtn!.style.display = 'block';
        loggedIn!.style.display = 'block';

        loggedIn!.textContent =
            `${player.name} | Points: ${player.points} | Artifacts: ${player.artifacts.length}`;
    }

    // Logs out the current player and resets UI
    function handleLogout(): void {
        localStorage.removeItem('currentPlayerId');
        renderPlayerInfo();
        if (input) input.value = '';
    }

    
}