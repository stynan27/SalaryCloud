import React from 'react';
import Form from 'react-bootstrap/Form';


class ProfileSettingsDropDown extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          title: this.props.title,
          options: this.props.options,
        }
    }

    render() {
        const state = this.state;
        return (
            <div className="ProfileSettingsDropDown">
                <div className="text-left">
                    <Form.Label>{state.title}</Form.Label>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Control as="select">
                        <option>...</option>
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
}

export default ProfileSettingsDropDown;
