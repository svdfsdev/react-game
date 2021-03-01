import React from 'react';
import './Settings.scss';
import { connect } from 'react-redux';
import {
  turnOnOffBorder,
  setLevel,
  turnOnOffMusic,
  turnOnOffSound,
  setGameboardBkg,
  setPreyImg,
  setMusicVolume,
  setSoundVolume,
} from '../../actions/settingsActions';
import { levelsList, gameboard_bkg, prey_bkg } from '../../utils/guide';
import { Form } from 'react-bootstrap';

const Settings = (props) => {
  const {
    gameBorder,
    gameLevel,
    gameBoard,
    gamePrey,
    musicOn,
    musicVolume,
    soundOn,
    soundVolume,
  } = props.settings;
  const {
    turnOnOffBorder,
    setLevel,
    setGameboardBkg,
    setPreyImg,
    turnOnOffMusic,
    setMusicVolume,
    turnOnOffSound,
    setSoundVolume,
  } = props;

  return (
    <div className="Settings">
      <h1>Settings</h1>

      <Form className="align-items-center">
        <Form.Check
          type="switch"
          id="custom-switch-border"
          label="Border"
          checked={gameBorder}
          onChange={turnOnOffBorder}
        />

        <hr />

        <Form.Check
          type="switch"
          id="custom-switch-music"
          label="Music"
          checked={musicOn}
          onChange={turnOnOffMusic}
        />

        <Form.Group
          controlId="music-volume"
          onChange={(e) => setMusicVolume(+e.target.value)}
        >
          <Form.Label>Music volume</Form.Label>
          <Form.Control type="range" defaultValue={musicVolume} />
        </Form.Group>

        <hr />

        <Form.Check
          type="switch"
          id="custom-switch-sound"
          label="Sound"
          checked={soundOn}
          onChange={turnOnOffSound}
        />

        <Form.Group
          controlId="sound-volume"
          onChange={(e) => setSoundVolume(+e.target.value)}
        >
          <Form.Label>Sound volume</Form.Label>
          <Form.Control type="range" defaultValue={soundVolume} />
        </Form.Group>

        <hr />

        <Form.Group
          onChange={(e) => setLevel(e.target.value)}
          controlId="exampleForm.SelectCustomSizeSm"
        >
          <Form.Label>Game difficulty</Form.Label>
          <Form.Control as="select" size="sm" custom defaultValue={gameLevel}>
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
          onChange={(e) => setGameboardBkg(e.target.value)}
          controlId="exampleForm.SelectCustomSizeSm"
        >
          <Form.Label>Gameboard background</Form.Label>
          <Form.Control as="select" size="sm" custom defaultValue={gameBoard}>
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
          onChange={(e) => setPreyImg(e.target.value)}
          controlId="exampleForm.SelectCustomSizeSm"
        >
          <Form.Label>Prey image</Form.Label>
          <Form.Control as="select" size="sm" custom defaultValue={gamePrey}>
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

const mapStateToProps = (store) => ({
  settings: store.settings,
});

const mapDispatchToProps = (dispatch) => ({
  turnOnOffBorder: () => dispatch(turnOnOffBorder()),
  setLevel: (level) => dispatch(setLevel(level)),
  setGameboardBkg: (img) => dispatch(setGameboardBkg(img)),
  setPreyImg: (img) => dispatch(setPreyImg(img)),
  turnOnOffMusic: () => dispatch(turnOnOffMusic()),
  setMusicVolume: (volume) => dispatch(setMusicVolume(volume)),
  turnOnOffSound: () => dispatch(turnOnOffSound()),
  setSoundVolume: (volume) => dispatch(setSoundVolume(volume)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
