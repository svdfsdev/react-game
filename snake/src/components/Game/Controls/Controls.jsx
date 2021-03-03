import React, { useEffect, useState, useRef } from 'react';
import './Controls.scss';
import { Button } from 'react-bootstrap';
import { fullScreenOpen, fullScreenCancel } from '../../../utils/helper';

export const Controls = ({
  resetGame,
  isPlaying,
  isGameOver,
  startStopGame,
}) => {
  const app = useRef();
  const [isFullScreen, setIsFullScreen] = useState(false);
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

  useEffect(() => {
    app.current = document.querySelector('.App');
  });

  const fullScreenHandler = () => {
    if (isFullScreen) {
      fullScreenCancel();
    } else {
      fullScreenOpen(app.current);
    }

    setIsFullScreen((prev) => !prev);
  };

  return (
    <div className={classes.join(' ')}>
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
