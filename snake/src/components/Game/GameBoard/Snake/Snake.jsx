import React from 'react';
import './Snake.scss';

export const Snake = ({ left, top, idx }) => {
  return (
    <div
      key={idx}
      className="Snake"
      style={{
        left: `${left}px`,
        top: `${top}px`,
      }}
    ></div>
  );
};
