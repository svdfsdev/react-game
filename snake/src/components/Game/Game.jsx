import React, { useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import './Game.scss';
import { Progress } from './Progress/Progress';
import { Controls } from './Controls/Controls';
import { GameBoard } from './GameBoard/GameBoard';
import { Result } from './Result/Result';
import { setStatistics } from '../../actions/statisticsActions';
import { levelsList } from '../../utils/guide';
import AudioEffects from './AudioEffects';
import { initGameboard } from '../../utils/helper';
import { turnOnOffBorder } from '../../actions/settingsActions';

const Game = (props) => {
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isShowResult, setIsShowResult] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  const [box, setBox] = useState(0);

  const { gameLevel, gameBorder, gameBoard, gamePrey } = props.settings;
  const { setStatistics, turnOnOffBorder } = props;

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
      turnOnOffBorder();
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
      setStatistics({ score, timer });
    }
  }, [isGameOver, isShowResult, score, timer, setStatistics]);

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

const mapStateToProps = (store) => ({
  settings: store.settings,
});

const mapDispatchToProps = (dispatch) => ({
  setStatistics: (game) => dispatch(setStatistics(game)),
  turnOnOffBorder: () => dispatch(turnOnOffBorder()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
