export async function fetchRooms(): Promise<void> {

  const categories = await loadCategories('rooms.json');

  console.log('Fetched categories:', categories);
  let html = '';
  categories.forEach((room: any) => {
    const roomElement = document.createElement('div');
    roomElement.className = `room-${room.id} room-card`;
    roomElement.innerHTML = `<h2>${room.name}</h2><span>${room.description}</span><button id="enterRoom${room.id}">Enter</button>`;
    document.getElementById('rooms')?.appendChild(roomElement);
    html += roomElement.outerHTML;
    document.getElementById(`enterRoom${room.id}`)?.addEventListener('click', () => {
      console.log(`Entering room: ${room.name}`);
      document.querySelector('.homepage-page')?.classList.remove('hidden');
      document.getElementById('rooms')?.classList.add('hidden');
      document.getElementById(`${room.name}`)?.classList.remove('hidden');
    });
  });
  console.log(html);
  document.querySelector('#rooms')!.innerHTML = html;
 };

async function loadCategories(cateName: string) {
  const catData = await fetch(`./${cateName}`)
  return await catData.json();
}


// <div class="room-{one} room-card" >
//   Room1 < button id = "enterRoom{One}" > Enter </button>
//     </div>