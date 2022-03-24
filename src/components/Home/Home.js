import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Button,
    Modal,
    Card,
    CardTitle,
    CardText,
    Tooltip
} from 'reactstrap';
import Navigation from '../Navbar/Navbar';
import Banner from '../Banner/Banner';
import Konami from 'react-konami-code';
import kevin from '../../img/kevin.mp4';
import Avatar from '@material-ui/core/Avatar';
import Calendar from './Calendar.js';
import './Home.css';

import excellence_award from '../../img/Website_2020.png';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            gold: false,
            silver: false,
            bronze: false
        };

        this.toggle = this.toggle.bind(this);
        this.reload = this.reload.bind(this);
        this.opentool = this.opentool.bind(this);
        window.onresize = this.reload;
    }

    // easterEgg() {
    //     this.toggle();
    // }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    opentool(type) {
        var newstate = {};
        newstate[type] = !this.state[type];
        this.setState(newstate);
    }

    reload() {
        this.setState({});
    }

    render() {
        var w = '96%';
        var m = '2%';
        if (window.innerWidth >= 777) {
            w = '27.33%';
            m = '5%';
        }

        this.cards = [
            <Card
                body
                className="card-body-home"
                key={'card1'}
                style={{ marginLeft: m, paddingBottom: '2%', width: w }}>
                <CardTitle style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: 29 }}>Upcoming Major Events</p>
                </CardTitle>
                <Row style={{ justifyContent: 'center' }}>
                    <Calendar
                        month="Mar"
                        date="29"
                        event="First Meeting of Quarter in ICS 428"
                        link=""
                    />
                </Row>
            </Card>,
            <Card
                key={'card2'}
                body
                className="card-body-home"
                style={{ width: w }}>
                <CardTitle style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: 29 }}>Meeting Times</p>
                    <i>Spring 2022</i>
                    <br></br>
                    <strong>
                        Until campus reopens all meetings this quarter will be
                        online on Discord. To keep up to date follow our{' '}
                        <a href="https://www.facebook.com/groups/228954137162541/">
                            Facebook
                        </a>{' '}
                        and join our{' '}
                        <a href="https://discord.gg/MCtKPxC">Discord</a>.
                    </strong>
                    <br></br>
                </CardTitle>
                <hr className="home-line" />
                <CardText claassname="card-text-home">
                    <strong>Tuesday: </strong>
                    ICS 428, 6:00 - 8:00 pm <br />
                    <strong>Thursday: </strong>
                    ICS 428, 6:00 - 8:00 pm
                </CardText>
            </Card>,
            <Card
                body
                className="card-body-home"
                style={{ marginRight: m, width: w }}
                key={'card3'}>
                <CardTitle style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: 29 }}>Wall of Fame</p>
                    <i>Most Submissions</i>
                </CardTitle>
                <hr className="home-line" />
                <Row style={{ display: 'flex', justifyContent: 'center' }}>
                    <Avatar
                        alt="btjanaka"
                        id="silver"
                        className="silver award"
                        src="https://avatars.githubusercontent.com/u/38124174?v=4"
                    />
                    <Avatar
                        alt="pbaldara"
                        id="gold"
                        className="gold award"
                        style={{ width: '50px', height: '50px' }}
                        src="https://lh3.googleusercontent.com/-2RiAu-2uZdE/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcW4IwtpG9zNZOnf4QbHAzyo97c6Q/photo.jpg"
                    />
                    <Avatar
                        alt="mnovitia"
                        id="bronze"
                        className="bronze award"
                        src="https://lh3.googleusercontent.com/-UbyqOmNprNc/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcKFFY4hgQeD8uvdilxoHHTyIrGIA/mo/photo.jpg"
                    />
                </Row>
            </Card>
        ];

        this.cardrow = (
            <Row style={{ margin: '0', padding: '0', width: '100%' }}>
                {this.cards}
            </Row>
        );

        return (
            <div>
                <Navigation />
                <Banner
                    lead="ACM @ UCI"
                    leadSub="Learn about algorithms and improve your interview skills."
                    img={excellence_award}
                />
                <Container className="home-body" fluid>
                    <Row>
                        <Col className="col-12">
                            <p className="text-center m-5 home-body-text">
                                There are no requirements to join us. In fact,
                                we encourage you to do so even if you have no
                                experience. Consider attending one of our
                                meetings, which we hold twice a week. We also
                                host workshops by UCI students and presentations
                                from distinguished speakers. <br />
                                We love coffee and pizza.
                            </p>
                        </Col>
                        <Col>
                            <Row className="justify-content-center">
                                <Col className="text-center">
                                    <Button color="secondary ml-auto button mr-2">
                                        <a
                                            href="https://www.facebook.com/groups/228954137162541/"
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            JOIN US ON FACEBOOK
                                        </a>
                                    </Button>
                                    <Button color="secondary mr-auto button">
                                        <a
                                            href="https://discord.gg/MCtKPxC"
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            JOIN US ON DISCORD
                                        </a>
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                        <div style={{ width: '100%' }}>
                            <br />
                            {this.cardrow}
                        </div>
                    </Row>
                    <br />
                    <br />
                    <br />
                </Container>
                <Modal
                    size="lg"
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}>
                    <video
                        width="100%"
                        height="auto"
                        controls
                        style={{ justifySelf: 'center' }}>
                        <source src={kevin} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </Modal>
                <Konami action={this.toggle} />

                {/* TO DO */}
                <Tooltip
                    isOpen={this.state.gold}
                    target={'gold'}
                    toggle={() => this.opentool('gold')}>
                    Paul Baldaray
                </Tooltip>
                <Tooltip
                    isOpen={this.state.silver}
                    target={'silver'}
                    toggle={() => this.opentool('silver')}>
                    Bryon Tjanaka
                </Tooltip>
                <Tooltip
                    isOpen={this.state.bronze}
                    target={'bronze'}
                    toggle={() => this.opentool('bronze')}>
                    Meta Novitia
                </Tooltip>
            </div>
        );
    }
}

export default Home;
