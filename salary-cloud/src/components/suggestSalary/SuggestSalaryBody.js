import React from 'react';
import Rent from './Rent';
import RentDisplay from './RentDisplay';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import state_codes_to_names from './state_codes_to_names.json';
import county_codes_to_names from './county_codes_to_names_OG.json';

import './suggestSalary.css';

class SuggestSalaryBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stateCode: "",
      stateName: "",
      countyName: "",
      countyCode: ""
    }
    this.handleLocationSubmit = this.handleLocationSubmit.bind(this);
  }

  handleLocationSubmit(payload) {
    let stateName = state_codes_to_names[payload.stateCode];
    let countyName = county_codes_to_names[payload.stateCode][payload.countyCode];
    console.log(payload.countyCode);
    this.setState({
      stateCode: payload.stateCode,
      stateName: stateName,
      countyCode: payload.countyCode,
      countyName: countyName
    });
  }

  render() {
    return (
      <Container className="suggestSalaryBody h-100" fluid>
        <Row>
          <Col md={3} xs={12}>
            <Rent handleLocationSubmit={this.handleLocationSubmit}/>
          </Col>
          <Col md={9} xs={12} align="center">
            <RentDisplay stateName={this.state.stateName} countyName={this.state.countyName}/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SuggestSalaryBody;
