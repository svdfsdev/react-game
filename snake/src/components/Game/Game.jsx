import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import './Game.scss';
import { Progress } from './Progress/Progress';
import { Controls } from './Controls/Controls';
import { GameBoard } from './GameBoard/GameBoard';

const Game = (props) => {
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const { gameLevel, gameBorder } = props.settings;

  const startStopGame = useCallback(() => {
    if (isGameOver) setIsGameOver(false);
    setIsPlaying((prev) => !prev);
  }, [isGameOver]);

  const newGameHandler = useCallback(() => {
    setScore(0);
    setIsPlaying(false);
    setIsGameOver(true);
  }, []);

  const setFullScreen = useCallback(() => {
    setIsFullScreen((prev) => !prev);
  }, []);

  const increaseScore = useCallback(() => {
    setScore((prev) => prev + 1);
  }, []);

  return (
    <div className="Game">
      <Progress score={score} isPlaying={isPlaying} isGameOver={isGameOver} />

      <GameBoard
        score={score}
        isPlaying={isPlaying}
        isGameOver={isGameOver}
        level={gameLevel.value}
        border={gameBorder}
        scoreHandler={increaseScore}
        newGameHandler={newGameHandler}
        startStopHandler={startStopGame}
      />

      <Controls
        isPlaying={isPlaying}
        isFullScreen={isFullScreen}
        startStopGame={startStopGame}
        setFullScreen={setFullScreen}
        newGameHandler={newGameHandler}
      />
    </div>
  );
};

const mapStateToProps = (store) => ({
  settings: store.settings,
});

export default connect(mapStateToProps)(Game);
