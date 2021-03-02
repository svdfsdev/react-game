import React from 'react';
import { Link } from '../UI/Link/Link';

const Navbar = () => {
  return (
    <nav className="grey darken-2">
      <ul id="nav-mobile" className="right">
        <li className="navbar-item">
          <Link href="/" icon="videogame_asset" label="Game" />
        </li>

        <li className="navbar-item">
          <Link href="/statistics" icon="insert_chart" label="Statistics" />
        </li>

        <li className="navbar-item">
          <Link href="/settings" icon="settings" label="Settings" />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
