import { getHighscoreList } from '../game/highscore.ts';
import { handleResetHighscore } from './resetHighscore.ts';

export function showHighscore(elementName: string): void {
  const element = document.querySelector(`.${elementName}`)
  if (element) {
    element.innerHTML = '';

    const highscoreList = getHighscoreList();
    let html = `  <section class="high-score">
      <h2 id="highscore-title">High Score</h2>
      <table>
        <thead>
          <tr>
            <th>Rank: </th>
            <th>Player: </th>
            <th>Score: </th>
          </tr>
        </thead>
        <tbody id="high-score-table-body">`;

    for (let i = 0; i < highscoreList.length; i++) {
      html += `
          <tr>
            <td>${[i + 1]}</td>
            <td>${highscoreList[i].name}</td>
            <td>${highscoreList[i].score}</td>
          </tr>`;
    }

    html += `
        </tbody>
      </table>
    </section>`;
    element.innerHTML = html;

    // Specialhack: double click on title to reset highscore
    const highscoreResetTrigger = element.querySelector('#highscore-title');
    if (highscoreResetTrigger) {
      highscoreResetTrigger.addEventListener('dblclick', () => {
        handleResetHighscore(elementName);
      });
    }
  }
}