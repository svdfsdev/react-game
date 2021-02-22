import {
  SET_BORDER,
  SET_LEVEL,
  SET_MUSIC_ON_OFF,
  SET_SOUND_ON_OFF,
} from '../actions/actionsTypes';

const initialState = {
  musicOn: true,
  musicVolume: 5,

  soundOn: true,
  soundVolume: 5,

  gameBorder: false,
  gameBoard: ['Lawn', 'Sand', 'Water'],
  gamePrey: ['Apple', 'Carrot', 'Coffee', 'Beer', 'Ice cream'],
  gameLevel: { label: 'Easy', value: 80 },
};

export function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MUSIC_ON_OFF:
      return {
        ...state,
        musicOn: !state.musicOn,
      };

    case SET_SOUND_ON_OFF:
      return {
        ...state,
        soundOn: !state.soundOn,
      };

    case SET_BORDER:
      return {
        ...state,
        gameBorder: !state.gameBorder,
      };

    case SET_LEVEL:
      return {
        ...state,
        gameLevel: action.payload,
      };

    default:
      return state;
  }
}
