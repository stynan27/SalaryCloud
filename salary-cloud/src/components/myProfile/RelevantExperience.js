import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './myProfile.css';

class RelevantExperience extends React.Component {
    constructor() {
        super()
        this.state = {

        }
      }

    render(){
        return (
          <Row className="mt-3 boxShadow">
            <Col>
              <div className="RelevantExperience">
                  <h3>Experience</h3>
                  <h3>Skills</h3>
                  <h3>Education</h3>
                  <h3>Licenses/Certifications</h3>
              </div>
            </Col>
          </Row>
        );
    }
}

export default RelevantExperience;
