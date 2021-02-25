import React, { useState, useEffect } from 'react';
import { getDisplayValue } from '../../../utils/helper';
import './Progress.scss';

export const Progress = ({ score, isPlaying, isGameOver }) => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (isGameOver) setTimer(0);
  }, [isGameOver]);

  useEffect(() => {
    let timer = null;

    if (isPlaying) {
      timer = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isPlaying, timer]);

  const minutes = getDisplayValue(Math.trunc(timer / 60));
  const seconds = getDisplayValue(timer % 60);

  return (
    <div className="Progress">
      <span className="score">Score: {score}</span>
      <span className="duration">
        Time:
        {` ${minutes}:${seconds}`}
      </span>
    </div>
  );
};
