import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
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
          this.props.handleLogIn(user, ()=> {
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
            <Navbar.Brand className="mr-auto" href="/Welcome">
              <h1> SalaryCloud </h1>
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
            <Navbar.Brand className="mr-auto" href="/Welcome">
              <h1> SalaryCloud </h1>
            </Navbar.Brand>
            <LoggedIn />
          </Navbar>
        </div>
      );
    } else {
      return(
        <div className="Header h-auto">
          <Navbar className="border-bottom border-success" bg="light" variant="light">
            <Navbar.Brand className="mr-auto" href="/Welcome">
              <h1> SalaryCloud </h1>
            </Navbar.Brand>
            <LoggedOut handleInputChange={this.handleInputChange} handleSubmit={this.handleSubmit}/>
          </Navbar>
        </div>
      );
    }
  }
}

export default Header;
