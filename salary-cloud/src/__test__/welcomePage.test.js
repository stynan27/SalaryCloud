import React from 'react';
import WelcomeBody from '../components/welcome/WelcomeBody';
import DropDownForm from '../components/welcome/DropDownForm';
import Dropdown from 'react-bootstrap/Dropdown';


import renderer from 'react-test-renderer';
import {render, fireEvent, screen} from '@testing-library/react'

import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme'
import {shallow} from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
});

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

    it ('should not display the Dropdown Form before the Create Account button is clicked', () => {
      render(<WelcomeBody />);
      // NOTE: Null == no element found
      // Find Create Account Button
      const dropdownButton = screen.queryByText(/create account/i);
      expect(dropdownButton).not.toBeNull();
      // Assert that dropdown inputs and submit button should not be present
      expect(screen.queryByPlaceholderText(/email/i)).toBeNull();
      expect(screen.queryByPlaceholderText(/password/i)).toBeNull();
      expect(screen.queryByPlaceholderText(/confirm password/i)).toBeNull();
      expect(screen.queryByText(/submit/i)).toBeNull();
    });

    it ('should create a Dropdown Form when Create Account is clicked', () => {
      render(<WelcomeBody />);
      const dropdownButton = screen.queryByText(/create account/i);
      expect(dropdownButton).not.toBeNull();
      // Click Button and assert that inputs and button are present
      // NOTE: Will fail assertions if elements found != 1
      fireEvent.click(dropdownButton);
      const emailInput = screen.queryByPlaceholderText(/email/i);
      expect(emailInput).not.toBeNull();
      const passwordInput = screen.queryByPlaceholderText(/^password$/i);
      expect(passwordInput).not.toBeNull();
      // Match on placeholder containing 'confirm password' or 'password confirmation' strings
      const passwordConfInput = screen.queryByPlaceholderText(/confirm password|password confirmation/i);
      expect(passwordConfInput).not.toBeNull();
      const submitButton = screen.queryByText(/submit/i);
      expect(passwordConfInput).not.toBeNull();
      console.log(screen.debug());
    });

  });

});
