import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function Header() {
  return (
    <div className="Header">
        <Navbar className="border-bottom border-success" bg="light" variant="light">
          <Navbar.Brand className="mr-auto" href="/">
            <h1> SalaryCloud </h1>
          </Navbar.Brand>

          <Nav className="ml-auto">
            <Nav.Item className="mr-2">
              <Nav.Link className="btn btn-success text-white" href="#" role="button"> Profile </Nav.Link>
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
