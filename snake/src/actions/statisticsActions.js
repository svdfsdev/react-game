import { SAVE_PLAYER, SAVE_STATISTICS } from './actionsTypes';
import { savePlayer, saveStatistics } from '../utils/helper';

export function setStatistics(game) {
  saveStatistics(game);

  return {
    type: SAVE_STATISTICS,
    payload: game,
  };
}

export function setPlayer(name) {
  savePlayer(name);

  return {
    type: SAVE_PLAYER,
    payload: name,
  };
}
