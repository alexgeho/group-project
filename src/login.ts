import type { IPLayer } from "./models/Player";

export function login() {
    const form = document.querySelector<HTMLFormElement>('#login-form')
    const input = document.querySelector<HTMLInputElement>('#player-name')
    const logoutBtn = document.querySelector<HTMLButtonElement>('#logout-btn')
    const loggedIn = document.querySelector<HTMLElement>('#loggedIn')

    form?.addEventListener('submit', createPlayer);


    function createPlayer(e: Event) {
        e.preventDefault();

        if (!input) return;

        const name = input.value.trim();

        const newPlayer: IPLayer = {
            id: crypto.randomUUID(),
            name: name,
            points: 0,
            artifacts: [],
            roomTimes: []
        };

        const players: IPLayer[] = JSON.parse(
            localStorage.getItem('players') || '[]'
        );

        players.push(newPlayer);

        localStorage.setItem('players', JSON.stringify(players))

        localStorage.setItem("currentPlayerId", newPlayer.id);

        console.log("Created:", newPlayer);

        /* LOG OUT BTN +*/

        if (newPlayer) {
            form.style.display = "none";
            logoutBtn.style.display = "block";
            loggedIn.style.display = "block";

            loggedIn!.textContent = `${newPlayer.name} | Points: ${newPlayer.points} | Artifacts: ${newPlayer.artifacts.length}`;
        }

    logoutBtn?.addEventListener("click", handleLogout);

        function handleLogout(): void {
            localStorage.removeItem("currentPlayerId");
            form.style.display = "block";
            logoutBtn.style.display = "none";
            loggedIn.style.display = "none";
            input.value = "";
        }

    }





}