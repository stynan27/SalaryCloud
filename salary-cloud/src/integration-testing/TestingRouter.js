import React from 'react'

import { Router, Route, Switch } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import DropDownForm from '../components/welcome/DropDownForm';
import ProfileSettingsBody from '../components/profileSettings/ProfileSettingsBody';

const history = createMemoryHistory()

function handleLogIn(user, callback) {
  let loggedIn = true;
  callback(user, loggedIn);
}

const TestingRouter = ({ RedirectUrl, user }) => (
  <Router history={history}>
    <Switch>
      <Route path="/" exact={true} render={() => <DropDownForm handleLogIn={handleLogIn}/>} />
      <Route path={RedirectUrl} render={(props) => <ProfileSettingsBody {...props} />} />
    </Switch>
  </Router>
)

export default TestingRouter