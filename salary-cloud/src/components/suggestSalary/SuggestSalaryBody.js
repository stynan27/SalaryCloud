import React from 'react';
import Rent from './Rent';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './suggestSalary.css';

class SuggestSalaryBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: "bar"
    }
    this.handleLocationSubmit = this.handleLocationSubmit.bind(this);
  }

  handleLocationSubmit(payload) {
    console.log(payload);
  }

  render() {
    return (
      <Container className="suggestSalaryBody h-100" fluid>
        <Row>
          <Col md={3} xs={12}>
            <Rent handleLocationSubmit={this.handleLocationSubmit}/>
          </Col>
          <Col md={9} xs={12} align="center"> <div> Hello World again! </div> </Col>
        </Row>
      </Container>
    );
  }
}

export default SuggestSalaryBody;
