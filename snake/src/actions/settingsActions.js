import {
  SET_BORDER,
  SET_LEVEL,
  SET_MUSIC_ON_OFF,
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
