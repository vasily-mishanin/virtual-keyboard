import './styles/styles.css';
import Keyboard from './modules/Keyboard';

const keyboard = new Keyboard('EN', 'RU');

const root = document.createElement('div');
const logo = document.createElement('img');
const heading = document.createElement('h1');
const textarea = document.createElement('textarea');
textarea.setAttribute('autofocus', '');
root.classList.add('root');
logo.src = './favicon.ico';
logo.style.width = '80px';
textarea.classList.add('textarea');
heading.classList.add('heading');
heading.textContent = 'Virtual Keyboard';
document.body.appendChild(root);
root.appendChild(logo);
root.appendChild(heading);
root.appendChild(textarea);

keyboard.initRender(root);
keyboard.listenKeyboard();

const footerHTML =
  '<p>Эта клавиатура сделана на MacOS</p> <p>Для переключения языка комбинация: левая control +  Space</p>';
const footer = document.createElement('footer');
footer.classList.add('footer');
footer.innerHTML = footerHTML;
root.appendChild(footer);
