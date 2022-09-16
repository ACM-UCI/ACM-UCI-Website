import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navigation from '../Navbar/Navbar';
import Banner from '../Banner/Banner';
import MailChimpForm from './MailChimpForm/MailChimpForm';
import './Contact.css';

export default function Contact() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src =
            '//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js';
        document.body.appendChild(script);
    }, []);
    return (
        <div>
            <Navigation />
            <Banner lead="Contact" leadSub="Need to reach us?" />
            <iframe
                title="UCI map"
                jsname="L5Fo6c"
                className="g-map"
                frameBorder="0"
                width="100%"
                style={{ minHeight: 400 }}
                src="https://maps-api-ssl.google.com/maps?hl=en-US&amp;ll=33.643601,-117.842077&amp;output=embed&amp;q=33.643161,-117.841989+%28Untitled+Location%29&amp;z=18"
                allowFullScreen=""
            />
            <Container>
                <Row className="justify-content-lg-center">
                    <Col lg="8">
                        <p className="contact-lead mt-4">
                            We encourage you to subscribe to our mailing list
                            below.
                        </p>
                        <p className="contact-describtion">
                            Need to get in contact with someone specific? You
                            could try through our{' '}
                            <a
                                href="https://www.facebook.com/groups/228954137162541/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-link"
                            >
                                Facebook Group
                            </a>
                            . If you can&apos;t seem to get a hold of us, try
                            attending one of our events or visiting the
                            scheduled meeting places as shown in the{' '}
                            <Link to="/events" className="contact-link">
                                events
                            </Link>{' '}
                            tab. You can always reach us at{' '}
                            <a
                                href="mailto:acm@uci.edu"
                                className="contact-link"
                            >
                                acm@uci.edu
                            </a>
                        </p>
                    </Col>
                </Row>
                <Row className="mb-4 justify-content-lg-center">
                    <Col lg="8">
                        <MailChimpForm />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
