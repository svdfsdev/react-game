import React, { useState, useMemo, useEffect, useCallback } from 'react';
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
import { GameboardBkg } from './GameboardBkg/GameboardBkg';

export const GameBoard = ({
  box,
  level,
  border,
  startStop,
  isAutoPlay,
  isPlaying,
  isGameOver,
  scoreHandler,
  finishGame,
  gameBoard,
  gamePrey,
}) => {
  const [snakeHeadX, setSnakeHeadX] = useState(0);
  const [snakeHeadY, setSnakeHeadY] = useState(0);
  const [prey, setPrey] = useState({ x: null, y: null });
  const [snake, setSnake] = useState([{ x: null, y: null }]);
  const [direction, setDirection] = useState();

  const RIGHT_BORDER = useMemo(() => {
    return box * GAMEBOARD_WIDTH;
  }, [box]);

  const BOTTOM_BORDER = useMemo(() => {
    return box * GAMEBOARD_HEIGHT;
  }, [box]);

  const isSnakeHeadOutsideGameboard = useMemo(() => {
    return (
      snakeHeadX < LEFT_BORDER ||
      snakeHeadX >= RIGHT_BORDER ||
      snakeHeadY < TOP_BORDER ||
      snakeHeadY >= BOTTOM_BORDER
    );
  }, [snakeHeadX, snakeHeadY, RIGHT_BORDER, BOTTOM_BORDER]);

  const isSnakeHitWall = useMemo(() => {
    return (
      snakeHeadX === LEFT_BORDER - box ||
      snakeHeadY === TOP_BORDER - box ||
      snakeHeadX === RIGHT_BORDER + box ||
      snakeHeadY === BOTTOM_BORDER + box
    );
  }, [snakeHeadX, snakeHeadY, box, RIGHT_BORDER, BOTTOM_BORDER]);

  const isEatYourself = useMemo(() => {
    let isEat = false;

    for (let i = snake.length - 1; i >= 1; i--) {
      if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
        isEat = true;
        break;
      }
    }

    return isEat;
  }, [snake]);

  const validateDirection = useCallback(
    (keyCode) => {
      return (
        (keyCode === DIRECTION_RIGHT && direction === DIRECTION_LEFT) ||
        (keyCode === DIRECTION_LEFT && direction === DIRECTION_RIGHT) ||
        (keyCode === DIRECTION_DOWN && direction === DIRECTION_UP) ||
        (keyCode === DIRECTION_UP && direction === DIRECTION_DOWN)
      );
    },
    [direction]
  );

  const manageDirection = useCallback(
    (e) => {
      if (isSnakeHeadOutsideGameboard) return;

      switch (e.keyCode) {
        case START_STOP_GAME:
          startStop();
          return;

        case DIRECTION_RIGHT:
        case DIRECTION_LEFT:
        case DIRECTION_DOWN:
        case DIRECTION_UP:
          break;

        default:
          return;
      }

      if (validateDirection(e.keyCode)) return;

      setDirection(e.keyCode);
    },
    [startStop, validateDirection, isSnakeHeadOutsideGameboard]
  );

  const initGame = useCallback(() => {
    setPrey({
      x: getRandomNumber(GAMEBOARD_WIDTH, box),
      y: getRandomNumber(GAMEBOARD_HEIGHT, box),
    });

    setSnakeHeadX(RIGHT_BORDER / 2);
    setSnakeHeadY(BOTTOM_BORDER / 2);

    setSnake([{ x: RIGHT_BORDER / 2, y: BOTTOM_BORDER / 2 }]);
    setDirection(DIRECTION_RIGHT);
  }, [box, RIGHT_BORDER, BOTTOM_BORDER]);

  const eatPrey = useCallback(() => {
    if (prey.x === snakeHeadX && prey.y === snakeHeadY) {
      scoreHandler();
      const currentSnake = [{ x: snakeHeadX, y: snakeHeadY }, ...snake];

      setSnake(currentSnake);
      setPrey({
        x: getRandomNumber(GAMEBOARD_WIDTH, box),
        y: getRandomNumber(GAMEBOARD_HEIGHT, box),
      });
    }
  }, [snake, prey.x, prey.y, snakeHeadX, snakeHeadY, scoreHandler, box]);

  const crossBorder = useCallback(() => {
    if (snakeHeadX < LEFT_BORDER - box) {
      setSnakeHeadX(RIGHT_BORDER);
      return;
    }

    if (snakeHeadX > RIGHT_BORDER) {
      setSnakeHeadX(LEFT_BORDER);
      return;
    }

    if (snakeHeadY < TOP_BORDER - box) {
      setSnakeHeadY(BOTTOM_BORDER);
      return;
    }

    if (snakeHeadY > BOTTOM_BORDER) {
      setSnakeHeadY(TOP_BORDER);
      return;
    }
  }, [snakeHeadX, snakeHeadY, box, RIGHT_BORDER, BOTTOM_BORDER]);

  const changeSnakeHeadPosition = useCallback(() => {
    switch (direction) {
      case DIRECTION_LEFT:
        setSnakeHeadX((prev) => prev - box);
        return;

      case DIRECTION_UP:
        setSnakeHeadY((prev) => prev - box);
        return;

      case DIRECTION_RIGHT:
        setSnakeHeadX((prev) => prev + box);
        return;

      case DIRECTION_DOWN:
        setSnakeHeadY((prev) => prev + box);
        return;

      default:
        return;
    }
  }, [direction, box]);

  const changeSnakeHead = useCallback(() => {
    const currentSnake = [
      { x: snakeHeadX, y: snakeHeadY },
      ...snake.slice(0, -1),
    ];

    setSnake(currentSnake);
  }, [snake, snakeHeadX, snakeHeadY]);

  const eatYourself = useCallback(() => {
    if (isEatYourself) {
      finishGame();
    }
  }, [isEatYourself, finishGame]);

  const autoPlay = useCallback(() => {
    let dir = direction;

    function leftRightDirection() {
      dir = prey.x < snakeHeadX ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }

    function upDownDirection() {
      dir = prey.y < snakeHeadY ? DIRECTION_UP : DIRECTION_DOWN;
    }

    function changeDirection() {
      if (dir === DIRECTION_LEFT || dir === DIRECTION_RIGHT) {
        upDownDirection();
      } else {
        leftRightDirection();
      }
    }

    switch (true) {
      case prey.y === snakeHeadY:
        leftRightDirection();
        break;

      case prey.x === snakeHeadX:
        upDownDirection();
        break;

      case prey.x !== snakeHeadX:
        leftRightDirection();
        break;

      case prey.y !== snakeHeadY:
        upDownDirection();
        break;

      default:
        break;
    }

    if (validateDirection(dir)) {
      changeDirection();
    }

    setDirection(dir);
  }, [prey.x, prey.y, snakeHeadY, snakeHeadX, direction, validateDirection]);

  const drawGame = useCallback(() => {
    if (isAutoPlay) {
      autoPlay();
    }

    changeSnakeHeadPosition();
    changeSnakeHead();

    eatYourself();

    if (border && isSnakeHitWall) {
      finishGame();
    } else {
      crossBorder();
    }

    eatPrey();
  }, [
    isAutoPlay,
    autoPlay,
    border,
    finishGame,
    isSnakeHitWall,
    eatPrey,
    eatYourself,
    crossBorder,
    changeSnakeHead,
    changeSnakeHeadPosition,
  ]);

  useEffect(() => {
    if (isGameOver) {
      initGame();
    }
  }, [isGameOver, initGame]);

  useEffect(() => {
    let timerId = null;

    if (isPlaying) {
      timerId = setInterval(drawGame, level);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [isPlaying, level, drawGame]);

  useEffect(() => {
    document.addEventListener('keydown', manageDirection);

    return () => {
      document.removeEventListener('keydown', manageDirection);
    };
  }, [isAutoPlay, manageDirection]);

  const renderSnake = useCallback(
    () =>
      snake.map((it, i) => (
        <div
          key={i}
          className="Snake"
          style={{
            left: `${it.x}px`,
            top: `${it.y}px`,
            width: box + 'px',
            height: box + 'px',
          }}
        ></div>
      )),
    [snake, box]
  );

  const gameBoardClasses = useMemo(() => {
    const cls = ['GameBoard'];

    if (border) {
      cls.push('border');
    }

    return cls.join(' ');
  }, [border]);

  return (
    <div
      className={gameBoardClasses}
      style={{ width: RIGHT_BORDER, height: BOTTOM_BORDER }}
    >
      <GameboardBkg bkg={gameBoard} />

      <Prey x={prey.x} y={prey.y} box={box} gamePrey={gamePrey} />

      {renderSnake()}
    </div>
  );
};
