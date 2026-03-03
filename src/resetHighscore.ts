import { saveHighscoreList } from './highscore.ts';
import { showHighscore } from './highscoreDisplay.ts';

const RESET_HIGHSCORE_PASSWORD = 'marsmarauders'; // current password for resetting highscore list

/**
 * Function to reset highscore list
 * Prompts user for password, clears localStorage if password is correct,
 * and updates the highscore display accordingly
 */
export function handleResetHighscore(elementName: string): void {
    const password = prompt('🔐 It seems you have unlocked a secret! Please enter the password to reset highscores:');

    if (password === RESET_HIGHSCORE_PASSWORD) {
        saveHighscoreList([]); //reset highscore data in localStorage
        alert('Highscores have been reset. It\'s time to go and achieve world domination!');
        showHighscore(elementName); // Refresh to display cleared highscore list

    } else if (password !== null) {
        alert('Hmm... Maybe you are not worthy enough.');
    }
}
