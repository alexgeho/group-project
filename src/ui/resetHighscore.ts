import { saveHighscoreList } from '../game/highscore.ts';
import { showHighscore } from './highscoreDisplay.ts';

const RESET_HIGHSCORE_PASSWORD = 'marsmarauders'; // current password for resetting highscore list

/**
 * Function to reset highscore list
 * Shows a custom styled password prompt, clears localStorage if password is correct,
 * and updates the highscore display accordingly
 */
export function handleResetHighscore(elementName: string): void {
    const backdrop = document.createElement('div');
    backdrop.className = 'reset-modal-backdrop';

    const modal = document.createElement('div');
    modal.className = 'reset-modal';

    modal.innerHTML = `
        <div class="reset-modal-content">
            <h3>🔐 ACCESS TERMINAL //... </h3>
            <p>➜ SECURITY CLEARANCE REQUIRED.</p>
            <input type="text" id="reset-password-input" placeholder="ENTER PASSWORD" autofocus />
            <div id="reset-feedback" class="reset-feedback"></div>
            <div class="reset-modal-buttons">
                <button id="reset-submit-btn" class="reset-btn-submit">SUBMIT</button>
                <button id="reset-cancel-btn" class="reset-btn-cancel">CANCEL</button>
            </div>
        </div>
    `;

    document.body.appendChild(backdrop);
    document.body.appendChild(modal);

    const input = modal.querySelector('#reset-password-input') as HTMLInputElement;
    const submitBtn = modal.querySelector('#reset-submit-btn') as HTMLButtonElement;
    const cancelBtn = modal.querySelector('#reset-cancel-btn') as HTMLButtonElement;
    const feedback = modal.querySelector('#reset-feedback') as HTMLDivElement;

    const cleanup = () => {
        backdrop.remove();
        modal.remove();
    };

    const showFeedback = (message: string, type: 'success' | 'error') => {
        feedback.textContent = message;
        feedback.className = `reset-feedback reset-feedback-${type}`;
    };

    const handleSubmit = () => {
        const password = input.value.trim();
        if (password === RESET_HIGHSCORE_PASSWORD) {
            saveHighscoreList([]);
            showFeedback('✓ Authorization granted... resetting...', 'success');
            setTimeout(() => {
                showHighscore(elementName);
                cleanup();
            }, 1500);
        } else if (password === '') {
            showFeedback('✗ ERROR: Please enter a password', 'error');
        } else {
            showFeedback('✗ ERROR: ACCESS DENIED - invalid code', 'error');
        }
    };

    submitBtn.addEventListener('click', handleSubmit);
    cancelBtn.addEventListener('click', cleanup);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSubmit();
        if (e.key === 'Escape') cleanup();
    });
}
