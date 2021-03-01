import {
  SET_BORDER,
  SET_GAMEBOARD_BKG,
  SET_LEVEL,
  SET_PREY_IMG,
  SET_MUSIC_ON_OFF,
  SET_MUSIC_VOLUME,
  SET_SOUND_ON_OFF,
  SET_SOUND_VOLUME,
} from '../actions/actionsTypes';

const initialState = {
  musicOn: true,
  musicVolume: 50,

  soundOn: true,
  soundVolume: 50,

  gameBorder: false,
  gameBoard: 0,
  gamePrey: 0,
  gameLevel: 0,
};

export function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MUSIC_ON_OFF:
      return {
        ...state,
        musicOn: !state.musicOn,
      };

    case SET_MUSIC_VOLUME:
      return {
        ...state,
        musicVolume: action.payload,
      };

    case SET_SOUND_ON_OFF:
      return {
        ...state,
        soundOn: !state.soundOn,
      };

    case SET_SOUND_VOLUME:
      return {
        ...state,
        soundVolume: action.payload,
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

    case SET_GAMEBOARD_BKG:
      return {
        ...state,
        gameBoard: action.payload,
      };

    case SET_PREY_IMG:
      return {
        ...state,
        gamePrey: action.payload,
      };

    default:
      return state;
  }
}
