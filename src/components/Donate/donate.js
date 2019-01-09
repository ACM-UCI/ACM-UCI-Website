import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Navigation from '../Navbar/Navbar';
import Banner from '../Banner/Banner';
import './donate.css';

class Donate extends Component {

  render() {
    return (
      <div>
        <Navigation></Navigation>
        <Banner lead="Donate" leadSub="We greatly appreciate your support."></Banner>
        <Container>
          <Row>
            <Col md={{ size: 8, offset: 2 }} className="text-center">
              <p style={{fontSize: "20px", marginTop: "20px"}}>Click below to start donating.</p><hr />
              <a className="dbox-donation-button" target="_blank" rel="noopener noreferrer" href="https://donorbox.org/uc-irvine-acm-student-chapter" 
                 style={{background: "#02284B url(https://d1iczxrky3cnb2.cloudfront.net/white_logo.png) no-repeat 37px center",
                         color: "#fff",
                         textDecoration: "none",
                         fontFamily: "Verdana,sans-serif",
                         display: "inline-block",
                         fontSize: "16px",
                         padding: "15px 38px 15px 75px",
                         marginTop: "20px",
                         bordeRadius: "2px",
                         boxShadow: "0 1px 0 0 #011c34",
                         textShadow: "0 1px rgba(0, 0, 0, 0.3)"}}>Donate</a>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Donate;

