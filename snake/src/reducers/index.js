import { combineReducers } from 'redux';
import { gameReducer } from './game';
import { settingsReducer } from './settings';
import { statisticsReducer } from './statistics';

export const rootReducer = combineReducers({
  game: gameReducer,
  settings: settingsReducer,
  statistics: statisticsReducer,
});
