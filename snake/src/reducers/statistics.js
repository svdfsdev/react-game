import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState = {
  player: localStorage.playerName || null,
  results: localStorage.results ? JSON.parse(localStorage.results) : [],
};

const SAVE_PLAYER = 'statistics/savePlayer';
export const savePlayer = createAction(SAVE_PLAYER);

const SAVE_GAME_RESULT = 'statistics/saveGameResult';
export const saveGameResult = createAction(SAVE_GAME_RESULT);

export const statisticsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(savePlayer, (state, action) => ({
      ...state,
      player: action.payload,
    }))
    .addCase(saveGameResult, (state, action) => ({
      ...state,
      results: [action.payload, ...state.results],
    }))
    .addDefaultCase((state, action) => state);
});
