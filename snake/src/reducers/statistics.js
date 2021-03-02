import { SAVE_STATISTICS } from '../actions/actionsTypes';

const initialState = {
  results: [],
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
