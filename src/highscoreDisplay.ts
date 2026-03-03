import { getHighscoreList, saveHighscoreList } from './highscore.ts';

const RESET_HIGHSCORE_PASSWORD = 'marsmarauders'; // current password for resetting highscore list

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
    const highscoreReset = element.querySelector('#highscore-title');
    if (highscoreReset) {
      highscoreReset.addEventListener('dblclick', () => {
        const password = prompt('🔐 It seems you have unlocked a secret! Please enter the password to reset highscores:');

        if (password === RESET_HIGHSCORE_PASSWORD) {
          saveHighscoreList([]); //reset highscore list in localStorage
          alert('Highscores have been reset. It\'s time to go and achieve world domination!');
          showHighscore(elementName);

        } else if (password !== null) {
          alert('Hmm... Maybe you are not worthy enough.');
        }
      });
    }
    //

  }
}