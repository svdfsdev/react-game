import React from 'react';

import { NavLink } from 'react-router-dom';

export const Link = () => {
  return (
    <NavLink
      to="/statistics"
      className={`Button waves-effect waves-light btn-small z-depth-0 grey darken-2`}
      // onClick={handler}
    >
      <i className="material-icons right">insert_chart</i>
      Statistics
    </NavLink>
  );
};
