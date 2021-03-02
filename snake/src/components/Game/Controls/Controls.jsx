import React from 'react';
import './Controls.scss';
import { Button } from 'react-bootstrap';

export const Controls = ({
  resetGame,
  isPlaying,
  isGameOver,
  startStopGame,
  setFullScreen,
}) => {
  const classes = ['Controls'];

  if (isGameOver) {
    classes.push('visible');
  }

  const playBtn = {
    label: isPlaying ? 'Pause' : 'Play',
    variant: isPlaying ? 'danger' : 'success',
  };

  const newGameBtn = {
    label: 'New game',
    variant: 'warning',
  };

  const fullScreenBtn = {
    label: 'Full screen',
    variant: 'primary',
  };

  return (
    <div className={classes.join(' ')}>
      <Button variant={fullScreenBtn.variant} onClick={setFullScreen}>
        {fullScreenBtn.label}
      </Button>

      <Button variant={newGameBtn.variant} onClick={resetGame}>
        {newGameBtn.label}
      </Button>

      <Button variant={playBtn.variant} onClick={startStopGame}>
        {playBtn.label}
      </Button>
    </div>
  );
};
