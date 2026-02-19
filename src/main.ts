import "./styles/style.scss";
import { loadRoomOne } from "./15_room_one";

// =============================================================
// ROOM 1 ======================================================
// =============================================================

const enterRoomOneButton = document.getElementById("enterRoomOne");
const roomOneView = document.getElementById("roomOneContent");
const roomsBoxView = document.getElementById("roomsBox");

enterRoomOneButton?.addEventListener("click", () => {
  showRoomOneView();
});

function showRoomOneView() {
  roomsBoxView?.classList.add("hidden");
  roomOneView?.classList.remove("hidden");

  loadRoomOne(() => {
    roomOneView?.classList.add("hidden");
    roomsBoxView?.classList.remove("hidden");
  });
}
