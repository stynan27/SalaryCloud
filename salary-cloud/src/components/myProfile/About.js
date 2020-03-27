import React from 'react';

class About extends React.Component {
    constructor() {
        super()
        this.state = {
          
        }
      }

    render(){
        return (
            <div className="About">
                <h3 className="mt-1">About Me:</h3>
                <p>Some text about me.</p>
            </div>
        );
    }
}

export default About;