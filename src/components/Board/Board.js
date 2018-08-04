import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Navigation from '../Navbar/Navbar';
import Banner from '../Banner/Banner';
import BoardMember from './BoardMember/BoardMember';
import karthik from '../../img/karthik.jpg';
import blakePooya from '../../img/blake-pooya.jpg';
import chinmay from '../../img/chinmay.jpg';
import jens from '../../img/jens.jpg';
import bryon from '../../img/bryon.jpg'
import jacky from '../../img/jacky.jpg';
import './Board.css';

class Board extends Component {
  render() {
    return (
      <div>
        <Navigation></Navigation>
        <Banner lead="The Board" leadSub="Agents of ACM"></Banner>
        <Container>
          <Row>
            <Col md="4"><BoardMember src={karthik} name="Karthik Gajulapalli" position="President"></BoardMember></Col>
            <Col md="4"><BoardMember src={blakePooya} name="Pooya Khosravi" position="Treasurer"></BoardMember></Col>
            <Col md="4"><BoardMember src={chinmay} name="Chinmay Raut" position="Vice President"></BoardMember></Col>
          </Row>
          <Row>
            <Col md="4"><BoardMember src={blakePooya} name="Blake Wakasa" position="Ambassador"></BoardMember></Col>
            <Col md="4"><BoardMember src={bryon} name="Bryon Tjanaka" position="Assistant ICPC Coach and Director of Innovation"></BoardMember></Col>
            <Col md="4"><BoardMember src={jacky} name="Jacky Dai" position="General SIG Lead"></BoardMember></Col>
          </Row>
          <Row>
            <Col md="4"><BoardMember src={jens} name="Jens Tuyls" position="Webmaster"></BoardMember></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Board;