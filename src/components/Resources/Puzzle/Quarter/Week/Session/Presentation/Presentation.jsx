import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Button } from 'react-bootstrap';
import './Presentation.css';

function Presentation({ name, presentationLink, presentationNotes }) {
    return (
        <Card className="presentation probcard minh">
            <Card.Body>
                <Col style={{ marginTop: '20px' }}>
                    <Card.Title style={{ fontSize: 20 }}>
                        <a
                            href={presentationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {name}
                        </a>
                    </Card.Title>
                    <a
                        href={presentationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button className="btn-sol btn-secondary">Open</Button>
                    </a>
                    {typeof presentationNotes !== 'undefined' &&
                        presentationNotes !== '' && (
                            <a
                                href={presentationNotes}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button className="btn-sol btn-secondary">
                                    Notes
                                </Button>
                            </a>
                        )}
                </Col>
            </Card.Body>
        </Card>
    );
}

Presentation.propTypes = {
    name: PropTypes.string.isRequired, // Presentation Title
    presentationLink: PropTypes.string.isRequired, // Link to Presentation
    presentationNotes: PropTypes.string.isRequired, // Link to Presentation Notes
};

export default Presentation;
