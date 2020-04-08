import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';

function Header() {
  return (
    <div className="Header h-auto">
        <Navbar className="border-bottom border-success" bg="light" variant="light">
          <Navbar.Brand className="mr-auto" href="/Welcome">
            <h1> SalaryCloud </h1>
          </Navbar.Brand>

          <Nav className="ml-auto">
            <Nav.Item className="mr-2">
              <Dropdown>
                <Dropdown.Toggle className="btn btn-success text-white" >
                  Profile
                </Dropdown.Toggle>

                <Dropdown.Menu className="text-center">
                  <Dropdown.Item href='/MyProfile'> View My Profile </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href='/ProfileSettings'> Profile Settings </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link className="btn btn-success text-white" href="#" role="button"> Login </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar>
    </div>
  );
}

export default Header;
