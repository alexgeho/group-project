import "./styles/style.scss";
import { loginUser } from "./login2";
import { logout } from "./logout";
import { fetchRooms } from "./fetchRooms";
import { loadRoomOne } from "./15_room_one";
import { startTotalTimer, pauseTotalTimer } from "./12_total_timer";

document.addEventListener('DOMContentLoaded', async() => {
  await fetchRooms();
  const sections = document.querySelectorAll('main > section');
  sections.forEach(section => section.classList.add('hidden'));
  document.querySelector('#logout-btn')?.classList.add('hidden');
  document.querySelector('header')?.classList.add('hidden');
  
  document.querySelector('.homepage-page')?.classList.remove('hidden');
});

const startGameButton = document.getElementById("start-game-btn");
startGameButton?.addEventListener("click", loginUser);

document.querySelector('#logoutBtn')?.addEventListener('click', logout);


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