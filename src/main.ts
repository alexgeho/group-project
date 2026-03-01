import "./styles/style.scss";
import { loginUser } from "./login.ts";
import { logout } from "./logout";
import { fetchRooms } from "./fetchRooms";
import { checkLoggedInPlayer } from "./checkLoggedInPlayer";
import { showHighscore } from "./highscoreDisplay.ts";

await fetchRooms();
showHighscore('high-score-start-page');
const sections = document.querySelectorAll("main > section");
sections.forEach((section) => section.classList.add("hidden"));
document.querySelector("#logout-btn")?.classList.add("hidden");
document.querySelector("header")?.classList.add("hidden");

document.querySelector(".homepage-page")?.classList.remove("hidden");
checkLoggedInPlayer();

const startGameButton = document.getElementById("start-game-btn");
startGameButton?.addEventListener("click", loginUser);

document.querySelector("#logoutBtn")?.addEventListener("click", logout);
