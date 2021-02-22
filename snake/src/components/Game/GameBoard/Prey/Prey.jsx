import React from 'react';
import './Prey.scss';

export const Prey = ({ x, y }) => {
  return <div className="Prey" style={{ left: `${x}px`, top: `${y}px` }}></div>;
};
