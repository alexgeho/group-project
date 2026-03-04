import { startTotalTimer } from "./total_timer";
import { loadRoomFive } from "./room_five";
import { loadRoomOne } from "./room_one";
import { loadRoomTwo } from "./room_two";
import { loadRoomFour } from "./room_four";
import { loadRoomSix } from "./room_six";
import { goToLobby } from "./gotoLobby";
import type { IRoom } from "./models/Room";
import { getPlayer } from "./fetchPlayerFromLs";
import { loadFinalRoom } from "./room_final";

let roomLoaded = false;
const playerData = getPlayer();

export async function fetchRooms(): Promise<void> {
  // она false - тут как читать типо если она true тогда return?
  if (roomLoaded) return;

  const roomsContainer = document.getElementById("rooms");

  const rooms: IRoom[] = await loadRooms("rooms.json");

  // циком собираем карточку комнаты
  // rooms.forEach - запускаем цикл по массиву
  // (room: IRoom) - создаем объект типа IRoom
  rooms.forEach((room: IRoom) => {
    const roomElement = document.createElement("div");

    roomElement.className = `room-${room.id} room-card`;

    roomElement.innerHTML = `
    <h2>${room.title}</h2>
    <span>${room.description}</span>
    <button id="enterRoom${room.id}" class="btn-primary">Enter</button>`;

    // создаем тэг div который будет передан в createElement

    // даем тегу div класс в который будет подставляться ид комнаты
    roomElement.className = `room-${room.id} room-card`;

    // тэги и контент что будет в HTML
    roomElement.innerHTML = `
    <h2>${room.title}</h2>
    <span>${room.description}</span>
    <button id="enterRoom${room.id}" class="btn-primary">Enter</button>`;

    // добавляем в конейнер тока что созданный div с контентом и классом
    roomsContainer?.appendChild(roomElement);

    // достаем кнопку из roomElement
    const roomBtn = roomElement.querySelector("button");

    roomBtn?.addEventListener("click", () => goToRoom(room));
  });

  const finalRoomBtn = document.querySelector(
    "#enterRoom7",
  ) as HTMLButtonElement;
  if (playerData) {
    if (finalRoomBtn) {
      finalRoomBtn.disabled = true;
      if (playerData!.roomsCompleted && playerData!.roomsCompleted.length < 6) {
        finalRoomBtn.disabled = false;
      }
    }
  } else {
    console.log("No player data found in localStorage.");
  }

  roomLoaded = true;
}

// функция принемает параметр room
function goToRoom(room: IRoom) {
  const sections = document.querySelectorAll("main > section");

  sections.forEach((section) => section.classList.add("hidden"));

  // в index.html находим комнату по имени и убираем hidden
  document.getElementById(room.name)?.classList.remove("hidden");

  startTotalTimer();

  // если верно то включаем функцию и туда типо передаем параметр (() => goToLobby()) - тут я не понял
  if (room.name === "firewall") loadRoomOne();
  if (room.name === "database") loadRoomTwo(() => goToLobby());
  if (room.name === "encryption") loadRoomFour();
  if (room.name === "bug-room") loadRoomFive();
  if (room.name === "portal-control") loadRoomSix();
  if (room.name === "destiny") loadFinalRoom();
}

export async function loadRooms(cateName: string) {
  const catData = await fetch(`./${cateName}`);
  return await catData.json();
}
