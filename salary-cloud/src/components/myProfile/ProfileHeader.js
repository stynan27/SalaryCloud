import React from 'react';

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
        return (
            <div className="ProfileHeader">
                <h1 className="mt-1">Profile Header</h1>
            </div>
        );
    }
}

export default ProfileHeader;