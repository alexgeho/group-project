import type { IPLayer } from "./models/Player";

export function login() {
    const form = document.querySelector<HTMLFormElement>('#login-form')
    const input = document.querySelector<HTMLInputElement>('#player-name')



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

    }



}