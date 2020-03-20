import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

class ProfileSettingsDropDown extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          title: this.props.title,
        }
        this.titleChangeHandler = this.titleChangeHandler.bind(this);
    }

    titleChangeHandler(event,newTitle) {
        console.log(newTitle);
        this.setState({title: newTitle,});
    }

    render() {
        const styleT = {
            color: "black",
            background: "#fff",
        };
        return (
            <div className="ProfileSettingsDropDown">
                <Dropdown className="mt-3">
                    <Dropdown.Toggle style={styleT} id="dropdown-basic">{this.state.title}</Dropdown.Toggle>

                    <Dropdown.Menu  className="text-left">
                        { this.props.options.map(option => (
                            <Dropdown.Item onClick={(e) => this.titleChangeHandler(e,option)}>{ option }</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        );
    }
}

export default ProfileSettingsDropDown;