import React, { Component } from 'react';
import { Col, Card, CardBody, CardTitle} from 'reactstrap';
import './Problem.css';
import Solution from '../Solution/Solution';

export default class Problem extends Component {
  render() {
    return (
      <Card className={this.props.diff}>
        <CardBody>
            <Col className="center">
                <a className= {"word "+this.props.diff} href={this.props.link} target="_blank">
                    <CardTitle>{this.props.name}</CardTitle>
                </a>
                <Solution sol = {this.props.sol}></Solution>
            </Col>
        </CardBody>
      </Card>
    );
  }
}