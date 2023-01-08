import React, { Component } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Konami from 'react-konami-code';
import Banner from '../Banner/Banner';
import Navigation from '../Navbar/Navbar';
import Calendar from './Calendar';
import './Home.css';

import excellenceAward from '../../img/Website_2020.png';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
        };

        this.toggle = this.toggle.bind(this);
        this.reload = this.reload.bind(this);
        this.opentool = this.opentool.bind(this);
        window.onresize = this.reload;
    }

    toggle() {
        this.setState((prevState) => ({
            modal: !prevState.modal,
        }));
    }

    opentool(type) {
        const { [type]: currStateType } = this.state;
        const newstate = { type: !currStateType };
        this.setState(newstate);
    }

    reload() {
        this.setState({});
    }

    render() {
        this.cards = [
            <Col lg="3">
                <Card className="card-body-home mx-auto p-5" key="card1">
                    <Card.Title style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: 29 }}>Upcoming Major Events</p>
                    </Card.Title>
                    <Row className="justify-content-center">
                        <Calendar
                            month="Jan"
                            date="10"
                            event="First Meeting of Quarter in DBH 4011"
                            link=""
                        />
                    </Row>
                </Card>
            </Col>,
            <Col lg="3">
                <Card className="card-body-home mx-auto p-5" key="card2">
                    <Card.Title style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: 29 }}>Meeting Times</p>
                        <i>Winter 2023</i>
                        <br />
                        <br />
                        <strong>
                            To keep up to date, follow our{' '}
                            <a href="https://www.facebook.com/groups/228954137162541/">
                                Facebook
                            </a>{' '}
                            and join our{' '}
                            <a href="https://discord.gg/MCtKPxC">Discord</a>.
                        </strong>
                        <br />
                    </Card.Title>
                    <hr className="home-line" />
                    <Card.Text className="card-text-home">
                        <strong>Tuesday: </strong>
                        DBH 4011, 6:00 - 8:00 pm <br />
                        <strong>Thursday: </strong>
                        DBH 4011, 6:00 - 8:00 pm
                    </Card.Text>
                </Card>
            </Col>,
        ];

        this.cardrow = (
            <Row className="pb-5 justify-content-lg-center">{this.cards}</Row>
        );

        return (
            <div>
                <Navigation />
                <Banner
                    lead="ACM @ UCI"
                    leadSub="Learn about algorithms and improve your interview skills."
                    imgSrc={excellenceAward}
                />
                <Container className="home-body" fluid>
                    <Row className="justify-content-lg-center">
                        <Col lg="8">
                            <p className="text-center m-5 home-body-text">
                                There are no requirements to join us. In fact,
                                we encourage you to do so even if you have no
                                experience. Consider attending one of our
                                meetings, which we hold twice a week.
                                <br />
                                <br />
                                We love coffee and pizza!
                            </p>
                        </Col>
                    </Row>
                    {this.cardrow}
                </Container>
                <Konami action={this.toggle} />
            </div>
        );
    }
}
