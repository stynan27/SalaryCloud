import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Contact extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          phoneNumber: "(716)-808-1234",
        }
      }

    render() {
        return (
          <Row className="boxShadow">
            <Col>
                <Row className="text-center title">
                  <Col>
                    <h5>Contact Information</h5>
                  </Col>
                </Row>

                <Row className="mt-10 mb-10">
                  <Col className="pb-2">
                    <Button style={{borderRadius: "50%",}}>+</Button>
                  </Col>
                </Row>
              </Col>
          </Row>
        );
    }
}

export default Contact;
