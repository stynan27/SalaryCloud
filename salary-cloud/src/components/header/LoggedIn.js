import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';

function LoggedIn(props) {
  const logOutHandler = props.handleLogOut;

  return (
    <Nav className="justify-content-end ">
      <Nav.Item className="mr-2">
        <Dropdown>
          <Dropdown.Toggle data-testid="profile-dropdown-button" className="btn btn-success text-white" >
            Profile
          </Dropdown.Toggle>
          <Dropdown.Menu className="text-center">
            <Link to="/MyProfile"> View My Profile </Link>
            <Dropdown.Divider />
            <Link data-testid="profile-settings-link" to="/ProfileSettings"> Profile Settings </Link>
          </Dropdown.Menu>
        </Dropdown>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link data-testid="logout-link" className="btn btn-success text-white" role="button" onClick={logOutHandler}> Log Out </Nav.Link>
      </Nav.Item>
    </Nav>
  );

}

export default LoggedIn;
