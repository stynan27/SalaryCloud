import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import state_codes_to_names from './state_codes_to_names.json';
import county_codes_to_names from './county_codes_to_names_OG.json';

class Rent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stateCode: "",
      county: "",
      counties: Object,
      countyCode: "",
      subCountySelected: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleLocationSubmit(this.state);
  }

  handleSelect = async (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;

    if (name.localeCompare("stateCode") === 0 && value) {
      let countyCodes = county_codes_to_names[value];
      if (!countyCodes) {
        console.log(`Could not find state with FIP ${value}`);
        return;
      }
      this.setState({
        counties: countyCodes,
        countyCode: "",
        subCountySelected: false
      });
    }
    if (name.localeCompare("county")) {
      this.setState({
        subCountySelected: false
      });
    }

    if (name.localeCompare("subCounty") === 0 && value) {
      this.setState({
        countyCode: value,
        subCountySelected: true
      });
      return;
    } else {
      this.setState({subCountySelected: false});
    }

    this.setState({
      [name]: value
    });
  }

  generateStatesDropdown() {
    return [<option key={-1} disabled value=""></option>].concat(Object.keys(state_codes_to_names).map((key, i) => {
      return <option key={i} value={key}> {state_codes_to_names[key]} </option>;
    }));
  }


  render() {
    let states = this.generateStatesDropdown();

    let subCounties = [<option key={-1} value=""></option>];
    let counties = [<option key={-1} value=""></option>];
    let i = 0;
    let k = 0;
    for (var key in this.state.counties) {
      if (Array.isArray(this.state.counties[key])) {
        subCounties = subCounties.concat(this.state.counties[key].map((name, j) => {
          k++;
          if (this.state.subCountySelected && this.state.countyCode.localeCompare(key)) {
            return <option key={k-1} value={key} selected> {name} </option>;
          }
          return <option key={k-1} value={key}> {name} </option>;
        }));
      } else {
        if (key.localeCompare(this.state.countyCode)) {
          counties.push(<option key={i} value={key} selected> {this.state.counties[key]} </option>);
        } else {
          counties.push(<option key={i} value={key}> {this.state.counties[key]} </option>);
        }
        i++;
      }
    }

    return (
      <Form align="center">
        <Form.Group>
          <Form.Label> State </Form.Label>
          <Form.Control as="select" name="stateCode"
          onChange={this.handleSelect} defaultValue="" custom>
            {states}
          </Form.Control>
          <Form.Text className=""> Select your State first. Then your County. </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label> County </Form.Label>
          <Form.Control as="select" name="county"
          onChange={this.handleSelect} custom>
            {counties}
          </Form.Control>
          <Form.Text> Don't see your County? Try the Sub-counties list below. </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label> Sub County </Form.Label>
          <Form.Control as="select" name="subCounty"
          onChange={this.handleSelect} custom>
            {subCounties}
          </Form.Control>
          <Form.Text> We'll try to map your Sub-county to a matching FIPs County Code.</Form.Text>
        </Form.Group>

        <Button
        variant="primary"
        type="submit"
        align="center"
        onClick={this.handleSubmit}> Submit
        </Button>
      </Form>
    );
  }
}

export default Rent;
