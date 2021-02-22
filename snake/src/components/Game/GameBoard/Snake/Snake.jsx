import React from 'react';
import './Snake.scss';

export const Snake = ({ snake }) => {
  return snake.map((it, i) => {
    return (
      <div
        key={i}
        className="Snake"
        style={{
          left: `${it.x}px`,
          top: `${it.y}px`,
        }}
      ></div>
    );
  });
};
