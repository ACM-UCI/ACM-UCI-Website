import React, { Component } from 'react';
import { Col, Card, CardBody, CardTitle } from 'reactstrap';
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
            <CardTitle style={{ color: 'white' }}>{props.name} </CardTitle>
        );
    }

    render() {
        return (
            <Card className="poll probcard minh">
                <CardBody>
                    <Col>
                        {this.obj}
                        {this.popup}
                    </Col>
                </CardBody>
            </Card>
        );
    }
}
