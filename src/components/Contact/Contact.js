import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import Navigation from '../Navbar/Navbar';
import Banner from '../Banner/Banner';
import MailChimpForm from './MailChimpForm/MailChimpForm';
import './Contact.css';

class Contact extends Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.src = "//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js";
    document.body.appendChild(script);
  }

  render() {
    return (
      <div>
        <Navigation></Navigation>
        <Banner lead="Contact" leadSub="Need to reach us?"></Banner>
        <iframe title="UCI map" jsname="L5Fo6c" class="g-map" frameborder="0" width="100%" style={{minHeight: 400}}
        src="https://maps-api-ssl.google.com/maps?hl=en-US&amp;ll=33.643601,-117.842077&amp;output=embed&amp;q=33.643161,-117.841989+%28Untitled+Location%29&amp;z=18" 
        allowfullscreen=""></iframe>
        <Container>
          <Row>
            <Col md={{ size: 8, offset: 2 }} className="text-center">
              <p class="contact-lead mt-4">We encourage you to subscribe to our mailing list below.</p>
              <p class="contact-describtion">Need to get in contact with someone specific? You could try through
                our <a href="https://www.facebook.com/groups/228954137162541/" 
                      target="_blank" rel="noopener noreferrer" className="contact-link">Facebook Group</a>.
                
                If you can't seem to get a hold of us, try attending one of our events or visiting
                the scheduled meeting places as shown in the <Link to="/events" className="contact-link">events</Link> tab. 
                You can always reach us at <a href="mailto:acm@uci.edu" className="contact-link">acm@uci.edu</a>
              </p>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md={{ size: 8, offset: 2 }}>
              <MailChimpForm></MailChimpForm>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Contact;