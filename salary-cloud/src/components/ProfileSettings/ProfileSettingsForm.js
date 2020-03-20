import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import ProfileSettingsDropDown from './ProfileSettingsDropDown';

function ProfileSettingsForm() {
    return (
        <div className="ProfileSettingsForm">
            <Form className="mb-5">
                <ProfileSettingsDropDown title="Position Title" options={["Software Engineer", "Software Developer"]}/>
                <ProfileSettingsDropDown title="State" options={["New York", "Georgia", "California"]}/>
                <ProfileSettingsDropDown title="City" options={["New York City", "Buffalo", "Los Angeles", "Atlanta"]}/>

                <div className="text-left">
                    <Form.Label>Current Salary</Form.Label>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                input type="number"
                                placeholder="1000"
                                min="1000"
                                max="1000000000000"
                                aria-label="currentSalary"
                                aria-describedby="current-salary-input"
                            />
                            <InputGroup.Append>
                                <InputGroup.Text>/yr</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                </div>

                <div className="text-left">
                    <Form.Label>Company</Form.Label>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <InputGroup className="mb-3">
                            <FormControl
                                input type="search"
                                placeholder="Enter company name here..."
                                aria-label="currentCompany"
                                aria-describedby="current-company-input"
                            />
                        </InputGroup>
                    </Form.Group>
                </div>

                <div className="text-left">
                    <Form.Label>Years of Experience</Form.Label>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <InputGroup className="mb-3">
                            <FormControl
                                input type="number"
                                placeholder="0"
                                min="00"
                                max="100"
                                aria-label="currentExperienceLevel"
                                aria-describedby="current-experience-input"
                            />
                            <InputGroup.Append>
                                <InputGroup.Text>years</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                </div>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default ProfileSettingsForm;