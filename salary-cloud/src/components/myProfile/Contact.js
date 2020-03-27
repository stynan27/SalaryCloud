import React from 'react';
import Container from 'react-bootstrap/Container';
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
            <Container className="Contact">
                <Row>
                    <Col className="mt-1" style={{textAlign: "left",}}>
                        <h3>Contact</h3>
                    </Col>
                    <Col className="mt-1" style={{textAlign: "right",}}>
                        <h3>+</h3>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Contact;