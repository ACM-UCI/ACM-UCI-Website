import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navigation from '../Navbar/Navbar';
import Banner from '../Banner/Banner';
import board from './boardMembers.json';
import BoardMember from './BoardMember/BoardMember';
import Images from './index';
import './Board.css';

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.rows = [];
        this.cols = [];
        Object.entries(board).forEach(([academicYear, members]) => {
            this.rows.push(
                <Row key={this.rows.length.toString()} className="mt-3">
                    <Col md="12" className="text-center">
                        <h2>{academicYear}</h2>
                    </Col>
                </Row>
            );
            Object.entries(members).forEach(([uid, info]) => {
                this.cols.push(
                    <Col md="4" key={`current ${uid}`}>
                        <BoardMember
                            src={uid in Images ? Images[uid] : Images.acm}
                            name={info.name}
                            position={info.position}
                        />
                    </Col>
                );
                if (this.cols.length === 3) {
                    this.rows.push(
                        <Row
                            key={`current ${this.rows.length.toString()}`}
                            className="gx-5"
                        >
                            {this.cols}
                        </Row>
                    );
                    this.cols = [];
                }
            });
            if (this.cols.length !== 0) {
                this.rows.push(
                    <Row
                        key={`current ${this.rows.length.toString()}`}
                        className="gx-5"
                    >
                        {this.cols}
                    </Row>
                );
                this.cols = [];
            }
        });
    }

    render() {
        return (
            <div className="Board">
                <Navigation />
                <Banner lead="The Board" leadSub="Agents of ACM" />
                <Container className="mb-5">{this.rows}</Container>
            </div>
        );
    }
}
