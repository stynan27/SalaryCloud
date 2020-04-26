import React from 'react';
import ReactDOM from 'react-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { render, cleanup, getByTestId, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import DropDownForm from '../src/components/welcome/DropDownForm';
import usersApi from '../src/api/users-api';

const mockData = {
    email: "testEmail23@gmail.com",
    password: "password123"
};

it("DropDownForm renders properly", () => {
    const div = document.createElement("div");
    ReactDOM.render(
    <Dropdown.Menu className="text-center">
        <DropDownForm />
    </Dropdown.Menu>, div)
    ReactDOM.unmountComponentAtNode(div);
});

it("DropDownForm inputs can be submitted", async () => {
    const { getByTestId } = render(<DropDownForm />);

    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const confirmInput = getByTestId('confirm-password-input');
    const submitButton = getByTestId('submit-button');

    fireEvent.change(emailInput, { target: { value: mockData['email'] } });
    fireEvent.change(passwordInput, { target: { value: mockData['password'] } });
    fireEvent.change(confirmInput, { target: { value: mockData['password'] } });

    expect(emailInput).toHaveValue(mockData['email']);
    expect(passwordInput).toHaveValue(mockData['password']);
    expect(confirmInput).toHaveValue(mockData['password']);

    global.alert = jest.fn();

    fireEvent.click(submitButton);

    // wait for alert to pop-up signaling submit of form data
    expect(global.alert).toHaveBeenCalledTimes(1);

    // TODO: Need a way to grab DropDownForm state variables after setState()

});

//it("User created successfully", async () => {
    // TODO: Fix
    //await waitFor({}, { timeout: 2000, interval: 2000 });

    // usersApi.getUserById();
//});

// it("Anonymous user created successfully", async () => {

// });