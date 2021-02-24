import React, { useState, useEffect, useCallback } from 'react';
import './GameBoard.scss';
import {
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
  GAMEBOARD_HEIGHT,
  GAMEBOARD_WIDTH,
  LEFT_BORDER,
  START_STOP_GAME,
  TOP_BORDER,
} from '../../../utils/guide';
import { getRandomNumber } from '../../../utils/helper';
import { Prey } from './Prey/Prey';

const BOTTOM_BORDER = 450;
const RIGHT_BORDER = 750;
const BOX = 25;

export const GameBoard = ({
  level,
  border,
  isPlaying,
  isGameOver,
  scoreHandler,
  startStopHandler,
}) => {
  const [snakeHeadX, setSnakeHeadX] = useState();
  const [snakeHeadY, setSnakeHeadY] = useState();
  const [prey, setPrey] = useState({ x: null, y: null });
  const [snake, setSnake] = useState([{ x: null, y: null }]);
  const [direction, setDirection] = useState();
  const [isDirectionChanged, setIsDirectionChanged] = useState();

  const changeDirection = useCallback(
    (e) => {
      if (isDirectionChanged) return;
      if (
        snakeHeadX < LEFT_BORDER ||
        snakeHeadX >= 750 ||
        snakeHeadY < TOP_BORDER ||
        snakeHeadY >= 450
      ) {
        return;
      }

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
    [
      isPlaying,
      direction,
      startStopHandler,
      isDirectionChanged,
      snakeHeadX,
      snakeHeadY,
    ]
  );

  const initGame = useCallback(() => {
    setPrey({
      x: getRandomNumber(GAMEBOARD_WIDTH, BOX),
      y: getRandomNumber(GAMEBOARD_HEIGHT, BOX),
    });
    setSnake([{ x: RIGHT_BORDER / 2, y: BOTTOM_BORDER / 2 }]);
    setSnakeHeadX(RIGHT_BORDER / 2);
    setSnakeHeadY(BOTTOM_BORDER / 2);
    setDirection(DIRECTION_RIGHT);
    setIsDirectionChanged(false);
  }, []);

  const eatPrey = useCallback(() => {
    if (prey.x === snakeHeadX && prey.y === snakeHeadY) {
      scoreHandler();
      const currentSnake = snake;
      currentSnake.unshift({ x: snakeHeadX, y: snakeHeadY });

      setSnake(currentSnake);
      setPrey({
        x: getRandomNumber(GAMEBOARD_WIDTH, BOX),
        y: getRandomNumber(GAMEBOARD_HEIGHT, BOX),
      });
    }
  }, [snake, prey.x, prey.y, snakeHeadX, snakeHeadY, scoreHandler]);

  const eatYourself = useCallback(() => {
    for (let i = snake.length - 1; i >= 1; i--) {
      if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
        startStopHandler();
      }
    }
  }, [snake, startStopHandler]);

  const finishGame = useCallback(() => {
    if (
      snakeHeadX === LEFT_BORDER - BOX ||
      snakeHeadY === TOP_BORDER - BOX ||
      snakeHeadX === RIGHT_BORDER + BOX ||
      snakeHeadY === BOTTOM_BORDER + BOX
    ) {
      startStopHandler();
    }
  }, [snakeHeadX, snakeHeadY, startStopHandler]);

  const crossBorder = useCallback(() => {
    if (snakeHeadX < LEFT_BORDER - BOX) {
      setSnakeHeadX(750);
      return;
    }

    if (snakeHeadX > 750) {
      setSnakeHeadX(LEFT_BORDER);
      return;
    }

    if (snakeHeadY < TOP_BORDER - BOX) {
      setSnakeHeadY(450);
      return;
    }

    if (snakeHeadY > 450) {
      setSnakeHeadY(TOP_BORDER);
      return;
    }
  }, [snakeHeadX, snakeHeadY]);

  const changeSnakeHeadPosition = useCallback(() => {
    switch (direction) {
      case DIRECTION_LEFT:
        setSnakeHeadX((prev) => prev - BOX);
        return;

      case DIRECTION_UP:
        setSnakeHeadY((prev) => prev - BOX);
        return;

      case DIRECTION_RIGHT:
        setSnakeHeadX((prev) => prev + BOX);
        return;

      case DIRECTION_DOWN:
        setSnakeHeadY((prev) => prev + BOX);
        return;

      default:
        return;
    }
  }, [direction]);

  const changeSnakeHead = useCallback(() => {
    const currentSnake = snake;
    currentSnake.pop();
    currentSnake.unshift({ x: snakeHeadX, y: snakeHeadY });
    setSnake(currentSnake);
  }, [snake, snakeHeadX, snakeHeadY]);

  const drawGame = () => {
    changeSnakeHeadPosition();
    changeSnakeHead();

    if (snake.length > 3) eatYourself();
    border ? finishGame() : crossBorder();

    eatPrey();
    setIsDirectionChanged(false);
  };

  useEffect(() => {
    let timerId = null;

    if (isGameOver) {
      initGame();
    }

    if (isPlaying) {
      timerId = setInterval(() => {
        drawGame();
      }, level);
    }

    document.addEventListener('keydown', changeDirection);

    return () => {
      clearInterval(timerId);
      document.removeEventListener('keydown', changeDirection);
    };
  }, [isGameOver, isPlaying, level, initGame, changeDirection]);

  const renderSnake = useCallback(
    () =>
      snake.map((it, i) => (
        <div
          key={i}
          className="Snake"
          style={{
            left: `${it.x}px`,
            top: `${it.y}px`,
          }}
        ></div>
      )),
    [snake]
  );

  return (
    <div className="GameBoard">
      <div className="background lawn"></div>
      <Prey x={prey.x} y={prey.y} />

      {renderSnake()}
    </div>
  );
};
