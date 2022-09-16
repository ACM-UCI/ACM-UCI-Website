import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import './BoardMember.css';

export default function BoardMember({ src, name, position }) {
    return (
        <Card className="mt-3">
            <Card.Img className="card-img" src={src} />
            <Card.Body>
                <Card.Title style={{ fontSize: 20, fontWeight: 'bold' }}>
                    {name}
                </Card.Title>
                <Card.Subtitle style={{ fontSize: 15, fontWeight: 'bold' }}>
                    {position}
                </Card.Subtitle>
            </Card.Body>
        </Card>
    );
}

BoardMember.propTypes = {
    src: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
};
