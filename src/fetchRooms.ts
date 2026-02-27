import { startTotalTimer } from "./12_total_timer";
import { loadRoomFive } from "./19_room_five";
import { loadRoomOne } from "./15_room_one";
import { loadRoomTwo } from "./16_room_two";
import { goToLobby } from "./gotoLobby";
import type { IRoom } from "./models/Room";

let roomLoaded = false;

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
    <h2>${room.name}</h2>
    <span>${room.description}</span>
    <button id="enterRoom${room.id}" class="btn-primary">Enter</button>`;

    // создаем тэг div который будет передан в createElement

    // даем тегу div класс в который будет подставляться ид комнаты
    roomElement.className = `room-${room.id} room-card`;

    // тэги и контент что будет в HTML
    roomElement.innerHTML = `
    <h2>${room.name}</h2>
    <span>${room.description}</span>
    <button id="enterRoom${room.id}" class="btn-primary">Enter</button>`;

    // добавляем в конейнер тока что созданный div с контентом и классом
    roomsContainer?.appendChild(roomElement);

    // достаем кнопку из roomElement
    const roomBtn = roomElement.querySelector("button");

    roomBtn?.addEventListener("click", () => goToRoom(room));
  });
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
  if (room.name === "firewall") loadRoomOne(() => goToLobby());
  if (room.name === "database") loadRoomTwo(() => goToLobby());
  if (room.name === "bug-room") loadRoomFive();
}

export async function loadRooms(cateName: string) {
  const catData = await fetch(`./${cateName}`);
  return await catData.json();
}
