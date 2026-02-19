import './styles/style.scss'

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('main > section');
  sections.forEach(section => section.classList.add('hidden'));

  // Only show welcome page to begin with.
  document.querySelector('.welcome-page')?.classList.remove('hidden');
});

