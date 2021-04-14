import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import './BoardMember.css';

class BoardMember extends Component {
    render() {
        return (
            <Card className="mt-3">
                <CardImg className="card-img" src={this.props.src.default} />
                <CardBody>
                    <CardTitle style={{ fontSize: 20, fontWeight: 'bold' }}>
                        {this.props.name}
                    </CardTitle>
                    <CardSubtitle style={{ fontSize: 15, fontWeight: 'bold' }}>
                        {this.props.position}
                    </CardSubtitle>
                </CardBody>
            </Card>
        );
    }
}

export default BoardMember;
