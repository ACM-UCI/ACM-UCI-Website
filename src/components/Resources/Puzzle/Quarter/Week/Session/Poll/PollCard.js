import React, { Component } from 'react';
import { Col, Card } from 'react-bootstrap';
import './PollCard.css';
import Popup from './Popup';

export default class PollCard extends Component {
    constructor(props) {
        super(props);
        this.popup = null;
        this.conNames = '';

        this.popup = (
            <Popup
                question={props.link}
                identifier={props.identifier}
                txt={'Take Poll'}
                mark={props.mark}
            />
        );

        this.obj = (
            <Card.Title style={{ color: 'white' }}>{props.name} </Card.Title>
        );
    }

    render() {
        return (
            <Card className="poll probcard minh">
                <Card.Body>
                    <Col>
                        {this.obj}
                        {this.popup}
                    </Col>
                </Card.Body>
            </Card>
        );
    }
}
