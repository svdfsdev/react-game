import { url } from './guide';

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

export async function saveStatistics(game) {
  if (localStorage.results) {
    let localStat = JSON.parse(localStorage.results);

    localStat = [game, ...localStat];
    localStorage.results = JSON.stringify(localStat);
  } else {
    localStorage.results = JSON.stringify([game]);
  }

  await fetch(`${url}/update-statistics`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      name: localStorage.playerName,
      statistics: [game],
    }),
  });
}

export async function savePlayer(name) {
  localStorage.playerName = name;

  await fetch(`${url}/add-user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      name: name,
      statistics: [],
    }),
  });
}

export async function getStatistics() {
  const allStat = await fetch(`${url}/statistics/${localStorage.playerName}`);
  const res = await allStat.json();

  return res;
}
