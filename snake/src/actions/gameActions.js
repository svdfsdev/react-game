import { PLAY_GAME, SET_FULL_SCREEN } from './actionsTypes';

export function playGame() {
  return {
    type: PLAY_GAME,
  };
}

export function setFullScreen() {
  return {
    type: SET_FULL_SCREEN,
  };
}
