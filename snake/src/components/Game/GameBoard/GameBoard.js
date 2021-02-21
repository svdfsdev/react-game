import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './GameBoard.scss';
import {
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
  START_STOP_GAME,
} from '../../../utils/guide';
import { getRandomNumber } from '../../../utils/helper';

export const GameBoard = ({
  level,
  isPlaying,
  scoreHandler,
  startStopHandler,
}) => {
  const [prey, setPrey] = useState({
    x: getRandomNumber(30, 25),
    y: getRandomNumber(18, 25),
  });
  const [finSnake, setFinSnake] = useState(null);
  const [snakeHeadX, setSnakeHeadX] = useState(375);
  const [snakeHeadY, setSnakeHeadY] = useState(225);
  const [direction, setDirection] = useState(DIRECTION_RIGHT);

  const snake = useMemo(() => {
    return [];
  }, []);

  const renderSnake = useCallback(() => {
    return snake.map((it, i) => (
      <div
        key={i}
        className="snake"
        style={{
          left: `${it.x}px`,
          top: `${it.y}px`,
        }}
      ></div>
    ));
  }, [snake]);

  const changeSnakeHeadPosition = useCallback(() => {
    switch (direction) {
      case DIRECTION_LEFT:
        setSnakeHeadX((prev) => prev - 25);
        break;

      case DIRECTION_UP:
        setSnakeHeadY((prev) => prev - 25);
        break;

      case DIRECTION_RIGHT:
        setSnakeHeadX((prev) => prev + 25);
        break;

      case DIRECTION_DOWN:
        setSnakeHeadY((prev) => prev + 25);
        break;

      default:
        break;
    }
  }, [direction]);

  const changeSnakeHead = useCallback(() => {
    snake.pop();
    snake.unshift({ x: snakeHeadX, y: snakeHeadY });
  }, [snake, snakeHeadX, snakeHeadY]);

  const eatPrey = useCallback(() => {
    if (prey.x === snakeHeadX && prey.y === snakeHeadY) {
      scoreHandler();
      snake.unshift({ x: snakeHeadX, y: snakeHeadY });
      setPrey({
        x: getRandomNumber(30, 25),
        y: getRandomNumber(18, 25),
      });
    }
  }, [snake, prey.x, prey.y, snakeHeadX, snakeHeadY, scoreHandler]);

  const drawGame = useCallback(() => {
    changeSnakeHeadPosition();
    changeSnakeHead();

    eatPrey();

    setFinSnake(renderSnake());
  }, [
    eatPrey,
    renderSnake,
    setFinSnake,
    changeSnakeHead,
    changeSnakeHeadPosition,
  ]);

  const changeDirection = useCallback(
    (e) => {
      if (e.keyCode === START_STOP_GAME) {
        startStopHandler();
        return;
      }

      if (
        (e.keyCode === DIRECTION_LEFT && direction === DIRECTION_RIGHT) ||
        (e.keyCode === DIRECTION_RIGHT && direction === DIRECTION_LEFT) ||
        (e.keyCode === DIRECTION_UP && direction === DIRECTION_DOWN) ||
        (e.keyCode === DIRECTION_DOWN && direction === DIRECTION_UP)
      )
        return;

      setDirection(e.keyCode);
    },
    [direction, startStopHandler]
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
    renderSnake,
    changeDirection,
  ]);

  return (
    <div className="GameBoard">
      <div
        className="prey"
        style={{ left: `${prey.x}px`, top: `${prey.y}px` }}
      ></div>
      {finSnake}
    </div>
  );
};
