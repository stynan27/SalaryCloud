import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';


function LoggedIn() {

  return (
    <Nav className="justify-content-end ">
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
        <Nav.Link className="btn btn-success text-white" href="#" role="button"> Log Out </Nav.Link>
      </Nav.Item>
    </Nav>
  );

}

export default LoggedIn;
