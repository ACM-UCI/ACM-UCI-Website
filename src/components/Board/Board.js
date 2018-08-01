import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Navigation from '../Navbar/Navbar';
import Banner from '../Banner/Banner';
import BoardMember from './BoardMember/BoardMember';
import './Board.css';

class Board extends Component {
  render() {
    return (
      <div>
        <Navigation></Navigation>
        <Banner lead="The Board" leadSub="Agents of ACM"></Banner>
        <Container>
          <Row>
            <Col md="4"><BoardMember src="/img/karthik.jpg" name="Karthik Gajulapalli" position="President"></BoardMember></Col>
            <Col md="4"><BoardMember src="/img/blake-pooya.jpg" name="Pooya Khosravi" position="Treasurer"></BoardMember></Col>
            <Col md="4"><BoardMember src="/img/chinmay.jpg" name="Chinmay Raut" position="Vice President"></BoardMember></Col>
          </Row>
          <Row>
            <Col md="4"><BoardMember src="/img/blake-pooya.jpg" name="Blake Wakasa" position="Ambassador"></BoardMember></Col>
            <Col md="4"><BoardMember src="/img/jens.jpg" name="Jens Tuyls" position="Webmaster"></BoardMember></Col>
            <Col md="4"><BoardMember src="/img/jacky.jpg" name="Jacky Dai" position="General SIG Lead"></BoardMember></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Board;