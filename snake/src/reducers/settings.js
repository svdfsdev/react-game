import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState = {
  musicOn: true,
  musicVolume: 1,

  soundOn: true,
  soundVolume: 1,

  gameBorder: false,
  gameBoard: 0,
  gamePrey: 0,
  gameLevel: 0,
};

const SET_BORDER = 'settings/setBorder';
const SET_GAMEBOARD_BKG = 'settings/setGameBoardBkg';
const SET_PREY_IMG = 'settings/setPreyImg';
const SET_DIFFICULTY = 'settings/setDifficulty';
const SET_MUSIC_ON_OFF = 'settings/setMusicOnOFF';
const SET_MUSIC_VOLUME = 'settings/setMusicVolume';
const SET_SOUND_ON_OFF = 'settings/setSoundOnOFF';
const SET_SOUND_VOLUME = 'settings/setSoundVolume';

export const setBorder = createAction(SET_BORDER);

export const setGameBoardBkg = createAction(SET_GAMEBOARD_BKG);

export const setPreyImg = createAction(SET_PREY_IMG);

export const setDifficulty = createAction(SET_DIFFICULTY);

export const setMusicOnOFF = createAction(SET_MUSIC_ON_OFF);

export const setMusicVolume = createAction(SET_MUSIC_VOLUME);

export const setSoundOnOFF = createAction(SET_SOUND_ON_OFF);

export const setSoundVolume = createAction(SET_SOUND_VOLUME);

export const settingsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setBorder, (state) => ({
      ...state,
      gameBorder: !state.gameBorder,
    }))

    .addCase(setGameBoardBkg, (state, action) => ({
      ...state,
      gameBoard: action.payload,
    }))

    .addCase(setPreyImg, (state, action) => ({
      ...state,
      gamePrey: action.payload,
    }))

    .addCase(setDifficulty, (state, action) => ({
      ...state,
      gameLevel: action.payload,
    }))

    .addCase(setMusicOnOFF, (state) => ({
      ...state,
      musicOn: !state.musicOn,
    }))

    .addCase(setMusicVolume, (state, action) => ({
      ...state,
      musicVolume: action.payload,
    }))

    .addCase(setSoundOnOFF, (state) => ({
      ...state,
      soundOn: !state.soundOn,
    }))

    .addCase(setSoundVolume, (state, action) => ({
      ...state,
      soundVolume: action.payload,
    }))

    .addDefaultCase((state) => state);
});
