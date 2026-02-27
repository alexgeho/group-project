import { getPlayer } from "./fetchPlayerFromLs";
import { addHighscore } from "./highscore";

const player = getPlayer();
const memoryContainer = document.getElementById("destiny");

export function loadFinalRoom(): void {
  if (!memoryContainer) return;
  memoryContainer.innerHTML = `
    <h2>Final Room - The Portal</h2>
    <p>The portal's final lock requires a sacred word — a name known to all who dwell in the digital realm.
    This tool was forged by humans in the year 2005, crafted by a single mind named legend who built the Linux kernel. It was born out of frustration, designed to bring order to chaos.
    Developers across the world use it every day to collaborate, it allows many minds to work as one, each contributing to a greater creation without destroying what others have built.
    It is not a language. It is not a framework. It is the invisible backbone of modern software development.
    You have collected the fragments. Now assemble them.
    What is the name of this tool?</p>`

  if (checkAnswer()) {
    if (!player) {
      addHighscore({
        name: player!.name,
        score: player!.points,
        date: new Date().toLocaleDateString(),
      });
    }
  }
}

function checkAnswer(): boolean {
  // const answerInput = document.getElementById('final-answer') as HTMLInputElement;
  // const answer = answerInput.value.trim().toLowerCase();
  // return answer === 'mars';
  return true;
}