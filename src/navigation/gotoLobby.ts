import { pauseTotalTimer } from "../game/total_timer";
import { displayWelcomeMessage } from "../ui/displayWelcomeMsg";
import { showPlayerStats } from "../ui/showPlayerStats";
import { SetFinalRoomBtnStatus } from "../ui/final-room-btn-access";

export function goToLobby() {
  console.log('lobb');
  const sections = document.querySelectorAll('main > section');
  sections.forEach(section => section.classList.add('hidden'));

  document.querySelector('.welcome-message')?.classList.remove('hidden');
  document.getElementById('rooms')?.classList.remove('hidden');
  document.querySelector('header')?.classList.remove('hidden');
  document.querySelector('#logoutBtn')?.classList.remove('hidden');

  pauseTotalTimer();
  showPlayerStats();
  SetFinalRoomBtnStatus();
  displayWelcomeMessage();
}