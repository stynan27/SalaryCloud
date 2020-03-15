import React from 'react';
import './App.css';
import WelcomeBody from './components/WelcomeBody';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function App() {
  return (
    <div className="App">
      <Navbar className="border-bottom border-success" bg="light" variant="light">
        <Navbar.Brand className="mr-auto" href="/">
          <h1> Salary Cloud </h1>
        </Navbar.Brand>

        <Nav className="ml-auto">
          <Nav.Item className="mr-2">
            <Nav.Link className="btn btn-success text-white" href="#" role="button"> Profile </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="btn btn-success text-white" href="#" role="button"> Login </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>

      <WelcomeBody />
    </div>
  );
}

export default App;
