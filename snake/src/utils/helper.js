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
