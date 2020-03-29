import React from 'react';
import './about.css';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';

function About() {
  return(
    <div className="main container-fluid mt-2 mb-2 pl-5 pr-5">
      <div className="row">
        <div className="col border-right">
          <h1 className="h1"> Our Story... </h1>
          <Image src={"/theBoys.jpg"} alt="theBoys" fluid thumbnail/>
        </div>
        <div className="col-8 pt-2 text-left">
          <h2 className="h2"> Two Fools </h2>
          <p>
            Our Story Begins with two friends, Seamus Tynan and Yesu Carter.
            The Dynamic Duo grew up together in Schenectady NY and have been
            lifelong friends. Seamus graduated Buffalo University in 2019
            with a degree in Computer Science and Tomfoolery. Yesu graduated
            Colgate University the same year with a Bachelors in Computer
            Science and Japanese. Both having experienced the trails of
            job hunting, the pair decided to put their technical expertise and
            dreams to use for the greater good to create SalaryCloud.
          </p>
          <h2 className="h2"> One Dream </h2>
          <p>
            SalaryCloud is a startup aimed at developing tools and resources
            that ease the practice of job hunting, salary negotiations, and
            job transitions. Our goals are as follows.
          </p>
          <ListGroup variant="flush" className="list">
            <ListGroup.Item>
              Instill in the worker confidence in their Salary Negotiations by
              automatically calculating the minimum and recommended Salary. We
              will use our data and resources to suggest Salaries the employee
              should earn based on basic and dynamic factors.
              Basic factors include current salary, years of experience,
              certifications, and salary compared to other workers in the same
              company. Dynamic factors include job location, cost of living,
              transportation, and other constantly changing variables that
              affect everyday life.
            </ListGroup.Item>
            <ListGroup.Item>
              Enhance the worker's job hunting experience by providing
              information on income and employment based on location aggregated
              and displayed in an easy to use yet powerful interface.
            </ListGroup.Item>
          </ListGroup>
          <h2 className="h2 mt-2"> Our Team </h2>
          <p>
            Our team consists of just Yesu and Seamus. SalaryCloud is not a
            legally registered entity, and does therefore claim no liability
            in any damages claimed to either person, name, entity, nor
            reputation.
          </p>
        </div>
      </div>

    </div>
  );

}

export default About;
