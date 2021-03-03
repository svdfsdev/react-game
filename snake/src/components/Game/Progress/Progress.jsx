import React, { useState, useEffect } from 'react';
import { getDisplayValue } from '../../../utils/helper';
import './Progress.scss';

export const Progress = ({
  score,
  isPlaying,
  isGameOver,
  timerHandler,
  timerValue,
  isAutoPlay,
}) => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    setTimer(timerValue);
  }, [timerValue]);

  useEffect(() => {
    if (!isPlaying && isGameOver) {
      timerHandler(timer);
    }
  }, [timer, timerHandler, isPlaying, isGameOver]);

  useEffect(() => {
    let timerId = null;

    if (isPlaying && !isGameOver) {
      timerId = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [isPlaying, isGameOver, setTimer]);

  const minutes = getDisplayValue(Math.trunc(timer / 60));
  const seconds = getDisplayValue(timer % 60);
  const classes = ['Progress'];

  if (!isGameOver) classes.push('visible');

  return (
    <div className={classes.join(' ')}>
      <span>Score: {score}</span>

      {isAutoPlay && <span>Auto playing</span>}

      <span>
        Time:
        {` ${minutes}:${seconds}`}
      </span>
    </div>
  );
};
