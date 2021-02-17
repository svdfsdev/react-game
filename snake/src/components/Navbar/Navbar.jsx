import React from 'react';
import './Navbar.scss';

// border_clear
// border_outer

export const Navbar = () => {
  return (
    <nav className="grey darken-2">
      <div className="nav-wrapper">
        <a href="#" data-target="mobile-demo" className="show-on-small sidenav-trigger">
          <i className="material-icons">menu</i>
        </a>

        <ul id="nav-mobile" className="right">
          <li>
            <ul id="dropdown2" className="dropdown-content grey darken-2">
              <li>
                <a className="white-text">Easy</a>
              </li>
              <li>
                <a className="white-text">Medium</a>
              </li>
              <li>
                <a className="white-text">Hard</a>
              </li>
            </ul>
            <a className="btn dropdown-trigger grey darken-2 z-depth-0" data-target="dropdown2">
              Level<i className="material-icons right">filter_list</i>
            </a>
          </li>

          <li>
            <a className="waves-effect waves-light btn-small z-depth-0 grey darken-2">
              <i className="material-icons right">border_outer</i>Border
            </a>
          </li>

          <li>
            <a className="waves-effect waves-light btn-small z-depth-0 grey darken-2">
              <i className="material-icons right">volume_up</i>Music
            </a>
          </li>

          <li>
            <a className="waves-effect waves-light btn-small z-depth-0 grey darken-2">
              <i className="material-icons right">volume_off</i>sounds
            </a>
          </li>

          <li>
            <a className="waves-effect waves-light btn-floating z-depth-0 grey darken-2">
              <i className="pause material-icons">pause</i>
            </a>
            {/* play_arrow */}
          </li>
        </ul>
      </div>
    </nav>
  );
};
