import { PLAY_GAME, SET_FULL_SCREEN } from '../actions/actionsTypes';

const initialState = {
  name: 'Guest',
  email: 'none',
  isLogin: false,
  isFullScreen: false,
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

    case SET_FULL_SCREEN:
      return {
        ...state,
        isFullScreen: !state.isFullScreen,
      };

    default:
      return state;
  }
}
