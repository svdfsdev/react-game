import React from 'react';
import { getDisplayValue } from '../../../utils/helper';
import { Button } from 'react-bootstrap';
import './Result.scss';

export const Result = ({ score, timer, isShowResult, newGame }) => {
  const minutes = getDisplayValue(Math.trunc(timer / 60));
  const seconds = getDisplayValue(timer % 60);

  const classes = ['Result'];

  if (isShowResult) {
    classes.push('visible');
  }

  const newGameBtn = {
    label: 'New game',
    variant: 'success',
  };

  return (
    <div className={classes.join(' ')}>
      <span className="game-over">Game over!</span>
      <span className="score">Score: {score}</span>
      <span className="time">
        Time: {minutes}:{seconds}
      </span>

      <Button variant={newGameBtn.variant} onClick={newGame}>
        {newGameBtn.label}
      </Button>
    </div>
  );
};
