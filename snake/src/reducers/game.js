import { PLAY_GAME, RESET_USER, SET_USER } from '../actions/actionsTypes';

const initialState = {
  name: 'Guest',
  email: 'none',
  isLogin: false,

  isPlaying: false,
  score: 0,
  duration: 0,
  steps: [],
};

export function gameReducer(state = initialState, action) {
  switch (action.type) {
    case PLAY_GAME:
      return {
        ...state,
        isPlaying: !state.isPlaying,
      };

    default:
      return state;
  }
}
