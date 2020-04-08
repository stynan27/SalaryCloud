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

import './myProfile.css';

function MyProfileBody() {

    return (
        <Container className="ProfileBody mt-2 mb-3"  align="center" fluid={true}>
            <Row className="mt-3 justify-content-center contentContainer boxShadow">
                <ProfileHeader />
            </Row>

            <Row className="mt-3 pt-3 pb-3 justify-content-center contentContainer boxShadow">
                <Col md={4} className="ml-auto mr-auto">
                    <Contact />
                    <ProfileVisibility />
                </Col>

                <Col md={7} className="ml-auto mr-auto">
                    <ProfileCompletion />
                    <About />
                    <RelevantExperience />
                </Col>
            </Row>
        </Container>
    );
}

export default MyProfileBody;
