import React from 'react';
import './footer.css';

function Footer() {
  return (
    <footer className="container-fluid border-top">
      <div className="row">
        <div className="col-4">
          <p> Created by Seamus Tynan and Yesu Carter </p>
          <p> SalaryCloud, we're watching you. :) </p>
        </div>
        <div className="col text-right">
          <p> Salary Cloud LLC 2020 </p>
          <p> All rights reserved </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
