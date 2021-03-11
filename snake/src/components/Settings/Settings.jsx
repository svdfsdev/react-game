import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { levelsList, gameboard_bkg, prey_bkg } from '../../utils/guide';
import {
  setBorder,
  setDifficulty,
  setGameBoardBkg,
  setMusicOnOFF,
  setMusicVolume,
  setPreyImg,
  setSoundOnOFF,
  setSoundVolume,
} from '../../reducers/settings';
import './Settings.scss';
import { Form } from 'react-bootstrap';

export const Settings = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  const turnOnOffBorderHandler = useCallback(() => {
    dispatch(setBorder());
  }, [dispatch]);

  const setGameboardBkgHandler = useCallback(
    (img) => dispatch(setGameBoardBkg(img)),
    [dispatch]
  );

  const setPreyImgHandler = useCallback(
    (img) => {
      dispatch(setPreyImg(img));
    },
    [dispatch]
  );

  const setGameLevelHandler = useCallback(
    (level) => dispatch(setDifficulty(level)),
    [dispatch]
  );

  const turnOnOffMusicHandler = useCallback(() => {
    dispatch(setMusicOnOFF());
  }, [dispatch]);

  const setMusicVolumeHandler = useCallback(
    (volume) => dispatch(setMusicVolume(volume)),
    [dispatch]
  );

  const turnOnOffSoundHandler = useCallback(() => {
    dispatch(setSoundOnOFF());
  }, [dispatch]);

  const setSoundVolumeHandler = useCallback(
    (volume) => {
      dispatch(setSoundVolume(volume));
    },
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
