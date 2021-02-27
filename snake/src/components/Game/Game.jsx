import React, { useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import './Game.scss';
import { Progress } from './Progress/Progress';
import { Controls } from './Controls/Controls';
import { GameBoard } from './GameBoard/GameBoard';
import { Result } from './Result/Result';

const Game = (props) => {
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isShowResult, setIsShowResult] = useState(false);

  const { gameLevel, gameBorder } = props.settings;

  const newGame = useCallback(() => {
    setScore(0);
    setTimer(0);
    setIsShowResult(false);

    setIsGameOver(false);
  }, []);

  const resetGame = useCallback(() => {
    setScore(0);
    setTimer(0);
    setIsShowResult(false);

    setIsGameOver(true);
    setIsPlaying(false);
  }, []);

  const finishGame = useCallback(() => {
    setIsPlaying(false);
    setIsGameOver(true);
    setIsShowResult(true);
  }, []);

  const startStopGame = useCallback(() => {
    if (isGameOver) {
      newGame();
    }

    setIsPlaying((prev) => !prev);
  }, [isGameOver, newGame]);

  const setFullScreen = useCallback(() => {
    setIsFullScreen((prev) => !prev);
  }, []);

  const increaseScore = useCallback(() => {
    setScore((prev) => prev + 1);
  }, []);

  const timerHandler = useCallback((value) => {
    setTimer(value);
  }, []);

  useEffect(() => {
    if (!isGameOver) {
      setTimer(0);
    }
  }, [isGameOver]);

  return (
    <div className="Game">
      <Progress
        score={score}
        timerValue={timer}
        isPlaying={isPlaying}
        isGameOver={isGameOver}
        timerHandler={timerHandler}
        isShowResult={isShowResult}
      />

      <Result
        timer={timer}
        score={score}
        isShowResult={isShowResult}
        isGameOver={isGameOver}
        newGame={newGame}
      />

      <GameBoard
        score={score}
        isPlaying={isPlaying}
        isGameOver={isGameOver}
        level={gameLevel.value}
        border={gameBorder}
        scoreHandler={increaseScore}
        finishGame={finishGame}
        startStop={startStopGame}
      />

      <Controls
        isPlaying={isPlaying}
        isFullScreen={isFullScreen}
        startStopGame={startStopGame}
        setFullScreen={setFullScreen}
        resetGame={resetGame}
      />
    </div>
  );
};

const mapStateToProps = (store) => ({
  settings: store.settings,
});

export default connect(mapStateToProps)(Game);
