import React from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { Link } from 'react-router-dom';

function DropDownForm() {
    return (
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

            <Link to='/ProfileSettings'>
              <Button variant="primary">
                Submit
              </Button>{' '}
            </Link>
          </div>
    );
}

export default DropDownForm;