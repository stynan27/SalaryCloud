import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header';
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
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
            <Switch>
              <Route path='/' exact component={WelcomeBody}/>
              <Route path='/Welcome' exact component={WelcomeBody}/>
              <Route path='/ProfileSettings' exact component={ProfileSettingsBody}/>
              <Route path='/MyProfile' exact component={MyProfileBody}/>
              <Route path='/About' exact component={About}/>
            </Switch>
        </div>
        <Footer />
      </Router>
    );
  }
}

export default App;
