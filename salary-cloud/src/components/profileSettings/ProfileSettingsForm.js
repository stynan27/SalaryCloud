import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import usersApi from '../../api/users-api';

import ProfileSettingsDropDown from './ProfileSettingsDropDown';

class ProfileSettingsForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          loading: false,
          user: props.user,
          anonData: [],
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
    }

    componentDidMount = async () => {
        this.setState({ loading: true });

        await usersApi.getAnonUser(this.state.user.anonId).then( response => {
            if (response.status !== 200) {
                console.log(response.message);
            } else {
                this.setState({ loading: false, anonData: response.data.data });
                console.log("Successful retrieval!");
            }
        }).catch(err => console.log(err));
    }

    handleInputChange = (event) => {
        event.preventDefault();
        const key = event.target.id;
        let anonData = {...this.state.anonData};
        if (key === "city" || key === "state") {
            anonData["location"][key] = event.target.value;
            console.log(anonData["location"][key]);
        } else {
            anonData[key] = event.target.value
            console.log(anonData[key]);
        }
        this.setState({anonData});
    }

    handleSubmitClick = async (event) => {
        event.preventDefault();
        console.log('Submit');
        const { anonId } = this.state.user;
        const anonData = this.state.anonData;
        this.setState({ loading: true });  
        await usersApi.updateAnonUser(anonId, anonData).then(response => {
            if (response.status === 200) {
                this.props.handleLogOut( () => {
                    this.setState({ loading: false});
                });
                console.log("User Updated Successfully!");
            } else {
                console.log("Invalid HTTP response code!");
                console.log(response.status);
            }
        }).catch(error => {
            console.log(error);
            window.alert("User was not Updated successfully!");
        });

    }

    handleDeleteUser = async (event) => {
        event.preventDefault();
        const { user } = this.state;
        // TODO: Fix Issue with loading...
        this.setState({ loading: true });
        await usersApi.deleteUser(user.userId, user.anonId).then((response) => {
            if (response.status === 200) {
                this.props.handleLogOut();
                this.setState({ loading: false});
                console.log("User Deleted Successfully!");
            } else {
                console.log("Invalid HTTP response code!");
                console.log(response.status);
            }
        }).catch(error => {
            console.log(error);
            window.alert("User Was not deleted successfully");
        });
    }

    render() {
        const { anonData } = this.state;

        console.log(anonData);

        const position = (anonData['positionTitle']) ? anonData['positionTitle'] : "...";
        const state = (anonData['location']) ? anonData['location']['state'].toString() : "...";
        const city = (anonData['location']) ? anonData['location']['city'].toString() : "...";
        const salary = (anonData['salary']) ? anonData['salary'].toString() : "1000";
        const employer = (anonData['employer']) ? anonData['employer'] : "Enter company name here...";
        const yearsOfExp = (anonData['yearsOfExp']) ? anonData['yearsOfExp'].toString() : "0";

        return (
            <div className="ProfileSettingsForm">
                <Form className="mb-5" onSubmit={this.handleSubmitClick}>
                    <ProfileSettingsDropDown current={position} handleInputChange={this.handleInputChange} title="Position Title" options={["Software Engineer", "Software Developer"]}/>
                    <ProfileSettingsDropDown current={state} handleInputChange={this.handleInputChange} title="State" options={["New York", "Georgia", "California"]}/>
                    <ProfileSettingsDropDown current={city} handleInputChange={this.handleInputChange} title="City" options={["New York City", "Buffalo", "Los Angeles", "Atlanta"]}/>

                    <div className="text-left">
                        <Form.Label>Current Salary</Form.Label>
                        <Form.Group controlId="salary">
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>$</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    type="number"
                                    placeholder={salary}
                                    onChange={this.handleInputChange}
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
                        <Form.Group controlId="employer">
                            <InputGroup className="mb-3">
                                <FormControl
                                    type="search"
                                    placeholder={employer} 
                                    onChange={this.handleInputChange}
                                    aria-label="currentCompany"
                                    aria-describedby="current-company-input"
                                />
                            </InputGroup>
                        </Form.Group>
                    </div>

                    <div className="text-left">
                        <Form.Label>Years of Experience</Form.Label>
                        <Form.Group controlId="yearsOfExp">
                            <InputGroup className="mb-3">
                                <FormControl
                                    type="number"
                                    placeholder={yearsOfExp}
                                    onChange={this.handleInputChange}
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

                    <div className="mt-1 mb-1">
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    </div>

                    <div className="mt-1 mb-1">
                    <Button variant="danger" type="input" onClick={this.handleDeleteUser}>
                        Delete Account
                    </Button>
                    </div>
                </Form>
            </div>
        );
    } 
}

export default ProfileSettingsForm;
