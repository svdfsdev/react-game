import {
  SET_BORDER,
  SET_GAMEBOARD_BKG,
  SET_LEVEL,
  SET_MUSIC_ON_OFF,
  SET_SOUND_VOLUME,
  SET_MUSIC_VOLUME,
  SET_PREY_IMG,
  SET_SOUND_ON_OFF,
} from './actionsTypes';

export function turnOnOffMusic() {
  return {
    type: SET_MUSIC_ON_OFF,
  };
}

export function turnOnOffSound() {
  return {
    type: SET_SOUND_ON_OFF,
  };
}

export function turnOnOffBorder() {
  return {
    type: SET_BORDER,
  };
}

export function setLevel(level) {
  return {
    type: SET_LEVEL,
    payload: level,
  };
}

export function setGameboardBkg(img) {
  return {
    type: SET_GAMEBOARD_BKG,
    payload: img,
  };
}

export function setPreyImg(img) {
  return {
    type: SET_PREY_IMG,
    payload: img,
  };
}

export function setMusicVolume(volume) {
  return {
    type: SET_MUSIC_VOLUME,
    payload: volume,
  };
}

export function setSoundVolume(volume) {
  return {
    type: SET_SOUND_VOLUME,
    payload: volume,
  };
}
