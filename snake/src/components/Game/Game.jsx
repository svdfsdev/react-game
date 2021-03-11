import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  initGameboard,
  saveGameResultToLocalStorage,
} from '../../utils/helper';
import { levelsList } from '../../utils/guide';
import './Game.scss';
import { Progress } from './Progress/Progress';
import { Controls } from './Controls/Controls';
import { GameBoard } from './GameBoard/GameBoard';
import { Result } from './Result/Result';
import { AudioEffects } from './AudioEffects';
import { saveGameResult } from '../../reducers/statistics';
import { setBorder } from '../../reducers/settings';

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
  }, [setScore, setTimer, setIsShowResult]);

  const resetGame = useCallback(() => {
    setScore(0);
    setTimer(0);
    setIsShowResult(false);

    setIsGameOver(true);
    setIsPlaying(false);
  }, [setScore, setTimer, setIsShowResult, setIsGameOver, setIsPlaying]);

  const finishGame = useCallback(() => {
    setIsPlaying(false);
    setIsGameOver(true);
    setIsShowResult(true);
  }, [setIsShowResult, setIsGameOver, setIsPlaying]);

  const startStopGame = useCallback(() => {
    if (isGameOver) {
      newGame();
    }

    setIsPlaying((prev) => !prev);
  }, [isGameOver, newGame, setIsPlaying]);

  const setFullScreen = useCallback(() => {
    setIsFullScreen((prev) => !prev);
  }, [setIsFullScreen]);

  const increaseScore = useCallback(() => {
    setScore((prev) => prev + 1);
  }, [setScore]);

  const timerHandler = useCallback(
    (value) => {
      setTimer(value);
    },
    [setTimer]
  );

  const autoPlayHandler = useCallback(() => {
    if (gameBorder) {
      dispatch(setBorder());
    }

    setIsAutoPlay((prev) => !prev);
  }, [gameBorder, dispatch, setIsAutoPlay]);

  useEffect(() => {
    if (!isGameOver) {
      setTimer(0);
    }
  }, [isGameOver]);

  useEffect(() => {
    if (isGameOver && isShowResult && timer > 0) {
      const game = { score, timer };

      saveGameResultToLocalStorage(game);
      dispatch(saveGameResult(game));
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
