import React, { useEffect, useRef } from 'react';
import './Controls.scss';
import { Button } from 'react-bootstrap';
import { fullScreenOpen, fullScreenCancel } from '../../../utils/helper';

export const Controls = ({
  resetGame,
  isPlaying,
  isGameOver,
  startStopGame,
  autoPlayHandler,
}) => {
  const app = useRef();
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

  const autoPlayBtn = {
    label: 'Auto play',
    variant: 'info',
  };

  useEffect(() => {
    app.current = document.querySelector('.App');
  });

  const fullScreenHandler = () => {
    if (document.fullscreenElement) {
      fullScreenCancel();
    } else {
      fullScreenOpen(app.current);
    }
  };

  return (
    <div className={classes.join(' ')}>
      <Button variant={autoPlayBtn.variant} onClick={autoPlayHandler}>
        {autoPlayBtn.label}
      </Button>

      <Button variant={fullScreenBtn.variant} onClick={fullScreenHandler}>
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
