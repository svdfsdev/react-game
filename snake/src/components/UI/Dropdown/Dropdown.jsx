import React from 'react';

export const Dropdown = ({ label, icon, values, handler }) => {
  const listValues = values.map((it, i) => (
    <li key={i}>
      <a className="white-text" onClick={() => handler(it.value)}>
        {it.label}
      </a>
    </li>
  ));

  return (
    <>
      <ul id="dropdown2" className="dropdown-content grey darken-2">
        {listValues}
      </ul>

      <a
        className="btn dropdown-trigger grey darken-2 z-depth-0"
        data-target="dropdown2"
      >
        {label}
        <i className="material-icons right">{icon}</i>
      </a>
    </>
  );
};
