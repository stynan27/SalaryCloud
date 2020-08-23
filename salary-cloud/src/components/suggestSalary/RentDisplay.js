import React from 'react';

import Row from 'react-bootstrap/Row';

function RentDisplay(props) {
  if (props.stateName && props.countyName) {
    return (
      <div className="pt-5"> The median rent in {props.countyName}, {props.stateName} is ###.## </div>
    );
  } else {
    return <div className="pt-5"> Select your State and County to view your median Rent prices </div>;
  }
}

export default RentDisplay;
