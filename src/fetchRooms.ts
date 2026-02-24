import { startTotalTimer } from "./12_total_timer";
import { loadRoomFive } from "./19_room_five";
import { loadRoomOne } from "./15_room_one";
import { loadRoomTwo } from "./16_room_two";
import { goToLobby } from "./gotoLobby";
import type { IRoom } from "./models/Room";

let roomLoaded = false;

export async function fetchRooms(): Promise<void> {

  if (roomLoaded) return;
  const roomsContainer = document.getElementById('rooms');
  const rooms: IRoom[] = await loadRooms('rooms.json');

  rooms.forEach((room: IRoom) => {
    const roomElement = document.createElement('div');
    roomElement.className = `room-${room.id} room-card`;
    roomElement.innerHTML = `<h2>${room.name}</h2><span>${room.description}</span><button id="enterRoom${room.id}" class="btn-primary">Enter</button>`;

    roomsContainer?.appendChild(roomElement);

    const roomBtn = roomElement.querySelector('button');
    roomBtn?.addEventListener('click', () => goToRoom(room));
  });
  roomLoaded = true;
};

function goToRoom(room: IRoom) {
  const sections = document.querySelectorAll('main > section');
  sections.forEach(section => section.classList.add('hidden'));
  
  document.getElementById(room.name)?.classList.remove('hidden');
  startTotalTimer();

  if (room.name === 'firewall') loadRoomOne(() => goToLobby());
  if (room.name === 'database') loadRoomTwo(() => goToLobby());
  if (room.name === 'bug-room') loadRoomFive();
}

async function loadRooms(cateName: string) {
  const catData = await fetch(`./${cateName}`)
  return await catData.json();
}