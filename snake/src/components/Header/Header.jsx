import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link to="/" as={NavLink} exact={true}>
            Game
          </Nav.Link>

          <Nav.Link to="/statistics" as={NavLink}>
            Statistics
          </Nav.Link>

          <Nav.Link to="/settings" as={NavLink}>
            Settings
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
