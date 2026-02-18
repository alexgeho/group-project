import './styles/style.scss';
import { startTotalTimer, resetTotalTimer, pauseTotalTimer, getTotalSeconds } from './12_total_timer';

console.log('=== TOTAL TIMER TEST ===');

// Starta med ny timer och nollställ
resetTotalTimer();
startTotalTimer();

// efter 3sekunder, pausa + logga tid 
setTimeout(() => {
  pauseTotalTimer();
  console.log(`Total time after 3s: ${getTotalSeconds()}s`);
  
  // efter 2s återuppta timer
  setTimeout(() => {
    startTotalTimer();
    
    // efter 2s, pausa igen
    setTimeout(() => {
      pauseTotalTimer();
      console.log(`Total time: ${getTotalSeconds()}s`);
    }, 2000);
  }, 2000);
}, 3000);

