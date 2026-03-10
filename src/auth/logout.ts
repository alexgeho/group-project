import { showHighscore } from "../ui/highscoreDisplay";

export function logout(): void {
  console.log('logout');
  localStorage.removeItem("player");

  const sections = document.querySelectorAll('main > section');
  sections.forEach(section => section.classList.add('hidden'));
  document.querySelector('#logout-btn')?.classList.add('hidden');
  document.querySelector('header')?.classList.add('hidden');
  
  document.querySelector('.homepage-page')?.classList.remove('hidden');
  document.querySelectorAll('.room-card').forEach(card => card.classList.remove('completed'));
  showHighscore('high-score-start-page');
  };