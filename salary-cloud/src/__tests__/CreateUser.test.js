import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import ReactDOM from 'react-dom';
import { render, cleanup, getByTestId, fireEvent, waitFor } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import '@testing-library/jest-dom/extend-expect';

import ProfileSettings from '../components/profileSettings/ProfileSettingsBody';
import DropDownForm from '../components/welcome/DropDownForm';
import usersApi from '../api/users-api';

let USERID = "";
let ANONID = "";

const mockData = {
    email: "testEmail23@gmail.com",
    hash: "password123"
};

describe('Creation Tests', () => {
    afterEach(cleanup);

    it("DropDownForm renders properly", () => {
        const div = document.createElement("div");
        ReactDOM.render(
        <Dropdown.Menu className="text-center">
            <DropDownForm />
        </Dropdown.Menu>, div)
        ReactDOM.unmountComponentAtNode(div);
    });
    
    it("DropDownForm inputs can be submitted", () => {
        const { getByTestId } = render(<DropDownForm />);
    
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


    });

    // may need more time to execute this test...
    it("API Login of Newly Created User is Successful", async () => {
        await usersApi.login(mockData).then( response => {
            expect(response.status).toBe(200);
            expect(response.data.userId).toBeDefined();
            expect(response.data.anonId).toBeDefined();
            USERID = response.data.userId;
            ANONID = response.data.anonId;
        });
    });

    it("API Deletion of Created User is Successful", async () => {
        console.log(USERID);
        await usersApi.deleteUser(USERID, ANONID).then( response => {
            expect(response.status).toBe(200);
        });
    });
});