import React from 'react';
import { connect } from 'react-redux';
import './Navbar.scss';
import {
  setLevel,
  turnOnOffBorder,
  turnOnOffMusic,
  turnOnOffSound,
} from '../../actions/settingsActions';
import { Burger } from '../UI/Burger/Burger';
import { Button } from '../UI/Button/Button';
import { Dropdown } from '../UI/Dropdown/Dropdown';
import {
  levelIcon,
  volumeIcon,
  borderIcon,
  playPauseIcon,
} from '../../utils/icons';
import { levelsList } from '../../utils/guide';
import { playGame } from '../../actions/gameActions';

const Navbar = (props) => {
  const { isPlaying } = props.game;
  const { musicOn, soundOn, gameBorder } = props.settings;
  const {
    playGame,
    setLevel,
    turnOnOffMusic,
    turnOnOffSound,
    turnOnOffBorder,
  } = props;

  return (
    <nav className="grey darken-2">
      <Burger />

      <ul id="nav-mobile" className="right">
        <li>
          <Dropdown
            label={'Level'}
            icon={levelIcon}
            values={levelsList}
            handler={setLevel}
          />
        </li>
        <li>
          <Button
            label={'Border'}
            icon={borderIcon}
            value={gameBorder}
            handler={turnOnOffBorder}
          />
        </li>
        <li>
          <Button
            label={'Music'}
            icon={volumeIcon}
            value={musicOn}
            handler={turnOnOffMusic}
          />
        </li>
        <li>
          <Button
            label={'Sounds'}
            icon={volumeIcon}
            value={soundOn}
            handler={turnOnOffSound}
          />
        </li>
        <li>
          <Button
            icon={playPauseIcon}
            btnType={'floating'}
            value={isPlaying}
            handler={playGame}
          />
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = (store) => ({
  game: store.game,
  settings: store.settings,
});

const mapDispatchToProps = (dispatch) => ({
  playGame: () => dispatch(playGame()),
  setLevel: (level) => dispatch(setLevel(level)),
  turnOnOffMusic: () => dispatch(turnOnOffMusic()),
  turnOnOffSound: () => dispatch(turnOnOffSound()),
  turnOnOffBorder: () => dispatch(turnOnOffBorder()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
