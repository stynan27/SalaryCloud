import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import WelcomeBody from './components/WelcomeBody';
import CreateAccountBody from './components/CreateAccountBody';
import Footer from './components/footer/Footer';
import About from './components/about/About';

class App extends React.Component {
  constructor() {
    super()
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
              <Route path='/CreateAccount' exact component={CreateAccountBody}/>
              <Route path='/About' exact component={About}/>
            </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
