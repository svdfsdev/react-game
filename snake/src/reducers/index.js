import { combineReducers } from 'redux';
import { settingsReducer } from './settings';
import { statisticsReducer } from './statistics';

export const rootReducer = combineReducers({
  settings: settingsReducer,
  statistics: statisticsReducer,
});
