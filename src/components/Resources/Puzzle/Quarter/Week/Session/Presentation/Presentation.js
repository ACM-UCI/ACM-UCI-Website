import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardTitle, Col, Button } from 'reactstrap';
import './Presentation.css';

function Presentation(props) {
    const { name, presentationLink, presentationNotes } = props;
    return (
        <Card className="presentation probcard minh">
            <CardBody>
                <Col>
                    <CardTitle style={{ fontSize: 20 }}>
                        <a
                            href={presentationLink}
                            target="_blank"
                            rel="noopener noreferrer">
                            {name}
                        </a>
                    </CardTitle>
                    <a
                        href={presentationLink}
                        target="_blank"
                        rel="noopener noreferrer">
                        <Button className="btn-sol">Open</Button>
                    </a>
                    {typeof presentationNotes !== 'undefined' &&
                        presentationNotes !== '' && (
                            <a
                                href={presentationNotes}
                                target="_blank"
                                rel="noopener noreferrer">
                                <Button className="btn-sol">Notes</Button>
                            </a>
                        )}
                </Col>
            </CardBody>
        </Card>
    );
}

Presentation.propTypes = {
    name: PropTypes.string, // Presentation Title
    presentationLink: PropTypes.string, // Link to Presentation
    presentationNotes: PropTypes.string // Link to Presentation Notes
};

export default Presentation;
