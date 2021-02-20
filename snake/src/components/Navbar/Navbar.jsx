import React from 'react';
import { connect } from 'react-redux';
import {
  setLevel,
  turnOnOffBorder,
  turnOnOffMusic,
  turnOnOffSound,
} from '../../actions/settingsActions';
import { Button } from '../UI/Button/Button';
import { Dropdown } from '../UI/Dropdown/Dropdown';
import { levelIcon, volumeIcon, borderIcon } from '../../utils/icons';
import { levelsList } from '../../utils/guide';

const Navbar = (props) => {
  const { musicOn, soundOn, gameBorder } = props.settings;
  const { setLevel, turnOnOffMusic, turnOnOffSound, turnOnOffBorder } = props;

  return (
    <nav className="grey darken-2">
      <ul id="nav-mobile" className="right">
        <li className="navbar-item">
          <Dropdown
            label={'Level'}
            icon={levelIcon}
            values={levelsList}
            handler={setLevel}
          />
        </li>
        <li className="navbar-item">
          <Button
            label={'Border'}
            icon={borderIcon}
            value={gameBorder}
            handler={turnOnOffBorder}
          />
        </li>
        <li className="navbar-item">
          <Button
            label={'Music'}
            icon={volumeIcon}
            value={musicOn}
            handler={turnOnOffMusic}
          />
        </li>
        <li className="navbar-item">
          <Button
            label={'Sounds'}
            icon={volumeIcon}
            value={soundOn}
            handler={turnOnOffSound}
          />
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = (store) => ({
  settings: store.settings,
});

const mapDispatchToProps = (dispatch) => ({
  setLevel: (level) => dispatch(setLevel(level)),
  turnOnOffMusic: () => dispatch(turnOnOffMusic()),
  turnOnOffSound: () => dispatch(turnOnOffSound()),
  turnOnOffBorder: () => dispatch(turnOnOffBorder()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
