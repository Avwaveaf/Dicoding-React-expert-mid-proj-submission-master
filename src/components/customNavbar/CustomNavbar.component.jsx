import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { FiLogOut, FiSettings } from 'react-icons/fi';

import { Button } from 'react-bootstrap';
import { SET_LOGOUT_USER } from '../../states/features/user/userSlice';

function CustomNavbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(SET_LOGOUT_USER());
    navigate('/login');
  };
  const navDropdownTitle = (
    <span>
      <FiSettings size={20} />
      {' '}
      Account
    </span>
  );
  return (
    <Navbar fixed="top" className="py-3" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">TalksDeed</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>

          </Nav>
          <Nav className="d-flex justify-content-center align-items-center">

            <NavDropdown
              title={navDropdownTitle}
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.1">Settings</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Account
              </NavDropdown.Item>

              <NavDropdown.Divider />

              <Navbar.Text>
                <div className="d-flex flex-column justify-content-start px-3 py-2 align-items-center gap-2">

                  <img src={user?.avatar} width={40} height={40} className="rounded-circle" alt="profile" />
                  <div className="d-flex align-items-center flex-column">
                    <span className="text-secondary">Signed as:</span>
                    <a href="#login" className="text-dark text-weight-bold">
                      {user?.name}
                    </a>
                  </div>
                  <Button variant="outline-danger" className="w-100 outline-none" onClick={logoutHandler}>
                    <FiLogOut />
                    {' '}
                    Logout
                  </Button>
                </div>

              </Navbar.Text>

            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}

export default CustomNavbar;
