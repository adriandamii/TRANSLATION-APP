import React from 'react';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const NavComponent = () => {

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <div>
        <LinkContainer to="/">
          <Navbar.Brand>amazona</Navbar.Brand>
        </LinkContainer>
      </div>
    </Navbar>
  );
};

export default NavComponent;
