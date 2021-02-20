export function getRandomNumber(max, widthEl) {
  return Math.round(Math.random() * (max - 1)) * widthEl;
}

export function snakeInit() {
  const snakeX = 375;
  const snakeY = 225;

  return new Array(5)
    .fill('')
    .map((_, i) => (
      <div
        key={i}
        className="snake"
        style={{ left: `${snakeX - 25 * i}px`, top: `${snakeY}px` }}
      ></div>
    ));
}
