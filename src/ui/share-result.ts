import type { IPlayer } from "../models/Player";

export function GetDataToShare(player: IPlayer) {
  const shareText = `Jag fick ${player.points} poäng i Marauders Escape Room! <br> Prova du med på https://medieinstitutet.github.io/fed25d-js-intro-grupparbete-the-mars-bound-marauders/`;
  const shareBox = document.querySelector('.share-box') as HTMLDivElement
  const shareTxt = document.querySelector('.share-txt') as HTMLParagraphElement
  const copyBtn = document.querySelector('.copy-btn') as HTMLButtonElement
  const shareBtn = document.getElementById('shareBtn') as HTMLButtonElement

  shareTxt.innerHTML = shareText;
  shareBox.classList.remove('hidden');
  shareBtn.classList.add('hidden');
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(shareTxt.innerText);
    copyBtn.textContent = 'Copied!✔️'
  });

}