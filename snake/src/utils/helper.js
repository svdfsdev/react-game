export function getRandomNumber(max, widthEl) {
  return Math.round(Math.random() * (max - 1)) * widthEl;
}

export function getDisplayValue(value) {
  return value < 10 ? `0${value}` : `${value}`;
}

// export function initSnake(x, y) {
//   return (
//     <div
//       key={0}
//       className="snake"
//       style={{
//         left: `${x}px`,
//         top: `${y}px`,
//       }}
//     ></div>
//   );
// }
