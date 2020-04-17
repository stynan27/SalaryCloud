import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function LoggedOut(props) {
  return (
    <Nav className="justify-content-end w-25 ml-auto text-right">
      <Nav.Item className="w-100">
        <Dropdown className="">
          <Dropdown.Toggle className="log-btn" variant="success"> Log In </Dropdown.Toggle>

          <Dropdown.Menu className="log-btn text-center">
            <div className="mx-2" onSubmit={props.handleSubmit}>
              <Form>
                <Form.Group controlId="formEmail">
                  <Form.Control name="email" type="email" placeholder="Enter Email" onChange={props.handleInputChange}/>
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Control name="password" type="password" placeholder="Enter Password" onChange={props.handleInputChange} />
                </Form.Group>
                <Button type="submit" variant="primary"> Submit </Button>
              </Form>
            </div>
          </Dropdown.Menu>

        </Dropdown>
      </Nav.Item>
    </Nav>
  );
}

export default LoggedOut;
