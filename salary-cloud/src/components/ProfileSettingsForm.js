import React from 'react';

import ProfileSettingsDropDown from './ProfileSettingsDropDown';

function ProfileSettingsForm() {
    return (
        <div className="ProfileSettingsForm">
            <ProfileSettingsDropDown title="Position Title" options={["Software Engineer", "Software Developer"]}/>
        </div>
    );
}

export default ProfileSettingsForm;