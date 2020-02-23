import React, { Component } from 'react';
import {
    Container,
    Row,
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
                    <h2>Upcoming Events</h2>
                </CardTitle>
                <Row style={{ justifyContent: 'center' }}>
                    <Calendar
                        month="Mar"
                        date="5"
                        event="Internal Competition"
                        link="https://www.facebook.com/events/568104980579743/"
                    />
                </Row>
            </Card>,
            <Card body className="card-body-home" style={{ width: w }}>
                <CardTitle style={{ textAlign: 'center' }}>
                    <h2>Meeting Times</h2>
                    <i>Winter 2020</i>
                </CardTitle>
                <hr className="home-line" />
                <CardText claassname="card-text-home">
                    <strong>Tuesday: </strong>
                    DBH 4011, 6:00 - 8:00 pm <br />
                    <strong>Thursday: </strong>
                    DBH 4011, 6:00 - 8:00 pm
                </CardText>
            </Card>,
            <Card
                body
                className="card-body-home"
                style={{ marginRight: m, width: w }}
                key={'card3'}>
                <CardTitle style={{ textAlign: 'center' }}>
                    <h2>Wall of Fame</h2>
                    <i>Most Submissions</i>
                </CardTitle>
                <hr className="home-line" />
                <Row style={{ display: 'flex', justifyContent: 'center' }}>
                    <Avatar
                        alt="btjanaka"
                        id="silver"
                        className="silver award"
                        src="https://raw.githubusercontent.com/btjanaka/branding/master/build/logo/bt-rotating-white-bkgd-512.gif"
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
                />
                <Container className="home-body" fluid>
                    <Row>
                        <p className="text-center m-5 home-body-text">
                            There are no requirements to join us. In fact, we
                            encourage you to do so even if you have no
                            experience. Consider attending one of our meetings,
                            which we hold twice a week. We also host workshops
                            by UCI students and presentations from distinguished
                            speakers. <br />
                            We love coffee and pizza.
                        </p>
                        <Button color="secondary mx-auto button">
                            <a
                                href="https://www.facebook.com/groups/228954137162541/"
                                target="_blank"
                                rel="noopener noreferrer">
                                JOIN US ON FACEBOOK
                            </a>
                        </Button>
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
