import React from 'react';
import './Controls.scss';
import { Button } from '../../UI/Button/Button';
import { playPauseIcon, fullScreenIcon, againIcon } from '../../../utils/icons';

export const Controls = ({
  isPlaying,
  isFullScreen,
  startStopGame,
  setFullScreen,
  newGameHandler,
}) => {
  return (
    <div className="Controls">
      <Button
        icon={fullScreenIcon}
        btnType={'floating'}
        value={isFullScreen}
        handler={setFullScreen}
      />

      <Button
        icon={againIcon}
        btnType={'floating btn-large'}
        value={true}
        color={'amber darken-3'}
        handler={newGameHandler}
      />

      <Button
        icon={playPauseIcon}
        btnType={'floating btn-large'}
        value={isPlaying}
        color={true}
        handler={startStopGame}
      />
    </div>
  );
};
