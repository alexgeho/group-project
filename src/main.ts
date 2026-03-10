import "./styles/style.scss";
import { loginUser } from "./auth/login.ts";
import { logout } from "./auth/logout.ts";
import { fetchRooms } from "./utils/fetchRooms.ts";
import { checkLoggedInPlayer } from "./storage/checkLoggedInPlayer.ts";
import { showHighscore } from "./ui/highscoreDisplay.ts";
import { loadAboutPage } from "./rooms/about.ts";

await fetchRooms();
showHighscore("high-score-start-page");
const sections = document.querySelectorAll("main > section");
sections.forEach((section) => section.classList.add("hidden"));
document.querySelector("#logout-btn")?.classList.add("hidden");
document.querySelector("header")?.classList.add("hidden");

document.querySelector(".homepage-page")?.classList.remove("hidden");
checkLoggedInPlayer();

const startGameButton = document.getElementById("start-game-btn");
startGameButton?.addEventListener("click", loginUser);

document.querySelector("#logoutBtn")?.addEventListener("click", logout);

// TEST
const aboutButton = document.getElementById("about-page-btn");
aboutButton?.addEventListener("click", loadAboutPage);
