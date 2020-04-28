import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Redirect } from 'react-router-dom';

import ProfileSettingsForm from './ProfileSettingsForm';

function ProfileSettingsBody(props) {
  const handleLogOut = props.handleLogOut;
  let user, loggedIn = null;
  
  if (props.location.givenProps && props.location.givenProps.loggedIn) {
    loggedIn = props.location.givenProps.loggedIn;
    user = props.location.givenProps.user;
  }

  if (props.loggedIn) {
    loggedIn = props.loggedIn;
    user = props.user;
  }

  //console.log('userId: ' + user.userId + ' anonId: ' + user.anonId);

  if (!loggedIn || user === undefined){
    return <Redirect to="/Welcome" />
  }

  return (
    <Container className="ProfileSettings mt-2 mb-2"  align="center" fluid>
      <Row className="justify-content-center">
        <h1 className="mt-3">Profile Settings</h1>
      </Row>

      <Row className="justify-content-center">
          <ProfileSettingsForm  user={user} handleLogOut={handleLogOut}/>
      </Row>
    </Container>
  );
}

export default ProfileSettingsBody;
