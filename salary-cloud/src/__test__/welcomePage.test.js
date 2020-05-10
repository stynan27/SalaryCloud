import React from 'react';
import WelcomeBody from '../components/welcome/WelcomeBody';
import DropDownForm from '../components/welcome/DropDownForm';
import Dropdown from 'react-bootstrap/Dropdown';
import renderer from 'react-test-renderer';
import {render, fireEvent, screen} from '@testing-library/react'

import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme'
import {shallow} from 'enzyme';

Enzyme.configure({ adapter: new Adapter() })

describe ('Welcome Page', () => {
  it ('should render the usual html without crashing', () => {
    const body = renderer.create(<WelcomeBody />).toJSON();
    expect(body).toMatchSnapshot();
  });

  describe ('Create Account DropDownForm on Welcome Page', () => {
    it ('should render the usual html without crashing', () => {
      const dropdown = renderer.create(
        <DropDownForm loggedIn={false} handleLogIn={() => {return true}}/>
      ).toJSON();
      expect(dropdown).toMatchSnapshot();
    });

    it ('should render input groups that update onChange, but retain input', () => {
      // const dropdown = shallow(<DropDownForm loggedIn={false} handleLogIn={() => {return true}}/>);
      // var handleInputChange = (input) => { preventDefault: () => console.log('preventDefault')};
      // console.log(dropdown.debug());
      // const inputGroup = body.find('.input-group');
      // expect(inputGroup).toHaveLength(3);
      // expect(inputGroup[0].find('input').prop('type')).toEqual('email');
      // expect(inputGroup[1].find('input').prop('type')).toEqual('password');
      // expect(inputGroup[2].find('input').prop('type')).toEqual('password');
      // // Check for Submit Button
      // const buttons = body.find('button');
      // expect(buttons).to.have.lengthOf(2);
      // expect(buttons[1].text()).toEqual('Submit');
    });

    it ("should remove the dropdown on click", () => {
      render(<WelcomeBody />);
      expect(screen.queryByText('Create Account')).toBeInTheDocument();
    });

  });

});
