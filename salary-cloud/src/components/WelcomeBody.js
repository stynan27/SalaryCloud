import React from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

function WelcomeBody() {
  return (
    <div className="WelcomeBody" align="center">
      <h1>Welcome to SalaryCloud</h1>
      
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Create Account
        </Dropdown.Toggle>

        <Dropdown.Menu className="text-center">
          <div className="mx-2">
            <InputGroup className="mb-3">
              <FormControl
                input type="email"
                placeholder="Email"
                aria-label="Email"
                aria-describedby="email-input"
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <FormControl
                input type="password"
                placeholder="Password"
                aria-label="Password"
                aria-describedby="password-input"
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <FormControl
                input type="password"
                placeholder="Confirm Password"
                aria-label="Confirm Password"
                aria-describedby="confirmation-input"
              />
            </InputGroup>

            <Button variant="primary" onClick={() => {console.log('Printing $$$')}}>
              Submit
            </Button>{' '}
          </div>
            

        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default WelcomeBody;