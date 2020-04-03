import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class ProfileHeader extends React.Component {
    constructor() {
        super()
        this.state = {
          name: "Name",
          title: "Title",
          location: "Location",
        }
      }

    render(){
      const {name, title, location} = this.state;
        return (
            <Row>
              <Col md={4} className="mt-auto mb-auto">
                <h2 className=""> My Profile Image </h2>
              </Col>
              <Col md={8} className="mt-auto mb-auto">
                <h2 className="h2"> {name} </h2>
                <h2 className="h2"> {title} </h2>
                <h2 className="h2"> {location} </h2>
              </Col>
            </Row>
        );
    }
}

export default ProfileHeader;
