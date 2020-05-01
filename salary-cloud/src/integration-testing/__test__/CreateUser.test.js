import React from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import ReactDOM from 'react-dom';
import { render, cleanup, fireEvent, wait } from '@testing-library/react';
//import { act } from "react-dom/test-utils";
import '@testing-library/jest-dom/extend-expect';

import DropDownForm from '../../components/welcome/DropDownForm';
import TestingRouter from '../TestingRouter'

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
    
    it("DropDownForm inputs can be submitted", async () => {
        const redirectUrl = '/ProfileSettings';
        const { debug, getByText, getByTestId } = render(
            <TestingRouter 
                RedirectUrl={redirectUrl}
                user={mockData}
            />
        );
    
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
            await wait(() => getByText("Profile Settings"));
        } catch (err) {
            debug();
            throw err;
        }
    });

    // it("Deletion of Created User is Successful", async () => {
        
    // });
});