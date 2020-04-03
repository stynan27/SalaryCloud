import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ProgressBar from 'react-bootstrap/ProgressBar';

import './myProfile.css';

class ProfileCompletion extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
      }

    render(){
      const now = 25;
      const progressInstance = (<ProgressBar now={now} label={`${now}%`} className="w-100"/>);
        return (
          <Row className="boxShadow">
            <Col className="justify-content-center">
              <Row className="ProfileCompletion">
                  <h3 className="mt-1">Profile Completeness: </h3>
              </Row>
              <Row>
                {progressInstance}
              </Row>
            </Col>
          </Row>
        );
    }
}

export default ProfileCompletion;
