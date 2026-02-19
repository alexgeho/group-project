import "./styles/style.scss";
import { loadRoomOne } from "./15_room_one";
import { startTotalTimer, pauseTotalTimer } from "./12_total_timer";

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('main > section');
  sections.forEach(section => section.classList.add('hidden'));

  // Only show welcome page to begin with.
  document.querySelector('.homepage-page')?.classList.remove('hidden');
});
// =============================================================
// ROOM 1 ======================================================
// =============================================================

const enterRoomOneButton = document.getElementById("enterRoomOne");
const roomOneView = document.getElementById("roomOneContent");
const roomsBoxView = document.getElementById("roomsBox");

enterRoomOneButton?.addEventListener("click", () => {
  startTotalTimer(); //start total-timer when entering room
  showRoomOneView();
});

function showRoomOneView() {
  roomsBoxView?.classList.add("hidden");
  roomOneView?.classList.remove("hidden");

  loadRoomOne(() => {
    pauseTotalTimer(); //pause total-timer when exiting room
    roomOneView?.classList.add("hidden");
    roomsBoxView?.classList.remove("hidden");
  });
}
