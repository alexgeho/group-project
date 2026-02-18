import './styles/style.scss'
import { login } from "./login";


login();





const currentPlayerId = localStorage.getItem('currentPlayerId');
const main = document.querySelector('main');



function showMain() {
    
}

if (currentPlayerId) {
    showMain();
}