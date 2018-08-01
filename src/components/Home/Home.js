import React, { Component } from 'react';
import { Container, Row, Button } from 'reactstrap';
import Navigation from '../Navbar/Navbar';
import Banner from '../Banner/Banner';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div>
        <Navigation></Navigation>
        <Banner lead="ACM @ UCI" leadSub="Learn about algorithms and improve your interview skills."></Banner>
        <Container className="home-body" fluid>
          <Row>
            <div className="pseudo"></div>
            <p className="text-center m-5">There are no requirements to join us, in fact we encourage you to
              join even if you have no experience. Consider attending one of our
                meetings that we hold once or twice a week. Our chapter hosts a
                variety of events including workshops by UCI students to share
                  knowledge and presentations by distinguished speakers about new ideas. <br /><br />

                  We also love coffee and pizza. 
            </p>
            <Button color="secondary mx-auto button"><a href="https://www.facebook.com/groups/228954137162541/" target="_blank" rel="noopener noreferrer">JOIN US ON FACEBOOK</a></Button>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;