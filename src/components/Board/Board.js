import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Navigation from '../Navbar/Navbar';
import Banner from '../Banner/Banner';
import BoardMember from './BoardMember/BoardMember';
import karthik from '../../img/karthik.jpg';
import blakePooya from '../../img/blake-pooya.jpg';
import chinmay from '../../img/chinmay.jpg';
import jens from '../../img/jens.jpg';
import bryon from '../../img/bryon.jpg';
import jacky from '../../img/jacky.jpg';
import meta from '../../img/meta.jpg';
import frank from '../../img/frank.jpg';
import './Board.css';

class Board extends Component {
    render() {
        return (
            <div>
                <Navigation />
                <Banner lead="The Board" leadSub="Agents of ACM" />
                <Container>
                    <Row>
                        <Col md="4">
                            <BoardMember
                                src={karthik}
                                name="Karthik Gajulapalli"
                                position="President"
                            />
                        </Col>
                        <Col md="4">
                            <BoardMember
                                src={blakePooya}
                                name="Pooya Khosravi"
                                position="Treasurer"
                            />
                        </Col>
                        <Col md="4">
                            <BoardMember
                                src={chinmay}
                                name="Chinmay Raut"
                                position="Vice President"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="4">
                            <BoardMember
                                src={blakePooya}
                                name="Blake Wakasa"
                                position="Ambassador"
                            />
                        </Col>
                        <Col md="4">
                            <BoardMember
                                src={bryon}
                                name="Bryon Tjanaka"
                                position="Assistant ICPC Coach and Director of Innovation"
                            />
                        </Col>
                        <Col md="4">
                            <BoardMember
                                src={jacky}
                                name="Jacky Dai"
                                position="General SIG Lead"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="4">
                            <BoardMember
                                src={jens}
                                name="Jens Tuyls"
                                position="Webmaster"
                            />
                        </Col>
                        <Col md="4">
                            <BoardMember
                                src={meta}
                                name="Meta Novitia"
                                position="Secretary"
                            />
                        </Col>
                        <Col md="4">
                            <BoardMember
                                src={frank}
                                name="Frank Shi"
                                position="Graduate Ambassador"
                            />
                        </Col>
                    </Row>
                </Container>
                <Row>
                    <br />
                    <br />
                </Row>
            </div>
        );
    }
}

export default Board;
