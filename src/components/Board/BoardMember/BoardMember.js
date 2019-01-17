import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import './BoardMember.css';

class BoardMember extends Component {
    render() {
        return (
            <Card className="mt-3">
                <CardImg className="card-img" src={this.props.src} />
                <CardBody>
                    <CardTitle>{this.props.name}</CardTitle>
                    <CardSubtitle>{this.props.position}</CardSubtitle>
                </CardBody>
            </Card>
        );
    }
}

export default BoardMember;
