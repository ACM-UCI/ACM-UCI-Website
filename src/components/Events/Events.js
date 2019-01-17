import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardTitle,
    CardText,
    Button
} from 'reactstrap';
import Navigation from '../Navbar/Navbar';
import Banner from '../Banner/Banner';
import './Events.css';

class Events extends Component {
    render() {
        return (
            <div>
                <Navigation />
                <Banner
                    lead="Events"
                    leadSub="Compete in intercollegiate competitions."
                />
                <Container className="event-body" fluid>
                    <Row>
                        <div className="pseudo" />
                        <Col md={{ size: 7, offset: 1 }}>
                            <h2 className="mt-3">Upcoming Competitions</h2>

                            {/* IEEEXTREME */}
                            <Card body className="card-body">
                                <CardTitle>
                                    IEEEXtreme 12.0 - October 20th
                                </CardTitle>
                                <CardText>
                                    IEEEXtreme is a 24 hour coding competition
                                    where teams from all over the world compete!
                                    More info can be found here:{' '}
                                    <a
                                        className="event-link"
                                        href="https://ieeextreme.org/"
                                        target="blank">
                                        ieeextreme.org
                                    </a>
                                </CardText>
                                <Button>
                                    <a
                                        className="event-signup-link"
                                        href="https://goo.gl/forms/QOyCcWjyE9CyR4r23"
                                        target="blank">
                                        Signup
                                    </a>
                                </Button>
                            </Card>

                            {/* ICPC */}
                            <Card body className="card-body">
                                <CardTitle>
                                    ACM ICPC SoCal Regional - November 10th
                                </CardTitle>
                                <CardText>
                                    ICPC is the world's largest programming
                                    competition! More info can be found here:{' '}
                                    <a
                                        className="event-link"
                                        href="http://socalcontest.org/current/index.shtml"
                                        target="blank">
                                        socalcontest.org
                                    </a>
                                </CardText>
                                <Button>
                                    <a
                                        className="event-signup-link"
                                        href="https://docs.google.com/forms/d/1-eOqA1A9ZaLc5J0qHSS1M1WIopGulbAP8ANO57hQ0nk/edit"
                                        target="blank">
                                        Signup
                                    </a>
                                </Button>
                            </Card>
                        </Col>
                        <Col md="4">
                            <h2 className="mt-3">Weekly Schedule</h2>
                            <Card body className="card-body">
                                <CardTitle>ACM Practice - Fall 2018</CardTitle>
                                <CardText>
                                    <strong>Tuesday: </strong>
                                    SSL 140, 7 - 9 pm <br />
                                    <strong>Thursday: </strong>
                                    RH 184, 7 - 9 pm
                                </CardText>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Events;
