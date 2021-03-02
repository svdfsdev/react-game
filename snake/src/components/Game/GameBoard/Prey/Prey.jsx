import React from 'react';
import { prey_bkg } from '../../../../utils/guide';
import './Prey.scss';

export const Prey = ({ x, y, gamePrey }) => {
  const classes = ['Prey', prey_bkg[gamePrey]];
  return (
    <div
      className={classes.join(' ')}
      style={{ left: `${x}px`, top: `${y}px` }}
    ></div>
  );
};
