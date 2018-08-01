import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Navigation from '../Navbar/Navbar';
import Banner from '../Banner/Banner';
import './Events.css';

class Events extends Component {
  render() {
    return (
      <div>
        <Navigation></Navigation>
        <Banner lead="Events" leadSub="Compete in intercollegiate competitions."></Banner>
        <Container className="event-body" fluid>
          <Row>
            <div className="pseudo"></div>
            <Col md={{ size: 7, offset: 1 }}>
              <h2 className="mt-3">Upcoming Competitions</h2>
              <p>There are currently no upcoming competitions</p>
            </Col>
            <Col md="4">
              <h2 className="mt-3">Weekly Schedule</h2>
              <p>Weekly schedule for Fall 2018 has not been determined yet.</p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Events;