import { SAVE_PLAYER, SAVE_STATISTICS } from '../actions/actionsTypes';

const initialState = {
  player: localStorage.playerName || null,
  results: localStorage.results ? JSON.parse(localStorage.results) : [],
};

export function statisticsReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_STATISTICS:
      return {
        ...state,
        results: [action.payload, ...state.results],
      };

    case SAVE_PLAYER:
      return {
        ...state,
        player: action.payload,
      };

    default:
      return state;
  }
}
