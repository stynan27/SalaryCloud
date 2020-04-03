import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './myProfile.css';

class ProfileVisibility extends React.Component {
    constructor() {
        super()
        this.state = {
        }
      }

    render() {
        return (
          <Row className="mt-3 boxShadow">
            <Col>
              <Row>
                <Col>
                  <h5 className="ProfileVisibility"> Profile Visibility </h5>
                </Col>
              </Row>

              <Row>
                <Col>
                  <div> You have 20 connections </div>
                </Col>
              </Row>
            </Col>
          </Row>
        );
    }
}

export default ProfileVisibility;
