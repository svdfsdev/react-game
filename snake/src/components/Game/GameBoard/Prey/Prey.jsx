import React from 'react';
import { prey_bkg } from '../../../../utils/guide';
import './Prey.scss';

export const Prey = ({ x, y, gamePrey }) => {
  return (
    <div
      className={`Prey ${prey_bkg[gamePrey]}`}
      style={{ left: `${x}px`, top: `${y}px` }}
    ></div>
  );
};
