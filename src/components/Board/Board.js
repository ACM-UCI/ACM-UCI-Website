import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Navigation from '../Navbar/Navbar';
import Banner from '../Banner/Banner';
import board from './board.json';
import BoardMember from './BoardMember/BoardMember';
import Images from './index.js';
import './Board.css';

class Board extends Component {
    constructor(props) {
        super(props);
        this.rows = [];
        this.cols = [];
        for (var t in board) {
            this.rows.push(
                <Row
                    className="jumbotron-header"
                    style={{
                        color: 'black',
                        textAlign: 'center',
                        fontSize: '30px',
                        marginTop: '5%'
                    }}
                    key={this.rows.length.toString()}>
                    <Col md="4" />
                    <Col md="4">{t}</Col>
                    <Col md="4" />
                </Row>
            );
            for (var k in board[t]) {
                var key = board[t][k];
                this.cols.push(
                    <Col md="4" key={'current ' + k}>
                        <BoardMember
                            src={Images[k]}
                            name={key.name}
                            position={key.position}
                        />
                    </Col>
                );
                if (this.cols.length === 3) {
                    this.rows.push(
                        <Row key={'current ' + this.rows.length.toString()}>
                            {this.cols}
                        </Row>
                    );
                    this.cols = [];
                }
            }
            if (this.cols.length !== 0) {
                this.rows.push(
                    <Row key={'current ' + this.rows.length.toString()}>
                        {this.cols}
                    </Row>
                );
                this.cols = [];
            }
        }
    }

    render() {
        return (
            <div>
                <Navigation />
                <Banner lead="The Board" leadSub="Agents of ACM" />
                <Container>{this.rows}</Container>
                <Row>
                    <br />
                    <br />
                </Row>
            </div>
        );
    }
}

export default Board;
