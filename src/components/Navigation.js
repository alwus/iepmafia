// src/components/Navbar.js
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
        <img
        src="/images/Mafia.png"
        alt="Logo"
        height="50"
        className="text-center d-inline-block align-top ms-2 me-2"
        />
        IEP Mafia
       </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/">Home</Nav.Link>
          <Nav.Link as={NavLink} to="/games">Games</Nav.Link>
          <Nav.Link as={NavLink} to="/roster">Roster</Nav.Link>
          <Nav.Link as={NavLink} to="/about">About</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
