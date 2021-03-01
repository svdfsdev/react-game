import React from 'react';

import { NavLink } from 'react-router-dom';

export const Link = ({ href, icon, label }) => {
  return (
    <NavLink
      to={href}
      className={`Button waves-effect waves-light btn-small z-depth-0 grey darken-2`}
    >
      <i className="material-icons right">{icon}</i>
      {label}
    </NavLink>
  );
};
