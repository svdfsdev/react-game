export function getRandomNumber(max, widthEl) {
  return Math.round(Math.random() * (max - 1)) * widthEl;
}

export function getDisplayValue(value) {
  return value < 10 ? `0${value}` : `${value}`;
}

export function getElemWidth(elem) {
  return elem.getBoundingClientRect().width;
}

export function initGameboard() {
  const clientWidth = document.documentElement.clientWidth;
  const box = Math.trunc(clientWidth / 40);

  return box > 25 ? 25 : box;
}

export function fullScreenOpen(app) {
  if (app.requestFullscreen) {
    app.requestFullscreen();
  } else if (app.webkitrequestFullscreen) {
    app.webkitRequestFullscreen();
  } else if (app.mozRequestFullscreen) {
    app.mozRequestFullScreen();
  }
}

export function fullScreenCancel() {
  if (document.cancelFullScreen) {
    document.cancelFullScreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen();
  }
}

export function unfocusButton(e) {
  e.target.blur();
}
