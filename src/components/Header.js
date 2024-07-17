import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };
console.log('token', token)
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Survey App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
      
            {token ? (
              <Nav.Item>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </Nav.Item>
            ) : 
            (
              <>
              <Nav.Item>
                <Nav.Link onClick={() => navigate('/login')}>Login</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => navigate('/signup')}>Signup</Nav.Link>
              </Nav.Item>
              </>
            )
              }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;