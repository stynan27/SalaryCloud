import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './myProfile.css';

class About extends React.Component {
    constructor() {
        super()
        this.state = {
        }
      }

    render(){
        return (
          <Row className="mt-3 boxShadow">
            <Col>
              <div className="About">
                  <h3 className="mt-1">About Me:</h3>
                  <p>Some text about me.</p>
              </div>
            </Col>
          </Row>
        );
    }
}

export default About;
