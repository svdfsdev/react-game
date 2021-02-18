import React from 'react';
import './Button.scss';

export const Button = ({ label, icon, btnType, value, handler }) => {
  const btn = `btn-${btnType || 'small'}`;

  return (
    <a
      className={`Button waves-effect waves-light ${btn} z-depth-0 grey darken-2`}
      onClick={handler}
    >
      <i className="material-icons right">{icon[String(value)]}</i>
      {label}
    </a>
  );
};
