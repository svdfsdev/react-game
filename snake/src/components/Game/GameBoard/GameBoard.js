import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { getRandomNumber } from '../../../utils/helper';
import './GameBoard.scss';

export const GameBoard = ({ handler }) => {
  const [prey, setPrey] = useState({
    x: getRandomNumber(30, 25),
    y: getRandomNumber(18, 25),
  });
  const [finSnake, setFinSnake] = useState(null);
  const [snakeHeadX, setSnakeHeadX] = useState(0);
  const [snakeHeadY, setSnakeHeadY] = useState(225);
  const [direction, setDirection] = useState(39);

  const snake = useMemo(() => {
    return new Array(1).fill('');
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

  const moveTo = useCallback(() => {
    switch (direction) {
      case 37:
        setSnakeHeadX((prev) => prev - 25);
        break;

      case 38:
        setSnakeHeadY((prev) => prev - 25);
        break;

      case 39:
        setSnakeHeadX((prev) => prev + 25);
        break;

      case 40:
        setSnakeHeadY((prev) => prev + 25);
        break;

      default:
        break;
    }

    snake.pop();
    snake.unshift({ x: snakeHeadX, y: snakeHeadY });

    if (prey.x === snakeHeadX && prey.y === snakeHeadY) {
      handler();
      snake.unshift({ x: snakeHeadX, y: snakeHeadY });
      setPrey({
        x: getRandomNumber(30, 25),
        y: getRandomNumber(18, 25),
      });
    }

    const resSnake = renderSnake();
    setFinSnake(resSnake);
  }, [
    snake,
    prey.x,
    prey.y,
    handler,
    direction,
    snakeHeadX,
    snakeHeadY,
    renderSnake,
    setFinSnake,
  ]);

  const changeDirection = useCallback(
    (e) => {
      if (
        (e.keyCode === 37 && direction === 39) ||
        (e.keyCode === 39 && direction === 37) ||
        (e.keyCode === 38 && direction === 40) ||
        (e.keyCode === 40 && direction === 38)
      )
        return;

      setDirection(e.keyCode);
    },
    [direction]
  );

  useEffect(() => {
    const draw = setInterval(() => {
      moveTo(direction);
    }, 80);

    document.addEventListener('keydown', changeDirection);

    return () => {
      clearInterval(draw);
      document.removeEventListener('keydown', changeDirection);
    };
  }, [snakeHeadX, snakeHeadY, direction, moveTo, changeDirection]);

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
