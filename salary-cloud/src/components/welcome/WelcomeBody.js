import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropDownForm from './DropDownForm';

import './welcome.css';

function WelcomeBody(props) {
  return (
    <div className="WelcomeBody container-fluid h-100" align="center">
        <h1>Welcome to SalaryCloud</h1>

        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Create Account
          </Dropdown.Toggle>

          <Dropdown.Menu className="text-center">
            <DropDownForm handleLogIn={props.handleLogIn} />
          </Dropdown.Menu>
        </Dropdown>
    </div>
  );
}

export default WelcomeBody;
