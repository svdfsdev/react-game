import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './GameBoard.scss';
import {
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
  LEFT_BORDER,
  START_STOP_GAME,
  TOP_BORDER,
} from '../../../utils/guide';
import { getRandomNumber } from '../../../utils/helper';
import { Prey } from './Prey/Prey';

export const GameBoard = ({
  level,
  border,
  isPlaying,
  scoreHandler,
  startStopHandler,
}) => {
  const [prey, setPrey] = useState({
    x: getRandomNumber(30, 25),
    y: getRandomNumber(18, 25),
  });
  const [snakeHeadX, setSnakeHeadX] = useState(375);
  const [snakeHeadY, setSnakeHeadY] = useState(225);
  const [isDirectionChanged, setIsDirectionChanged] = useState(false);

  const [direction, setDirection] = useState(DIRECTION_RIGHT);

  const snakePositions = useMemo(() => {
    return [{ x: 375, y: 225 }];
  }, []);

  const changeSnakeHeadPosition = useCallback(() => {
    switch (direction) {
      case DIRECTION_LEFT:
        setSnakeHeadX((prev) => prev - 25);
        return;

      case DIRECTION_UP:
        setSnakeHeadY((prev) => prev - 25);
        return;

      case DIRECTION_RIGHT:
        setSnakeHeadX((prev) => prev + 25);
        return;

      case DIRECTION_DOWN:
        setSnakeHeadY((prev) => prev + 25);
        return;

      default:
        return;
    }
  }, [direction]);

  const changeSnakeHead = useCallback(() => {
    snakePositions.pop();
    snakePositions.unshift({ x: snakeHeadX, y: snakeHeadY });
  }, [snakePositions, snakeHeadX, snakeHeadY]);

  const finishGame = useCallback(() => {
    if (
      snakeHeadX === LEFT_BORDER - 25 ||
      snakeHeadY === TOP_BORDER - 25 ||
      snakeHeadX === 750 + 25 ||
      snakeHeadY === 450 + 25
    ) {
      startStopHandler();
    }
  }, [snakeHeadX, snakeHeadY, startStopHandler]);

  const crossBorder = useCallback(() => {
    if (snakeHeadX < LEFT_BORDER) {
      setSnakeHeadX(750);
      return;
    }
    if (snakeHeadX > 750) {
      setSnakeHeadX(LEFT_BORDER);
      return;
    }
    if (snakeHeadY < TOP_BORDER - 25) {
      setSnakeHeadY(450);
      return;
    }
    if (snakeHeadY > 450) {
      setSnakeHeadY(TOP_BORDER);
      return;
    }
  }, [snakeHeadX, snakeHeadY]);

  const eatPrey = useCallback(() => {
    if (prey.x === snakeHeadX && prey.y === snakeHeadY) {
      scoreHandler();
      snakePositions.unshift({ x: snakeHeadX, y: snakeHeadY });
      setPrey({
        x: getRandomNumber(30, 25),
        y: getRandomNumber(18, 25),
      });
    }
  }, [snakePositions, prey.x, prey.y, snakeHeadX, snakeHeadY, scoreHandler]);

  const eatYourself = useCallback(() => {
    for (let i = snakePositions.length - 1; i >= 1; i--) {
      if (
        snakePositions[0].x === snakePositions[i].x &&
        snakePositions[0].y === snakePositions[i].y
      ) {
        startStopHandler();
      }
    }
  }, [snakePositions, startStopHandler]);

  const drawGame = useCallback(() => {
    changeSnakeHeadPosition();
    changeSnakeHead();

    if (snakePositions.length > 3) eatYourself();

    border ? finishGame() : crossBorder();
    eatPrey();

    setIsDirectionChanged(false);
  }, [
    border,
    snakePositions.length,
    eatPrey,
    finishGame,
    eatYourself,
    crossBorder,
    changeSnakeHead,
    changeSnakeHeadPosition,
  ]);

  const changeDirection = useCallback(
    (e) => {
      if (isDirectionChanged) return;

      switch (e.keyCode) {
        case START_STOP_GAME:
          startStopHandler();
          return;

        case DIRECTION_RIGHT:
        case DIRECTION_LEFT:
        case DIRECTION_DOWN:
        case DIRECTION_UP:
          break;

        default:
          return;
      }

      if (
        (e.keyCode === DIRECTION_RIGHT && direction === DIRECTION_LEFT) ||
        (e.keyCode === DIRECTION_LEFT && direction === DIRECTION_RIGHT) ||
        (e.keyCode === DIRECTION_DOWN && direction === DIRECTION_UP) ||
        (e.keyCode === DIRECTION_UP && direction === DIRECTION_DOWN)
      )
        return;

      setDirection(e.keyCode);
      if (isPlaying) setIsDirectionChanged(true);
    },
    [direction, startStopHandler, isDirectionChanged]
  );

  useEffect(() => {
    let game = null;

    if (isPlaying) {
      game = setInterval(() => {
        drawGame(direction);
      }, level);
    } else clearInterval(game);

    document.addEventListener('keydown', changeDirection);

    return () => {
      clearInterval(game);
      document.removeEventListener('keydown', changeDirection);
    };
  }, [
    level,
    isPlaying,
    snakeHeadX,
    snakeHeadY,
    direction,
    drawGame,
    changeDirection,
  ]);

  const renderSnake = useCallback(
    () =>
      snakePositions.map((it, i) => (
        <div
          key={i}
          className="Snake"
          style={{
            left: `${it.x}px`,
            top: `${it.y}px`,
          }}
        ></div>
      )),
    [snakePositions]
  );

  return (
    <div className="GameBoard">
      <Prey x={prey.x} y={prey.y} />

      {renderSnake()}
    </div>
  );
};
