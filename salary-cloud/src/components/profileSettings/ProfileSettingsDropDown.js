import React from 'react';
import Form from 'react-bootstrap/Form';


function ProfileSettingsDropDown(props) {
    const state = { 
        title: props.title, 
        options: props.options, 
        currentSelection: props.current,
        handleChange: props.handleInputChange
    };

    let inputId = "positionTitle";

    if (state.title === "State") {
        inputId = "state";
    } else if(state.title === "City") {
        inputId = "city";
    }

    return (
        <div className="ProfileSettingsDropDown">
            <div className="text-left">
                <Form.Label>{state.title}</Form.Label>
                <Form.Group controlId={inputId}>
                    <Form.Control onChange={state.handleChange} as="select">
                        <option>{state.currentSelection}</option> 
                        {
                            state.options.map((option, index) => (
                                <option key={index}>{ option }</option>
                            ))
                        }
                    </Form.Control>
                </Form.Group>
            </div>
        </div>
    );
}

export default ProfileSettingsDropDown;
