import React from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { Redirect } from 'react-router-dom';
import usersApi from '../../api/users-api';
import anonUsersApi from '../../api/anon-users-api';

class DropDownForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toProfileSettings: false,
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
      window.alert("Please wait while profile is being created...");
      await usersApi.createUser({email, hash: password}).then(response => {
          window.alert("User created!");
          this.setState({
            toProfileSettings: true,
            email: '',
            password: '',
            passwordConfirmation: ''
          });
      });
    }

  }

  render () {
    if (this.state.toProfileSettings === true) {
      return <Redirect to="/ProfileSettings" />
    }

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
