import React from 'react';

import WelcomeBody from './WelcomeBody';
import CreateAccountBody from './CreateAccountBody';

function Body(props) {
    if (props.currentPath === "Welcome") {
        return <WelcomeBody />
    } else {
        return <CreateAccountBody />
    }
}

export default Body;