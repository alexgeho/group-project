import { goToLobby } from "./gotoLobby";

export function showWelcomeModal(): void {
    const modal = document.createElement("div");
    modal.id = "welcome-modal";

    modal.innerHTML = `
    <div class="modal-content">
    <h2>Welcome to the Marauders Escape Room!</h2>
    <p>Your mission: solve 6 digital challenges, collect the letters, and unlock
    the portal. The fate of the digital creature is in your hands. Good luck, agent!</p>

    <h3>How to play:</h3>
    <ul>
    <li>Complete each room to collect a letter</li>
    <li>The letters form the final password</li>
    <li>You earn points based on how quickly you complete each room</li>
    <li>Your progress is saved automatically!</li>
    </ul>

    <p class="mission-tagline">Mission status: Mars Bound 🚀</p>

    <button id="close-modal">Let's go! 🚀</button>
    </div>
    `;

    document.body.appendChild(modal);
    const closeBtn = modal.querySelector<HTMLButtonElement>("#close-modal");
    if (!closeBtn) return;
    closeBtn.focus();

    function closeModal() {
        modal.classList.add("fade-out");
        setTimeout(() => {
            modal.remove();
            goToLobby();
        }, 500);
    }
    closeBtn.addEventListener("click", closeModal);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeModal();
        }
    });
}