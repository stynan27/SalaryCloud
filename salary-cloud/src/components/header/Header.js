import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './header.css';

import usersApi from '../../api/users-api';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const formTarget = event.target;
    const name = formTarget.name;
    const value = formTarget.value;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    const params = {email: this.state.email, hash: this.state.password}
    usersApi.login(params).then( (response) => {
      
    }).catch( (error) => {
      console.log(error);
    });
  }

  render() {
    const changeAccLogIn = () => {
      if (this.props.loggedIn){
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
      } else {
        return (
          <Nav className="justify-content-end w-25 ml-auto text-right">
            <Nav.Item className="w-100">
              <Dropdown className="">
                <Dropdown.Toggle className="log-btn" variant="success"> Log In </Dropdown.Toggle>
                <Dropdown.Menu className="log-btn text-center">
                  <div className="mx-2">
                    <Form>
                      <Form.Group controlId="formEmail">
                        <Form.Control name="email" type="email" placeholder="Enter Email" onChange={this.handleInputChange}/>
                      </Form.Group>

                      <Form.Group controlId="formPassword">
                        <Form.Control name="password" type="password" placeholder="Enter Password" onChange={this.handleInputChange} />
                      </Form.Group>
                      <Button type="submit" variant="primary" onClick={this.handleSubmit}> Submit </Button>
                    </Form>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
          </Nav>
        );
      }
    }
    return (
      <div className="Header h-auto">
          <Navbar className="border-bottom border-success" bg="light" variant="light">
            <Navbar.Brand className="mr-auto" href="/Welcome">
              <h1> SalaryCloud </h1>
            </Navbar.Brand>
            {changeAccLogIn()}
          </Navbar>
      </div>
    );
  }

}

export default Header;
