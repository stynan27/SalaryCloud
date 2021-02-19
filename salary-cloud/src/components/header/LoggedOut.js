import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


// <Nav className="justify-content-end w-25 ml-auto text-right">
//   <Nav.Item className="w-100">
//     <Dropdown>
//       <Dropdown.Toggle data-testid="logIn-dropdown-button" className="log-btn" variant="success"> Log In </Dropdown.Toggle>
//
//       <Dropdown.Menu className="dropdown-right text-center">
//         <div className="mx-2" onSubmit={props.handleSubmit}>
//           <Form>
//             <Form.Group controlId="formEmail">
//               <Form.Control data-testid="logIn-email-input" name="email" type="email" placeholder="Enter Email" onChange={props.handleInputChange}/>
//             </Form.Group>
//
//             <Form.Group controlId="formPassword">
//               <Form.Control data-testid="logIn-password-input" name="password" type="password" placeholder="Enter Password" onChange={props.handleInputChange} />
//             </Form.Group>
//             <Button data-testid="logIn-submit-button" type="submit" variant="primary"> Submit </Button>
//           </Form>
//         </div>
//       </Dropdown.Menu>
//
//     </Dropdown>
//   </Nav.Item>
// </Nav>

function LoggedOut(props) {
  return (
        <Dropdown className="w-100">
          <Dropdown.Toggle
          data-testid="logIn-dropdown-button"
          className="log-btn"
          variant="success"> Log In </Dropdown.Toggle>

          <Dropdown.Menu className="text-center">
            <div className="mx-2" onSubmit={props.handleSubmit}>
              <Form>
                <Form.Group controlId="formEmail">
                  <Form.Control data-testid="logIn-email-input" name="email" type="email" placeholder="Enter Email" onChange={props.handleInputChange}/>
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Control data-testid="logIn-password-input" name="password" type="password" placeholder="Enter Password" onChange={props.handleInputChange} />
                </Form.Group>
                <Button data-testid="logIn-submit-button" type="submit" variant="primary"> Submit </Button>
              </Form>
            </div>
          </Dropdown.Menu>

        </Dropdown>
  );
}

export default LoggedOut;
