export function getRandomNumber(max, widthEl) {
  return Math.round(Math.random() * (max - 1)) * widthEl;
}

export function getDisplayValue(value) {
  return value < 10 ? `0${value}` : `${value}`;
}
