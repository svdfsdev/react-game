import { SAVE_PLAYER, SAVE_STATISTICS } from '../actions/actionsTypes';

const initialState = {
  player: localStorage.playerName || null,
  results: localStorage.results
    ? JSON.parse(localStorage.results)
    : [
        { score: 16, timer: 67 },
        { score: 31, timer: 215 },
        { score: 16, timer: 43 },
        { score: 9, timer: 22 },
        { score: 1, timer: 7 },
        { score: 7, timer: 43 },
        { score: 57, timer: 631 },
        { score: 33, timer: 217 },
        { score: 5, timer: 36 },
        { score: 4, timer: 28 },
      ],
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
