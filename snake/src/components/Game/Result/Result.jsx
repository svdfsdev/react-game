import React from 'react';
import { getDisplayValue } from '../../../utils/helper';
import { againIcon } from '../../../utils/icons';
import { Button } from '../../UI/Button/Button';
import './Result.scss';

export const Result = ({ score, timer, isShowResult, newGame }) => {
  const minutes = getDisplayValue(Math.trunc(timer / 60));
  const seconds = getDisplayValue(timer % 60);

  return (
    <div className={`Result ${isShowResult ? 'visible' : ''}`}>
      <span className="game-over">Game over!</span>
      <span className="score">Score: {score}</span>
      <span className="time">
        Time: {minutes}:{seconds}
      </span>

      <Button
        label={'New game'}
        btnType={'large start-game'}
        icon={againIcon}
        value={true}
        color={'green'}
        handler={newGame}
      />
    </div>
  );
};
