import { SAVE_STATISTICS } from '../actions/actionsTypes';

const initialState = {
  results: [
    // { score: 101, timer: 74 },
    // { score: 1, timer: 2 },
    // { score: 21, timer: 3 },
    // { score: 34, timer: 4 },
    // { score: 7, timer: 5 },
    // { score: 25, timer: 6 },
    // { score: 99, timer: 7 },
    // { score: 11, timer: 8 },
    // { score: 11, timer: 9 },
    // { score: 11, timer: 10 },
    // { score: 5, timer: 11 },
    // { score: 2, timer: 12 },
  ],
};

export function statisticsReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_STATISTICS:
      return {
        results: [action.payload, ...state.results],
      };

    default:
      return state;
  }
}
