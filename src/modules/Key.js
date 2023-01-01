class Key {
  constructor(aDown, aUp, bDown, bUp, extraClass, keyCode) {
    this.aDown = aDown;
    this.aUp = aUp;
    this.bDown = bDown;
    this.bUp = bUp;
    this.extraClass = extraClass;
    this.keyCode = keyCode;
  }

  getKeyHTML() {
    const { aDown, aUp, bDown, bUp, extraClass, keyCode } = this;
    return `<div class="keyboard__key ${extraClass}" id=${keyCode}>
      <div class = 'langA'>
        <span class='caseDown' data-char=${aDown}>${aDown}</span>
        <span class='caseUp' data-char=${aUp}>${aUp}</span>
      </div>
      <div class = 'langB'>
      <span class='caseDown' data-char=${bDown}> ${bDown} </span>
      <span class='caseUp' data-char=${bUp}> ${bUp} </span>
      </div>
    </div>`;
  }
}

export default Key;
