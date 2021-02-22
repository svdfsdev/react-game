import React, { useState, useEffect } from 'react';
import { getDisplayValue } from '../../../utils/helper';
import './Progress.scss';

export const Progress = ({ score, isPlaying }) => {
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });

  useEffect(() => {
    let timer = null;

    if (isPlaying) {
      timer = setInterval(() => {
        let minutes = parseInt(time.minutes);
        let seconds = parseInt(time.seconds) + 1;

        if (seconds === 60) {
          minutes += 1;
          seconds = 0;
        }

        setTime({
          minutes,
          seconds,
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isPlaying, time.minutes, time.seconds]);

  return (
    <div className="Progress">
      <span className="score">Score: {score}</span>
      <span className="duration">
        Time: {getDisplayValue(time.minutes)}:{getDisplayValue(time.seconds)}
      </span>
    </div>
  );
};
