import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';

function LoggedIn() {

  return (
    <Nav className="justify-content-end ">
      <Nav.Item className="mr-2">
        <Dropdown>
          <Dropdown.Toggle className="btn btn-success text-white" >
            Profile
          </Dropdown.Toggle>
          <Dropdown.Menu className="text-center">
            <Link to="/MyProfile"> View My Profile </Link>
            <Dropdown.Divider />
            <Link to="/ProfileSettings"> Profile Settings </Link>
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
