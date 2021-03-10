import React from 'react';
import classNames from 'classnames';
import { gameboard_bkg } from '../../../../utils/guide';
import './GameboardBkg.scss';

export const GameboardBkg = ({ bkg }) => {
  const classes = classNames('GameboardBkg', `${gameboard_bkg[bkg]}`);

  return <div className={classes}></div>;
};
