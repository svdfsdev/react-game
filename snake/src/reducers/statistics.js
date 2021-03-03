import { SAVE_STATISTICS } from '../actions/actionsTypes';

const initialState = {
  results: [
    // { score: 111, timer: 55 },
    // { score: 33, timer: 147 },
    // { score: 9, timer: 25 },
    // { score: 21, timer: 46 },
    // { score: 352, timer: 746 },
    // { score: 13, timer: 411 },
    // { score: 61, timer: 66 },
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
