import React from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { Redirect } from 'react-router-dom';
import usersApi from '../../api/users-api';

class DropDownForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toProfileSettings: false,
      email: '',
      password: '',
      passwordConfirmation: '',
      user: Object,
      loggedIn: props.loggedIn
    };
    this.handleChangeInputEmail = this.handleChangeInputEmail.bind(this);
    this.handleChangeInputPassword = this.handleChangeInputPassword.bind(this);
    this.handleChangeInputPasswordConfirmation = this.handleChangeInputPasswordConfirmation.bind(this);
    this.handleCreateUser = this.handleCreateUser.bind(this);
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
      // TODO: replate window.alert with less aggressive alert
      window.alert("Passwords don't match!");
    } else {
      window.alert("Please wait while profile is being created...");
      await usersApi.createUser({email, hash: password}).then(response => {
          window.alert("User created!");
          const user = {userId: response.data.userId, anonId: response.data.anonId};
          this.props.handleLogIn(user, (user, loggedIn) => {
            this.setState({
              toProfileSettings: true,
              email: '',
              password: '',
              passwordConfirmation: '',
              user: user,
              loggedIn: loggedIn
            });
          });
      }).catch(error => {
        console.log(error);
        window.alert("User Was not created successfully");
      });
    }

  }

  render () {
    if (this.state.toProfileSettings === true) {
      const user = this.state.user;
      const loggedIn = this.state.loggedIn;
      return <Redirect to={{ pathname: "/ProfileSettings", givenProps: { loggedIn: loggedIn, user: user }}} />
    }

    const {email, password, passwordConfirmation} = this.state;

    return(
      <div className="mx-2">
          <InputGroup className="mb-3">
            <FormControl
              data-testid="email-input"
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
              data-testid="password-input"
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
              data-testid="confirm-password-input"
              type="password"
              placeholder="Confirm Password"
              aria-label="Confirm Password"
              aria-describedby="confirmation-input"
              value={passwordConfirmation}
              onChange={this.handleChangeInputPasswordConfirmation}
            />
          </InputGroup>

          <Button variant="primary" data-testid="submit-button" onClick={this.handleCreateUser}>
            Submit
          </Button>
        </div>
    );

  }
}

export default DropDownForm;
