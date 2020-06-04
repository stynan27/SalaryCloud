import React from 'react';

import ReactDOM from 'react-dom';
import { render, cleanup, fireEvent, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from '../../../App';

const mockData = {
    email: "testEmail1@gmail.com",
    hash: "password123"
};

describe('Create Integration Tests', () => {
    afterEach(cleanup);

    it("App renders properly", () => {
        const div = document.createElement("div");
        ReactDOM.render(<App/>, div)
        ReactDOM.unmountComponentAtNode(div);
    });

    it("App can Register a new User profile", async () => {
        const { debug, getByText, getByTestId } = render(<App />);

        const welcomeHeader = getByTestId('welcome-header');

        expect(welcomeHeader.innerHTML).toMatch('Welcome to SalaryCloud');

        const dropDownButton = getByTestId('dropdown-button');

        fireEvent.click(dropDownButton);

        const emailInput = getByTestId('email-input');
        const passwordInput = getByTestId('password-input');
        const confirmInput = getByTestId('confirm-password-input');
        const submitButton = getByTestId('submit-button');

        fireEvent.change(emailInput, { target: { value: mockData['email'] } });
        fireEvent.change(passwordInput, { target: { value: mockData['hash'] } });
        fireEvent.change(confirmInput, { target: { value: mockData['hash'] } });

        expect(emailInput).toHaveValue(mockData['email']);
        expect(passwordInput).toHaveValue(mockData['hash']);
        expect(confirmInput).toHaveValue(mockData['hash']);

        global.alert = jest.fn();

        fireEvent.click(submitButton);

        // wait for alert to pop-up signaling submit of form data
        expect(global.alert).toHaveBeenCalledTimes(1);

        // Currently broken in latest version of react-testing library...
        // await waitFor(() => {
        //     expect(getByText('Profile Settings')).toBeInTheDocument();
        // });

        try {
            // Wait for Redirection to Profile Settings Page
            //await wait(() => getByText("Current Salary"));
            await wait(() => getByTestId("profile-settings-header"));
        } catch (err) {
            debug();
            throw err;
        }

        expect(getByTestId("profile-settings-header").innerHTML).toMatch('Profile Settings');
    });

    it("App can Delete the newly created User profile", async () => {
        // Login
        const { debug, getByText, getByTestId } = render(<App />);

        const logInDropdownButton = getByTestId("logIn-dropdown-button");

        fireEvent.click(logInDropdownButton);

        const emailInput = getByTestId('logIn-email-input');
        const passwordInput = getByTestId('logIn-password-input');
        const submitButton = getByTestId('logIn-submit-button');

        fireEvent.change(emailInput, { target: { value: mockData['email'] } });
        fireEvent.change(passwordInput, { target: { value: mockData['hash'] } });

        expect(emailInput).toHaveValue(mockData['email']);
        expect(passwordInput).toHaveValue(mockData['hash']);

        global.alert = jest.fn();

        fireEvent.click(submitButton);

        try {
            // Wait for Profile DropDown button to load
            await wait(() => getByTestId("profile-dropdown-button"));
        } catch (err) {
            debug();
            throw err;
        }

        fireEvent.click(getByTestId("profile-dropdown-button"));

         // Check for profile dropdown to load
         try {
            // Wait for Redirection to Profile Settings Page
            await wait(() => getByTestId("profile-settings-link"));
        } catch (err) {
            debug();
            throw err;
        }

        const linkToProfileSettings = getByTestId("profile-settings-link");

        fireEvent.click(linkToProfileSettings);

        // Check for Profile Settings text again
        try {
            // Wait for Redirection to Profile Settings Page
            await wait(() => getByTestId("profile-settings-header"));
        } catch (err) {
            debug();
            throw err;
        }

        expect(getByTestId("profile-settings-header").innerHTML).toMatch('Profile Settings');

        // Click Delete
        const deleteButton = getByTestId("profile-settings-delete-button");

        fireEvent.click(deleteButton);

        // wait for Redirection to Welcome page
        try {
            // Wait for Redirection to Profile Settings Page
            //await wait(() => getByText("Current Salary"));
            await wait(() => getByTestId('welcome-header'));
        } catch (err) {
            debug();
            throw err;
        }

        expect(getByTestId('welcome-header').innerHTML).toMatch('Welcome to SalaryCloud');
    });
});
