import { startTotalTimer } from "./12_total_timer";
import { loadRoomFive } from "./19_room_five";
import { loadRoomOne } from "./15_room_one";
import { goToLobby } from "./gotoLobby";

export async function fetchRooms(): Promise<void> {

  const categories = await loadCategories('rooms.json');

  categories.forEach((room: any) => {
    const roomElement = document.createElement('div');
    roomElement.className = `room-${room.id} room-card`;
    roomElement.innerHTML = `<h2>${room.name}</h2><span>${room.description}</span><button id="enterRoom${room.id}" class="btn-primary">Enter</button>`;

    document.getElementById('rooms')?.appendChild(roomElement);

    document.getElementById(`enterRoom${room.id}`)?.addEventListener('click', () => goToRoom(room));
  });
};

function goToRoom(room: any) {
  const sections = document.querySelectorAll('main > section');
  sections.forEach(section => section.classList.add('hidden'));
  
  document.getElementById(room.name)?.classList.remove('hidden');
  startTotalTimer();

  if (room.name === 'firewall') loadRoomOne(() => goToLobby());
  if (room.name === 'bug-room') loadRoomFive();
}

async function loadCategories(cateName: string) {
  const catData = await fetch(`./${cateName}`)
  return await catData.json();
}