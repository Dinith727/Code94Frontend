import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

const Header = () => {


  return (
    <header>
      <Navbar  expand='lg' >
        <Container>
          
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
                <NavDropdown title= 'Admin'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                  <NavDropdown.Item>LogOut</NavDropdown.Item>
                </NavDropdown>
   
            </Nav>
            <img
            src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
            class="rounded-circle"
            height="35"
            alt="Black and White Portrait of a Man"
            loading="lazy"
          />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
