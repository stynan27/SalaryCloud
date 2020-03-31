import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Col';
import Col from 'react-bootstrap/Col';

class Contact extends React.Component {
    constructor() {
        super()
        this.state = {
          phoneNumber: "(716)-808-1234",
        }
      }

    render(){
        return (
            <Row className="row justify-content-center">
                <Col className="" style={{textAlign: "left",}}>
                    <h3>Contact Information</h3>
                </Col>
                <Col className="justidfy-content-right my-1" style={{textAlign: "right",}}>
                    <Button style={{borderRadius: "50%",}}>+</Button>
                </Col>
            </Row>
        );
    }
}

export default Contact;