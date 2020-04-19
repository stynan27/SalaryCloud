import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {Redirect} from 'react-router-dom';

import ProfileSettingsForm from './ProfileSettingsForm';

function ProfileSettingsBody(props) {
  let user, loggedIn = null;
  console.log(props);
  
  if (props.location.givenProps && props.location.givenProps.loggedIn) {
    loggedIn = props.location.givenProps.loggedIn;
    user = props.location.givenProps.user;
  }

  if (props.loggedIn) {
    loggedIn = props.loggedIn;
    user = props.user;
  }

  if (!loggedIn || user === undefined){
    return <Redirect to="/Welcome" />
  }

  return (
    <Container className="ProfileSettings mt-2 mb-2"  align="center" fluid>
      <Row className="justify-content-center">
        <h1 className="mt-3">Profile Settings</h1>
      </Row>

      <Row className="justify-content-center">
          <ProfileSettingsForm  loggedIn={loggedIn} user={user}/>
      </Row>
    </Container>
  );
}

export default ProfileSettingsBody;
