import { goToLobby } from "./gotoLobby";

export function showWelcomeModal(): void {
    const modal = document.createElement("div");
    modal.id = "welcome-modal";

    modal.innerHTML = `
    <div class="modal-content">
    <h2>Welcome to the Marauders Escape Room!</h2>
    <p>A small digital creature from Cyberspace has crashed into our world.
    The portal home is locked by a security system. To unlock the portal, you must
    get through 6 digital obstacles. Each obstacle provides a letter together,
    the letters form the password that opens the portal.</p>

    <h3>How to play</h3>
    <ul>
    <li>Solve each room to collect a letter</li>
    <li>The letters form the final password</li>
    <li>You earn points based on how fast you solve each room</li>
    <li>Your progress is saved automatically</li>
    </ul>

    <p class="easter-egg">👾 Transmission received from Commander Keen</p>
    <p class="mission-tagline">Mission status: Mars Bound 🚀</p>

    <button id="close-modal">Let's go! 🚀</button>
    </div>
    `;

    document.body.appendChild(modal);
    document.getElementById("close-modal")?.addEventListener("click", () => {
        modal.classList.add("fade-out");
        setTimeout(() => {
            modal.remove();
            goToLobby();
        }, 500);
        })
};