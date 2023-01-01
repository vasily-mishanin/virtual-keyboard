import Key from './Key';
import keys from './keys';
console.log('keys', keys);

class Keyboard {
  constructor(langA, langB) {
    this.langA = langA;
    this.langB = langB;
    this.currentLang = window.localStorage.getItem('lang') || this.langA;
    this.lowerCase = true;
    this.map = {};
    this.keys = keys;
  }

  firstRowHTML = () => {
    console.log('firstRowHTML', this.keys);
    const firstRowKeys = this.keys.firstRowChars.map((chars) => new Key(...chars));
    const keys = firstRowKeys.map((key) => key.getKeyHTML());
    const keyBACKSPACE = new Key('&#9003;', '', '&#9003;', '', 'backspace', 'Backspace');
    keys.push(keyBACKSPACE.getKeyHTML());
    return `<div class ="keyboard__row">${keys.join('\n')}</div>`;
  };

  secondRowHTML = () => {
    const keyTAB = new Key('Tab', '', 'Tab', '', 'tab', 'Tab');
    const secondRowKeys = this.keys.secondRowChars.map((chars) => new Key(...chars));
    const keys = secondRowKeys.map((key) => key.getKeyHTML());
    keys.unshift(keyTAB.getKeyHTML());
    const keyENTER = new Key('Enter', '', 'Enter', '', 'enter', 'Enter');
    keys.push(keyENTER.getKeyHTML());
    return `<div class ="keyboard__row">${keys.join('\n')}</div>`;
  };

  thirdRowHTML = () => {
    const keyCAPSLOCK = new Key('CapsLock', '', 'CapsLock', '', 'capslock', 'CapsLock');
    const thirdRowKeys = this.keys.thirdRowChars.map((chars) => new Key(...chars));
    const keys = thirdRowKeys.map((key) => key.getKeyHTML());
    keys.unshift(keyCAPSLOCK.getKeyHTML());
    return `<div class ="keyboard__row">${keys.join('\n')}</div>`;
  };

  fourthRowHTML = () => {
    const keyShiftLeft = new Key('Shift', '', 'Shift', '', 'shift-left', 'ShiftLeft');
    const keyShiftRight = new Key('Shift', '', 'Shift', '', 'shift-right', 'ShiftRight');
    const fourthRowKeys = this.keys.fourthRowChars.map((chars) => new Key(...chars));
    const keys = fourthRowKeys.map((key) => key.getKeyHTML());
    keys.unshift(keyShiftLeft.getKeyHTML());
    keys.push(keyShiftRight.getKeyHTML());
    return `<div class ="keyboard__row">${keys.join('\n')}</div>`;
  };

  fifthRowHTML = () => {
    const fifthRowKeys = this.keys.fifthRowChars.map((chars) => new Key(...chars));
    const keysHTML = fifthRowKeys.map((key) => key.getKeyHTML());
    const arrowsHTML = `<div class="arrows">
      <span class="arrows__left arrow-key" id="ArrowLeft" data-char="&#9664;">&#9664;</span>
      <div class="arrows__center">
          <span class="arrows__up arrow-key" id="ArrowUp" data-char="&#9650;">&#9650;</span>
          <span class="arrows__down arrow-key" id="ArrowDown" data-char="&#9660;">&#9660;</span>
      </div>
      <span class="arrows__right arrow-key" id="ArrowRight" data-char="&#9654;"> &#9654;</span>
      </div>`;
    return `<div class ="keyboard__row bottom-row">${keysHTML.join('\n')} \n ${arrowsHTML}</div>`;
  };

  initRender = (container) => {
    console.log('currentLang', this.currentLang);
    console.log('container', container);

    const keyboardContainer = document.createElement('div');
    keyboardContainer.classList.add('keyboard');
    container.append(keyboardContainer);
    console.log('keyboardContainer', keyboardContainer);
    console.log('this', this.firstRowHTML);

    keyboardContainer.innerHTML += this.firstRowHTML();
    keyboardContainer.innerHTML += this.secondRowHTML();
    keyboardContainer.innerHTML += this.thirdRowHTML();
    keyboardContainer.innerHTML += this.fourthRowHTML();
    keyboardContainer.innerHTML += this.fifthRowHTML();
    if (this.currentLang === 'EN') {
      keyboardContainer.querySelectorAll('.langB').forEach((el) => el.classList.add('hidden'));
      const letters = keyboardContainer.querySelectorAll('.letter');
      letters.forEach((key) => {
        key.querySelector('.caseUp').classList.add('hidden');
      });
    } else {
      keyboardContainer.querySelectorAll('.langA').forEach((el) => el.classList.add('hidden'));
      const letters = keyboardContainer.querySelectorAll('.letter');
      letters.forEach((key) => {
        key.querySelector('.caseUp').classList.add('hidden');
      });
    }
  };

  changeLanguage = (keyboardContainer) => {
    console.log('this.currentLang =>', this.currentLang);
    if (this.currentLang === 'EN') {
      keyboardContainer.querySelectorAll('.langA').forEach((el) => el.classList.add('hidden'));
      keyboardContainer.querySelectorAll('.langB').forEach((el) => el.classList.remove('hidden'));
      window.localStorage.setItem('lang', 'RU');
      this.currentLang = 'RU';
    } else if (this.currentLang === 'RU') {
      keyboardContainer.querySelectorAll('.langB').forEach((el) => el.classList.add('hidden'));
      keyboardContainer.querySelectorAll('.langA').forEach((el) => el.classList.remove('hidden'));
      window.localStorage.setItem('lang', 'EN');
      this.currentLang = 'EN';
    }
  };

  toLowerCaseLetters = (keyboardContainer) => {
    const letters = keyboardContainer.querySelectorAll('.letter');
    letters.forEach((key) => {
      key.querySelectorAll('.caseUp').forEach((el) => {
        el.classList.add('hidden');
      });
      key.querySelectorAll('.caseDown').forEach((el) => {
        el.classList.remove('hidden');
      });
    });
  };

  toUppersCaseLetters = (keyboardContainer) => {
    const letters = keyboardContainer.querySelectorAll('.letter');
    letters.forEach((key) => {
      key.querySelectorAll('.caseDown').forEach((el) => {
        el.classList.add('hidden');
      });
      key.querySelectorAll('.caseUp').forEach((el) => {
        el.classList.remove('hidden');
      });
    });
  };

  listenKeyboard = () => {
    const keybpard = document.querySelector('.keyboard');
    console.log(keybpard);

    document.addEventListener('keydown', (e) => {
      this.map[e.code] = true;
      if (e.code === 'Tab') {
        e.preventDefault();
        const textArea = document.querySelector('.textarea');
        const start = textArea.selectionStart;
        const end = textArea.selectionEnd;
        textArea.value = textArea.value.substring(0, start) + '\t' + textArea.value.substring(end);
        textArea.selectionStart = textArea.selectionEnd = start + 1;
      }

      if (e.getModifierState('CapsLock')) {
        this.toUppersCaseLetters(document.querySelector('.keyboard'));
      }

      if (e.getModifierState('Shift')) {
        this.toUppersCaseLetters(document.querySelector('.keyboard'));
      }

      if (this.map['ControlLeft'] && this.map['Space']) {
        this.changeLanguage(document.querySelector('.keyboard'));
        document.getElementById(e.code).classList.remove('active');
      }

      document.getElementById(e.code).classList.add('active');
    });

    document.addEventListener('keyup', (e) => {
      this.map[e.code] = false;
      if (!e.getModifierState('CapsLock')) {
        this.toLowerCaseLetters(document.querySelector('.keyboard'));
      }

      if (!e.getModifierState('CapsLock')) {
        this.toLowerCaseLetters(document.querySelector('.keyboard'));
      }

      document.getElementById(e.code).classList.remove('active');
    });

    keybpard.addEventListener('mousedown', (e) => {
      console.log('mousedown');
      let char = e.target.dataset.char;
      const key = e.target.closest('.keyboard__key') || e.target.closest('.arrow-key');
      if (!char) {
        const span = key.querySelector('span');
        char = span.dataset.char;
        console.log(char);
      }
      const textArea = document.querySelector('.textarea');
      const start = textArea.selectionStart;
      const end = textArea.selectionEnd;
      const addChar = (char) => {
        textArea.value = textArea.value.substring(0, start) + char + textArea.value.substring(end);
        textArea.selectionStart = textArea.selectionEnd = start + 1;
      };
      key.classList.add('active');
      if (key.id === 'Space') {
        addChar(' ');
      } else if (key.id === 'Tab') {
        addChar('\t');
      } else if (key.id === 'Enter') {
        addChar('\n');
      } else {
        addChar(char ? char : '');
      }
    });

    keybpard.addEventListener('mouseup', (e) => {
      const key = e.target.closest('.keyboard__key') || e.target.closest('.arrow-key');
      key.classList.remove('active');
    });
  };
}

export default Keyboard;
