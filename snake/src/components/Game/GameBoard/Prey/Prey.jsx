import React from 'react';
import classNames from 'classnames';
import { prey_bkg } from '../../../../utils/guide';
import './Prey.scss';

export const Prey = ({ x, y, gamePrey, box }) => {
  const classes = classNames('Prey', `${prey_bkg[gamePrey]}`);

  return (
    <div
      className={classes}
      style={{ left: `${x}px`, top: `${y}px`, width: box, height: box }}
    ></div>
  );
};
