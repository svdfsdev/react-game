import { combineReducers } from 'redux';
import { gameReducer } from './game';
import { settingsReduer } from './settings';
import { statisticsReducer } from './statistics';

export const rootReducer = combineReducers({
  game: gameReducer,
  settings: settingsReduer,
  statistics: statisticsReducer,
});
