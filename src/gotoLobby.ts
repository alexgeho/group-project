import { pauseTotalTimer } from "./12_total_timer";

export function goToLobby() {
  console.log('lobb');
  const sections = document.querySelectorAll('main > section');
  sections.forEach(section => section.classList.add('hidden'));

  document.querySelector('.welcome-message')?.classList.remove('hidden');
  document.getElementById('rooms')?.classList.remove('hidden');
  document.querySelector('header')?.classList.remove('hidden');
  document.querySelector('#logoutBtn')?.classList.remove('hidden');

  pauseTotalTimer();
}