import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/header/Header';
import WelcomeBody from './components/welcome/WelcomeBody';
import ProfileSettingsBody from './components/profileSettings/ProfileSettingsBody';
import MyProfileBody from './components/myProfile/MyProfileBody';
import Footer from './components/footer/Footer';
import About from './components/about/About';
import SuggestSalaryBody from './components/suggestSalary/SuggestSalaryBody';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      user: Object,
    }
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogIn(user, callback) {
    // TODO: add loading state in case of long response time
    if (user) {
      this.setState({
        loggedIn: true,
        user: user,
      });
      callback(this.state.user, this.state.loggedIn);
    }
  }

  handleLogOut(callback) {
    this.setState({
      loggedIn: false,
      user: null
    });
  }

  render() {
    console.log(this.state.loggedIn);
    return (
      <Router>
        <div className="App">
          <Header user={this.state.user} loggedIn={this.state.loggedIn} handleLogIn={this.handleLogIn} handleLogOut={this.handleLogOut}/>

          <Switch>
            <Route path='/' exact render={(props) => <WelcomeBody {...props} handleLogIn={this.handleLogIn}/>}/>

            <Route path='/Welcome' exact render={(props) => <WelcomeBody {...props} loggedIn={this.state.loggedIn} handleLogIn={this.handleLogIn}/>}/>

            <Route path='/ProfileSettings' exact render={(props) => <ProfileSettingsBody {...props} loggedIn={this.state.loggedIn}
                user={this.state.user} handleLogOut={this.handleLogOut}/>}/>

            <Route path='/MyProfile' exact render={(props) => <MyProfileBody {...props} loggedIn={this.state.loggedIn} user={this.state.user}/>}/>

            <Route path='/Salary' exact render={(props) => <SuggestSalaryBody {...props} loggedIn={this.state.loggedIn} user={this.state.user}/>}/>

            <Route path='/About' exact component={About}/>
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
