import { goToLobby } from "../navigation/gotoLobby";

export function loadAboutPage() {
  const aboutSection = document.getElementById("about");
  if (!aboutSection) return;

  const sections = document.querySelectorAll("main > section");
  sections.forEach((section) => section.classList.add("hidden"));

  aboutSection.classList.remove("hidden");

  aboutSection.innerHTML = `
<h2>About the Game</h2>
<p>
Mars Bound Marauders is an escape-room inspired puzzle game.
Collect an artifact for each solved room. Once all artifacts are gathered,
you can unlock the final room and enter the password that opens the portal to victory.
</p>

<h3>Technologies</h3>
<ul class="tech-list">
  <li>TypeScript</li>
  <li>HTML</li>
  <li>SCSS</li>
</ul>

<h3>The Team</h3>
<ul class="team-list">
<li>Alexander Gerhard</li>
  <li>Tilda Egland</li>
  <li>Jenny Gustafsson</li>
  <li>Harez Sait</li>
  <li>Mojtaba Mobasheri</li>
  <li>Angelie Ångman</li>
</ul>

<button id="backFromAbout" class="btn-primary">Back</button>`;

  const backButton = document.getElementById("backFromAbout");
  backButton?.addEventListener("click", goToLobby);
}
