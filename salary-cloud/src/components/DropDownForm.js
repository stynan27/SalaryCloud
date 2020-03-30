import React from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { Link } from 'react-router-dom';
import api from '../api/api';

class DropDownForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
    };
  }

  handleChangeInputEmail = async (event) => {
    const emailInput = event.target.value;
    this.setState({ email: emailInput });
  }

  handleChangeInputPassword = async (event) => {
    const passwordInput = event.target.value;
    this.setState({ password: passwordInput });
  }

  handleChangeInputPasswordConfirmation = async (event) => {
    const passwordConfirmationInput = event.target.value;
    this.setState({ passwordConfirmation: passwordConfirmationInput });
  }

  handleCreateUser = async (event) => {
    const {email, password, passwordConfirmation} = this.state;
    if (password !== passwordConfirmation) {
      window.alert("Passwords don't match!");
    } else {
      await api.createUser({email, hash: password}).then(response => {
        window.alert("User created!");
        this.setState({
          email: '',
          password: '',
          passwordConfirmation: ''
        });
      });
      // TODO: REDIRECT TO ProfileSettings Page
    }

  }

  render () {
    const {email, password, passwordConfirmation} = this.state;

    return(
      <div className="mx-2">
          <InputGroup className="mb-3">
            <FormControl
              type="email"
              placeholder="Email"
              aria-label="Email"
              aria-describedby="email-input"
              value={email}
              onChange={this.handleChangeInputEmail}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <FormControl
              type="password"
              placeholder="Password"
              aria-label="Password"
              aria-describedby="password-input"
              value={password}
              onChange={this.handleChangeInputPassword}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <FormControl
              type="password"
              placeholder="Confirm Password"
              aria-label="Confirm Password"
              aria-describedby="confirmation-input"
              value={passwordConfirmation}
              onChange={this.handleChangeInputPasswordConfirmation}
            />
          </InputGroup>

            <Button variant="primary" onClick={this.handleCreateUser}>
              Submit
            </Button>{' '}
        </div>
    );

  }
}

export default DropDownForm;
