import React, { useEffect, useRef } from 'react';
import { fullScreenOpen, fullScreenCancel } from '../../../utils/helper';
import classNames from 'classnames';
import './Controls.scss';
import { Button } from 'react-bootstrap';

export const Controls = ({
  resetGame,
  isPlaying,
  isGameOver,
  startStopGame,
  autoPlayHandler,
}) => {
  const app = useRef();
  const classes = classNames('Controls', { visible: isGameOver });

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
    <div className={classes}>
      <Button
        variant={autoPlayBtn.variant}
        onClick={autoPlayHandler}
        className="btn-control"
      >
        {autoPlayBtn.label}
      </Button>

      <Button
        variant={fullScreenBtn.variant}
        onClick={fullScreenHandler}
        className="btn-control"
      >
        {fullScreenBtn.label}
      </Button>

      <Button
        variant={newGameBtn.variant}
        onClick={resetGame}
        className="btn-control"
      >
        {newGameBtn.label}
      </Button>

      <Button
        variant={playBtn.variant}
        onClick={startStopGame}
        className="btn-control"
      >
        {playBtn.label}
      </Button>
    </div>
  );
};
