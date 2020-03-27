import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ProfileHeader from './ProfileHeader';
import Contact from './Contact';
import ProfileCompletion from './ProfileCompletion';
import ProfileVisibility from './ProfileVisibility';
import About from './About';
import RelevantExperience from './RelevantExperience';

function MyProfileBody() {
    const shadowStyle = {
        boxShadow: "1px 1px 3px 1px #ccc",
    };
    return (
        <Container className="ProfileBody"  align="center">
            <Row className="mt-3 justify-content-center" style={shadowStyle}>
                <ProfileHeader />
            </Row>

            <Row className="justify-content-center">
                <Col className="mr-2 justify-content-center">
                    <Row className="mt-3" style={shadowStyle}>
                        <Contact />
                    </Row>
                    <Row className="mt-3" style={shadowStyle}>
                        <ProfileVisibility />
                    </Row>
                </Col>
                <Col className="ml-2 justify-content-center">
                    <Row className="mt-3" style={shadowStyle}>
                        <ProfileCompletion />
                    </Row>
                    <Row className="mt-3" style={shadowStyle}>
                        <About />
                    </Row>
                    <Row className="mt-3" style={shadowStyle}>
                        <RelevantExperience />
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default MyProfileBody;