import React from 'react';
import './Progress.scss';

export const Progress = ({ score, time }) => {
  return (
    <div className="Progress">
      <span className="score">Score: {score}</span>
      <span className="duration">Time: {time}</span>
    </div>
  );
};
