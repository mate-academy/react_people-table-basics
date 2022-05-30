import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.scss';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link>
              <Link className="link" to="/">Home Page</Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="link" to="/people">People page</Link>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </header>

  );
};
