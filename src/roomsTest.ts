import rooms from "../rooms.json"

const roomsSection = document.querySelector('#roomsTest')

export default function renderRooms () {


rooms.forEach ( (room) => {
    const item = document.createElement("div");

    item.innerHTML = `
        <h3>${room.name}</h3>
        <p>Title: ${room.title}</p>
    `;

    roomsSection?.appendChild(item)
})}

renderRooms ();
