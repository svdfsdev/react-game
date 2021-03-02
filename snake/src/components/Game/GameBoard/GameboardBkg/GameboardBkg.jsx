import React, { useMemo } from 'react';
import { gameboard_bkg } from '../../../../utils/guide';
import './GameboardBkg.scss';

export const GameboardBkg = ({ bkg }) => {
  const classes = useMemo(() => {
    return ['GameboardBkg', gameboard_bkg[bkg]];
  }, [bkg]);

  return <div className={classes.join(' ')}></div>;
};
