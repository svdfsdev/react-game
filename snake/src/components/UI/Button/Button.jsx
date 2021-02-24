import React from 'react';
import './Button.scss';

export const Button = ({ label, icon, btnType, color, value, handler }) => {
  const btnStyle = `btn-${btnType || 'small'}`;
  let btnColor = 'grey darken-2';

  if (color && typeof color === 'boolean') {
    btnColor = value ? 'red' : 'green';
  }

  if (color && typeof color === 'string') {
    btnColor = color;
  }

  return (
    <a
      href="!#"
      className={`Button waves-effect waves-light ${btnStyle} z-depth-0 ${btnColor}`}
      onClick={handler}
    >
      <i className="material-icons right">{icon[String(value)]}</i>
      {label}
    </a>
  );
};
