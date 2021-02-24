import React from 'react';
import './Prey.scss';

export const Prey = ({ x, y }) => {
  return (
    <div className="Prey apple" style={{ left: `${x}px`, top: `${y}px` }}></div>
  );
};
