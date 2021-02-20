import React, { useState } from 'react';
import './Game.scss';
import { Progress } from './Progress/Progress';
import { Controls } from './Controls/Controls';
import { GameBoard } from './GameBoard/GameBoard';

const Game = () => {
  const [score, setScore] = useState(11);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const startStopGame = () => {
    setIsPlaying((prev) => !prev);
  };

  const setFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  const increaseScore = () => setScore((prev) => prev + 1);

  return (
    <div className="Game">
      <Progress score={score} time={'00:00'} />

      <GameBoard score={score} handler={increaseScore} />

      <Controls
        isPlaying={isPlaying}
        isFullScreen={isFullScreen}
        startStopGame={startStopGame}
        setFullScreen={setFullScreen}
      />
    </div>
  );
};

export default Game;
