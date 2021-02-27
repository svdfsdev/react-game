import { SAVE_STATISTICS } from './actionsTypes';

export function saveStatistics(game) {
  return {
    type: SAVE_STATISTICS,
    payload: game,
  };
}
