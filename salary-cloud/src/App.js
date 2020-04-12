import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/header/Header';
import WelcomeBody from './components/welcome/WelcomeBody';
import ProfileSettingsBody from './components/profileSettings/ProfileSettingsBody';
import MyProfileBody from './components/myProfile/MyProfileBody';
import Footer from './components/footer/Footer';
import About from './components/about/About';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      user: Object,
    }
    this.handleLogIn = this.handleLogIn.bind(this);
  }

  handleLogIn(user) {
    // TODO: add loading state in case of long response time
    this.setState({
      loggedIn: false,
      user: user,
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header user={this.state.user} loggedIn={this.state.loggedIn} handleLogIn={this.handleLogIn}/>
          <Switch>
            <Route path='/' exact render={(props) => <WelcomeBody {...props} handleLogIn={this.handleLogIn}/>}/>
            <Route path='/Welcome' exact render={(props) => <WelcomeBody {...props} handleLogIn={this.handleLogIn}/>}/>
            <Route path='/ProfileSettings' exact render={(props) => <ProfileSettingsBody {...props} loggedIn={this.state.loggedIn} user={this.state.user}/>}/>
            <Route path='/MyProfile' exact component={MyProfileBody}/>
            <Route path='/About' exact component={About}/>
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
