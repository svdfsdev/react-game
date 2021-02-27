import React from 'react';
import './Controls.scss';
import { Button } from '../../UI/Button/Button';
import { playPauseIcon, fullScreenIcon, againIcon } from '../../../utils/icons';

export const Controls = ({
  resetGame,
  isPlaying,
  isGameOver,
  isFullScreen,
  startStopGame,
  setFullScreen,
}) => {
  return (
    // <div className="Controls">
    <div className={`Controls ${isGameOver ? 'visible' : ''}`}>
      <Button
        icon={fullScreenIcon}
        btnType={'floating btn-large'}
        value={isFullScreen}
        color={'blue'}
        handler={setFullScreen}
      />

      <Button
        icon={againIcon}
        btnType={'floating btn-large'}
        value={true}
        color={'amber darken-3'}
        handler={resetGame}
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
