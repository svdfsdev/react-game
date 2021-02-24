import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
  scoreHandler,
  startStopHandler,
}) => {
  const [prey, setPrey] = useState({
    x: getRandomNumber(GAMEBOARD_WIDTH, BOX),
    y: getRandomNumber(GAMEBOARD_HEIGHT, BOX),
  });
  const [snakeHeadX, setSnakeHeadX] = useState(RIGHT_BORDER / 2);
  const [snakeHeadY, setSnakeHeadY] = useState(BOTTOM_BORDER / 2);
  const [direction, setDirection] = useState(DIRECTION_RIGHT);
  const [isDirectionChanged, setIsDirectionChanged] = useState(false);

  const snakePositions = useMemo(() => {
    return [{ x: RIGHT_BORDER / 2, y: BOTTOM_BORDER / 2 }];
  }, []);

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
    snakePositions.pop();
    snakePositions.unshift({ x: snakeHeadX, y: snakeHeadY });
  }, [snakePositions, snakeHeadX, snakeHeadY]);

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
    if (snakeHeadX < LEFT_BORDER) {
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

  const eatPrey = useCallback(() => {
    if (prey.x === snakeHeadX && prey.y === snakeHeadY) {
      scoreHandler();

      snakePositions.unshift({ x: snakeHeadX, y: snakeHeadY });

      setPrey({
        x: getRandomNumber(GAMEBOARD_WIDTH, BOX),
        y: getRandomNumber(GAMEBOARD_HEIGHT, BOX),
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
      <div className="background lawn"></div>
      <Prey x={prey.x} y={prey.y} />

      {renderSnake()}
    </div>
  );
};
