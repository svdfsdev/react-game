import { SAVE_STATISTICS } from '../actions/actionsTypes';

const initialState = {
  statistics: [],
};

export function statisticsReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_STATISTICS:
      return {
        statistics: [action.payload, ...state.statistics],
      };

    default:
      return state;
  }
}
