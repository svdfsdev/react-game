import React from 'react';
import classNames from 'classnames';
import { getDisplayValue } from '../../../utils/helper';
import './Result.scss';
import { Button } from 'react-bootstrap';

export const Result = ({ box, score, timer, isShowResult, newGame }) => {
  const minutes = getDisplayValue(Math.trunc(timer / 60));
  const seconds = getDisplayValue(timer % 60);
  const classes = classNames('Result', { visible: isShowResult });

  const newGameBtn = {
    label: 'New game',
    variant: 'success',
  };

  return (
    <div
      className={classes}
      style={{
        width: box * 30 + 'px',
        height: box * 18 + 'px',
      }}
    >
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
