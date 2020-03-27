import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import ProfileSettingsForm from './ProfileSettingsForm';

function ProfileSettingsBody() {
  return (
    <Container className="ProfileSettings"  align="center">
      <Row className="justify-content-center">
        <h1 className="mt-3">Profile Settings</h1>
      </Row>

      <Row className="justify-content-center">
          <ProfileSettingsForm />
      </Row>
    </Container>
  );
}

export default ProfileSettingsBody;
