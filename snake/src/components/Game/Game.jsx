import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initGameboard, saveStatistics } from '../../utils/helper';
import { levelsList } from '../../utils/guide';
import './Game.scss';
import { Progress } from './Progress/Progress';
import { Controls } from './Controls/Controls';
import { GameBoard } from './GameBoard/GameBoard';
import { Result } from './Result/Result';
import { AudioEffects } from './AudioEffects';
import { SAVE_STATISTICS, SET_BORDER } from '../../actions/actionsTypes';

export const Game = () => {
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isShowResult, setIsShowResult] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  const [box, setBox] = useState(0);

  const gameLevel = useSelector((state) => state.settings.gameLevel);
  const gameBorder = useSelector((state) => state.settings.gameBorder);
  const gameBoard = useSelector((state) => state.settings.gameBoard);
  const gamePrey = useSelector((state) => state.settings.gamePrey);

  const dispatch = useDispatch();

  useEffect(() => {
    if (box === 0) {
      setBox(initGameboard());
    }
  }, [box]);

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

  const autoPlayHandler = () => {
    if (gameBorder) {
      dispatch({
        type: SET_BORDER,
      });
    }

    setIsAutoPlay((prev) => !prev);
  };

  useEffect(() => {
    if (!isGameOver) {
      setTimer(0);
    }
  }, [isGameOver]);

  useEffect(() => {
    if (isGameOver && isShowResult && timer > 0) {
      const game = { score, timer };

      saveStatistics(game);
      dispatch({
        type: SAVE_STATISTICS,
        payload: game,
      });
    }
  }, [isGameOver, isShowResult, score, timer, dispatch]);

  return (
    <div className="Game">
      <AudioEffects
        score={score}
        isPlaying={isPlaying}
        isGameOver={isGameOver}
        isShowResult={isShowResult}
      />

      <Progress
        score={score}
        timerValue={timer}
        isPlaying={isPlaying}
        isGameOver={isGameOver}
        timerHandler={timerHandler}
        isShowResult={isShowResult}
        isAutoPlay={isAutoPlay}
      />

      <Result
        timer={timer}
        score={score}
        isShowResult={isShowResult}
        isGameOver={isGameOver}
        newGame={newGame}
        box={box}
      />

      <GameBoard
        isAutoPlay={isAutoPlay}
        score={score}
        isPlaying={isPlaying}
        isGameOver={isGameOver}
        level={levelsList[gameLevel].value}
        border={gameBorder}
        scoreHandler={increaseScore}
        finishGame={finishGame}
        startStop={startStopGame}
        gameBoard={gameBoard}
        gamePrey={gamePrey}
        box={box}
      />

      {!isShowResult && (
        <Controls
          isPlaying={isPlaying}
          isFullScreen={isFullScreen}
          startStopGame={startStopGame}
          setFullScreen={setFullScreen}
          resetGame={resetGame}
          autoPlayHandler={autoPlayHandler}
        />
      )}
    </div>
  );
};
