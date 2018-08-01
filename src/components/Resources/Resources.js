import React, { Component } from 'react';
import Navigation from '../Navbar/Navbar';
import Banner from '../Banner/Banner';
import Resource from './Resource/Resource';
import { Container, Row } from 'reactstrap';
import './Resources.css';

class Resources extends Component {
  render() {
    return (
      <div>
        <Navigation></Navigation>
        <Banner lead="ACM Resources" leadSub="Find our weekly problems and solutions here, as well as tutorials."></Banner>
        <Container>
          <Row>
          <Resource title="Weekly Problems and Solutions" 
                  description="Follow along with our weekly coding puzzles here, as well as
                   the solutions that will be released after every meeting."></Resource>
          <Resource title="Intro to Competitive Programming" 
                  description="New to competitive programming? Get up to speed quickly with our tutorials
                              on the basics such as I/O, commandline, etc."></Resource>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Resources;