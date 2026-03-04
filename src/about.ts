export function loadAboutPage() {
  console.log("Om sidan laddas!");
  const aboutSection = document.getElementById("about");
  if (!aboutSection) return;

  const sections = document.querySelectorAll("main > section");
  sections.forEach((sections) => sections.classList.add("hidden"));

  aboutSection.classList.remove("hidden");

  aboutSection.innerHTML = `
  <h2>About the Maruders Escape Room</h2>
  <p></p>`;
}
