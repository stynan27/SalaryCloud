import React from 'react';

import ReactDOM from 'react-dom';
import { render, cleanup, fireEvent, wait, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import usersApi from '../../../api/users-api';
import App from '../../../App';
import ProfileSettingsBody from '../../../components/profileSettings/ProfileSettingsBody';

const mockLoginData = {
    email: "testEmail2@gmail.com",
    hash: "password123"
};

const mockProfileData = {
    position: 'Software Engineer',
    state: 'New York',
    city: 'Buffalo',
    salary: 60000,
    company: 'Some Company LTD',
    yearsOfExp: 2
};

let USERID = '';
let ANONID = '';

describe('Update Integration Tests', () => {
    beforeAll(async () => {
        // Create User with API call
        await usersApi.createUser(mockLoginData).then(response => {
            console.log('User created with userID: ' + response.data.userId + ' and anonID: ' + response.data.anonId);
            USERID = response.data.userId;
            ANONID = response.data.anonId;
        }).catch(error => {
          console.log(error);
        });
    });

    afterAll(async () => {
        await usersApi.deleteUser(USERID, ANONID).then((response) => {
            if (response.status === 200) {
                console.log("User Deleted Successfully!");;
            } else {
                console.log("Invalid HTTP response code!");
                console.log(response.status);
            }
        }).catch(error => {
            console.log(error);
        });
    });

    it('App can Successfully Login and Logout an existing User', async ()=> {
        const { debug, getByText, getByTestId } = render(<App />);

        const logInDropdownButton = getByTestId("logIn-dropdown-button");

        fireEvent.click(logInDropdownButton);

        const emailInput = getByTestId('logIn-email-input');
        const passwordInput = getByTestId('logIn-password-input');
        const submitButton = getByTestId('logIn-submit-button');

        fireEvent.change(emailInput, { target: { value: mockLoginData['email'] } });
        fireEvent.change(passwordInput, { target: { value: mockLoginData['hash'] } });

        expect(emailInput).toHaveValue(mockLoginData['email']);
        expect(passwordInput).toHaveValue(mockLoginData['hash']);

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

        // Check for Profile Settings text
        try {
            // Wait for Redirection to Profile Settings Page
            await wait(() => getByTestId("profile-settings-header"));
        } catch (err) {
            debug();
            throw err;
        }

        expect(getByTestId("profile-settings-header").innerHTML).toMatch('Profile Settings');

        // Find and populate each form input
        const positionInput = getByTestId('profile-settings-positionTitle-input');
        const stateInput = getByTestId('profile-settings-state-input');
        const cityInput = getByTestId('profile-settings-city-input');
        const salaryInput = getByTestId('profile-settings-salary-input');
        const companyInput = getByTestId('profile-settings-company-input');
        const experienceInput = getByTestId('profile-settings-yearsofexp-input');
        const submitSettingsButton = getByTestId('profile-settings-submit-button');

        // click and then select corresponding option
        // fireEvent.change(positisonInput, { target: { value: mockProfileData['position'] } });
        // fireEvent.change(stateInput, { target: { value: mockProfileData['state'] } });
        // fireEvent.change(cityInput, { target: { value: mockProfileData['city'] } });

        // TODO: Figure out how to select an option via clicking
        // fireEvent.click(positionInput);
        // fireEvent.keyDown(positionInput, {keyCode: 40 });
        // await wait(() => getByText("Software Engineer"));
        // fireEvent.click(getByText("Software Engineer"));
        positionInput.value = "Software Engineer";
        fireEvent.change(positionInput, {target: {value: "Software Engineer"}});

        //fireEvent.click(stateInput);
        //fireEvent.keyDown(stateInput, {key: 'ArrowDown'});
        // await wait(() => getByText('New York'));
        // fireEvent.click(getByText("New York"));
        stateInput.value = "New York";
        fireEvent.change(stateInput, {target: {value: "New York"}});

        // fireEvent.click(cityInput);
        // await wait(() => getByText('Buffalo'));
        // fireEvent.click(getByText("Buffalo"));
        cityInput.value = "Buffalo";
        fireEvent.change(cityInput, {target: {value: "Buffalo"}});

        fireEvent.change(salaryInput, { target: { value: mockProfileData['salary'] } });
        fireEvent.change(companyInput, { target: { value: mockProfileData['company'] } });
        fireEvent.change(experienceInput, { target: { value: mockProfileData['yearsOfExp'] } });

        expect(positionInput).toHaveValue(mockProfileData['position']);
        expect(stateInput).toHaveValue(mockProfileData['state']);
        expect(cityInput).toHaveValue(mockProfileData['city']);
        expect(salaryInput).toHaveValue(mockProfileData['salary']);
        expect(companyInput).toHaveValue(mockProfileData['company']);
        expect(experienceInput).toHaveValue(mockProfileData['yearsOfExp']);

        // Submit form
        fireEvent.click(submitSettingsButton);

        // Check LogOut functionality
        const logOutButton = getByTestId("logout-link");

        fireEvent.click(logOutButton);

        // Check for Welcome text
        try {
            // Wait for Redirection to Profile Settings Page
            await wait(() => getByTestId('welcome-header'));
        } catch (err) {
            debug();
            throw err;
        }

        expect(getByTestId('welcome-header').innerHTML).toMatch('Welcome to SalaryCloud');
    });

    it('App can Successfully Display Updates made to an existing User Profile', async ()=> {
        // Login
        const { debug, getByText, queryByText, getByTestId } = render(<App />);

        const logInDropdownButton = getByTestId("logIn-dropdown-button");

        fireEvent.click(logInDropdownButton);

        const emailInput = getByTestId('logIn-email-input');
        const passwordInput = getByTestId('logIn-password-input');
        const submitButton = getByTestId('logIn-submit-button');

        fireEvent.change(emailInput, { target: { value: mockLoginData['email'] } });
        fireEvent.change(passwordInput, { target: { value: mockLoginData['hash'] } });

        expect(emailInput).toHaveValue(mockLoginData['email']);
        expect(passwordInput).toHaveValue(mockLoginData['hash']);

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

        // Check for Profile Settings text
        try {
            // Wait for Redirection to Profile Settings Page
            await wait(() => getByTestId("profile-settings-header"));
        } catch (err) {
            debug();
            throw err;
        }

        expect(getByTestId("profile-settings-header").innerHTML).toMatch('Profile Settings');

        // Wait for positionTitle to change to 'Software Engineer'
        try {
            await wait(() => getByTestId('profile-settings-positionTitle-input'));
            await wait(() => expect(getByTestId('profile-settings-positionTitle-input')).toHaveValue(mockProfileData['position']));
        } catch (err) {
            debug();
            throw err;
        }

        // Match existing input's with Submitted input data
        const positionInput = getByTestId('profile-settings-positionTitle-input');
        const stateInput = getByTestId('profile-settings-state-input');
        const cityInput = getByTestId('profile-settings-city-input');
        const salaryInput = getByTestId('profile-settings-salary-input');
        const companyInput = getByTestId('profile-settings-company-input');
        const experienceInput = getByTestId('profile-settings-yearsofexp-input');

        expect(positionInput).toHaveValue(mockProfileData['position']);
        expect(stateInput).toHaveValue(mockProfileData['state']);
        expect(cityInput).toHaveValue(mockProfileData['city']);
        expect(salaryInput).toHaveValue(mockProfileData['salary']);
        expect(companyInput).toHaveValue(mockProfileData['company']);
        expect(experienceInput).toHaveValue(mockProfileData['yearsOfExp']);
    });
});
