import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';

import './header.css';

import usersApi from '../../api/users-api';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
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

  handleSubmit = async (event) => {
    event.preventDefault();
    const params = {"email": this.state.email, "hash": this.state.password};
    await usersApi.login(params).then( (response) => {
      if (response.status !== 200) {
        console.log(response.message);
      } else {
        const user = {userId: response.data.userId, anonId: response.data.anonId};
        this.setState({ loading: true }, () => {
          this.props.handleLogIn(user, (user, loggedIn) => {
            this.setState({loading: false, email: '', password: ''});
          });
        });
      }
    }).catch( (error) => {
      console.log(error);
    });
  }

  render() {
    if (this.state.loading){
      return (
        <div className="Header h-auto">
          <Navbar className="border-bottom border-success" bg="light" variant="light">
            <Navbar.Brand className="mr-auto">
              <h1>
                <Link to="/Welcome">SalaryCloud</Link>
              </h1>
            </Navbar.Brand>
            <h1> Loading </h1>
          </Navbar>
        </div>
      );
    }
    if (this.props.loggedIn) {
      return(
        <div className="Header h-auto">
          <Navbar className="border-bottom border-success" bg="light" variant="light">
            <Navbar.Brand className="mr-auto">
              <h1>
                <Link to="/">SalaryCloud</Link>
              </h1>
            </Navbar.Brand>
            <LoggedIn handleLogOut={this.props.handleLogOut}/>
          </Navbar>
        </div>
      );
    } else {
      return(
        <div className="Header h-auto">
          <Navbar className="border-bottom border-success" bg="light" variant="light">
            <Navbar.Brand className="mr-auto">
              <h1>
                <Link to="/Welcome">SalaryCloud</Link>
              </h1>
            </Navbar.Brand>
            <LoggedOut handleInputChange={this.handleInputChange} handleSubmit={this.handleSubmit}/>
          </Navbar>
        </div>
      );
    }
  }
}

export default Header;
