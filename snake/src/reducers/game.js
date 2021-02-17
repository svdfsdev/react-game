import { RESET_USER, SET_USER } from '../actions/actionsTypes';

const initialState = {
  user: {
    name: 'Guest',
    email: 'none',
    isLogin: false,
  },

  game: {
    score: 0,
    duration: 0,
    steps: [],
  },
};

export function gameReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case RESET_USER:
      return {
        ...state,
        user: initialState.user,
      };

    default:
      return state;
  }
}
