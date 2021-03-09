import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { levelsList, gameboard_bkg, prey_bkg } from '../../utils/guide';
import './Settings.scss';
import { Form } from 'react-bootstrap';
import {
  SET_BORDER,
  SET_GAMEBOARD_BKG,
  SET_LEVEL,
  SET_MUSIC_ON_OFF,
  SET_MUSIC_VOLUME,
  SET_PREY_IMG,
  SET_SOUND_ON_OFF,
  SET_SOUND_VOLUME,
} from '../../actions/actionsTypes';

export const Settings = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  const turnOnOffBorderHandler = useCallback(() => {
    dispatch({ type: SET_BORDER });
  }, [dispatch]);

  const turnOnOffMusicHandler = useCallback(() => {
    dispatch({ type: SET_MUSIC_ON_OFF });
  }, [dispatch]);

  const setMusicVolumeHandler = useCallback(
    (volume) =>
      dispatch({
        type: SET_MUSIC_VOLUME,
        payload: volume,
      }),
    [dispatch]
  );

  const turnOnOffSoundHandler = useCallback(
    () => dispatch({ type: SET_SOUND_ON_OFF }),
    [dispatch]
  );

  const setSoundVolumeHandler = useCallback(
    (volume) =>
      dispatch({
        type: SET_SOUND_VOLUME,
        payload: volume,
      }),
    [dispatch]
  );

  const setGameLevelHandler = useCallback(
    (level) =>
      dispatch({
        type: SET_LEVEL,
        payload: level,
      }),
    [dispatch]
  );

  const setGameboardBkgHandler = useCallback(
    (img) =>
      dispatch({
        type: SET_GAMEBOARD_BKG,
        payload: img,
      }),
    [dispatch]
  );

  const setPreyImgHandler = useCallback(
    (img) =>
      dispatch({
        type: SET_PREY_IMG,
        payload: img,
      }),
    [dispatch]
  );

  return (
    <div className="Settings">
      <h1>Settings</h1>

      <Form className="align-items-center">
        <Form.Check
          type="switch"
          id="custom-switch-border"
          label="Border"
          checked={settings.gameBorder}
          onChange={turnOnOffBorderHandler}
        />

        <hr />

        <Form.Check
          type="switch"
          id="custom-switch-music"
          label="Music"
          checked={settings.musicOn}
          onChange={turnOnOffMusicHandler}
        />

        <Form.Group
          controlId="music-volume"
          onChange={(e) => setMusicVolumeHandler(+e.target.value)}
        >
          <Form.Label>Music volume</Form.Label>
          <Form.Control type="range" defaultValue={settings.musicVolume} />
        </Form.Group>

        <hr />

        <Form.Check
          type="switch"
          id="custom-switch-sound"
          label="Sound"
          checked={settings.soundOn}
          onChange={turnOnOffSoundHandler}
        />

        <Form.Group
          controlId="sound-volume"
          onChange={(e) => setSoundVolumeHandler(+e.target.value)}
        >
          <Form.Label>Sound volume</Form.Label>
          <Form.Control type="range" defaultValue={settings.soundVolume} />
        </Form.Group>

        <hr />

        <Form.Group
          onChange={(e) => setGameLevelHandler(e.target.value)}
          controlId="exampleForm.SelectCustomSizeSm"
        >
          <Form.Label>Game difficulty</Form.Label>
          <Form.Control
            as="select"
            size="sm"
            custom
            defaultValue={settings.gameLevel}
          >
            {levelsList.map((it, i) => {
              return (
                <option value={i} key={i}>
                  {it.label}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>

        <hr />

        <Form.Group
          onChange={(e) => setGameboardBkgHandler(e.target.value)}
          controlId="exampleForm.SelectCustomSizeSm"
        >
          <Form.Label>Gameboard background</Form.Label>
          <Form.Control
            as="select"
            size="sm"
            custom
            defaultValue={settings.gameBoard}
          >
            {gameboard_bkg.map((it, i) => {
              return (
                <option value={i} key={i}>
                  {it}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>

        <hr />

        <Form.Group
          onChange={(e) => setPreyImgHandler(e.target.value)}
          controlId="exampleForm.SelectCustomSizeSm"
        >
          <Form.Label>Prey image</Form.Label>
          <Form.Control
            as="select"
            size="sm"
            custom
            defaultValue={settings.gamePrey}
          >
            {prey_bkg.map((it, i) => {
              return (
                <option value={i} key={i}>
                  {it}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
      </Form>
    </div>
  );
};
