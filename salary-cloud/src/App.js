import React from 'react';
import './App.css';

import Header from './components/Header';
import Body from './components/Body';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      currentPath: "Welcome",
      loggedIn: false,
    }
  }
  
  render() {
    return (
      <div className="App">
        <Header />
        <Body currentPath={this.state.currentPath}/>
      </div>
    );
  }
}

export default App;
