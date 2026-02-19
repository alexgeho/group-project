import "./styles/style.scss";
import { login } from "./login";
import { loadRoomOne } from "./15_room_one";
import { startTotalTimer, pauseTotalTimer } from "./12_total_timer";
import { fetchRooms } from "./fetchRooms";
import { goToLobby } from "./gotoLobby";


document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('main > section');
  sections.forEach(section => section.classList.add('hidden'));
  document.querySelector('#logout-btn')?.classList.add('hidden');
  document.querySelector('header')?.classList.add('hidden');
  
  document.querySelector('.homepage-page')?.classList.remove('hidden');
});

const rooms = fetchRooms();
console.log('rooms', JSON.stringify(rooms)) ;

// =============================================================
// ROOM 1 ======================================================
// =============================================================

const enterRoomOneButton = document.getElementById("enterRoomOne");
const roomOneView = document.getElementById("firewall");

enterRoomOneButton?.addEventListener("click", () => {
  startTotalTimer(); //start total-timer when entering room
  showRoomOneView();
});

function showRoomOneView() {
  roomOneView?.classList.remove("hidden");

  loadRoomOne(() => {
    pauseTotalTimer(); //pause total-timer when exiting room
    roomOneView?.classList.add("hidden");
  });
}


const startGameButton = document.getElementById("start-game-btn");
startGameButton?.addEventListener('click', loginUser);

function loginUser(e: Event): void {
  e.preventDefault();
  goToLobby();
  const usernameInput = document.getElementById('player-name') as HTMLInputElement;
 
  const player: any = {
    id: crypto.randomUUID(),
    name: usernameInput.value.trim(),
    points: 0,
    currentRoom: 1,
    artifacts: [],
    roomTimes: [],
    completedRooms: []
  };

  localStorage.setItem('player', JSON.stringify(player));

  displayWelcomeMessage();
}


function displayWelcomeMessage(): void {
  const storedPlayer = localStorage.getItem('player');
  const playNameSpan = document.getElementById('player-name-display') as HTMLSpanElement;
  playNameSpan.textContent = storedPlayer ? JSON.parse(storedPlayer).name : 'Unkown Marauder';
}
