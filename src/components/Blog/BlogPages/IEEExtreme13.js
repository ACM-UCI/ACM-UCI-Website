import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardTitle,
    CardText,
    CardImg,
    CardBody,
    Button
} from 'reactstrap';
import { HashLink as Link } from 'react-router-hash-link';
import Navigation from '../../Navbar/Navbar';
import Banner from '../../Banner/Banner';
import ieee_acm from '../../../img/ieee_acm.jpg';
import ieee_oop from '../../../img/ieee_oop.jpg';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import '../Blog.css';

export default class IEEExtreme13 extends Component {
    render() {
        return (
            <div>
                <Navigation />
                <Banner lead="Blogs" leadSub="History in the Making" />
                <Container
                    className="event-body"
                    fluid
                    style={{ margin: 0, padding: 0 }}>
                    <div className="pseudo" />
                    <br />
                    <Col
                        id="maincol"
                        style={{
                            maxWidth: '80%',
                            padding: '0',
                            paddingTop: '20px',
                            marginLeft: '10%',
                            marginRight: '0',
                            paddingRight: '0'
                        }}>
                        <Card body className="card-body-blog">
                            <Breadcrumb listClassName="blogcrumb">
                                <BreadcrumbItem>
                                    <a
                                        href="/blog"
                                        style={{ color: '#6DB6E2' }}>
                                        Home
                                    </a>
                                </BreadcrumbItem>
                                <BreadcrumbItem active>
                                    IEEEXtreme 13.0
                                </BreadcrumbItem>
                            </Breadcrumb>
                            <CardTitle style={{ textAlign: 'center' }}>
                                <h2>ACM@UCI at IEEExtreme</h2>
                                <i>by Bryon Tjanaka (October 26)</i>
                            </CardTitle>
                            <hr className="event-line" />
                            <CardText>
                                From October 18th 5PM to October 19th 5PM, 15
                                UCI students were hard at work in DBH 4011,
                                competing to solve advanced programming problems
                                as part of the IEEExtreme 13.0 Programming
                                Competition. Held just once every year, this
                                24-hour online contest challenges teams of three
                                from around the world to solve a set of 24-30
                                problems involving anything from graph
                                algorithms to computational geometry. At the end
                                of the contest, prizes are awarded to the top
                                100 teams.
                                <br /> <br />
                                Overall, UCI’s teams did incredibly well in the
                                contest. Internationally, team OutOfPractice
                                (Bryon Tjanaka, Meta Novitia, Frank Shi) placed
                                39th out of 4103, while Pan (Paul Baldaray,
                                Andrew Laird, Brian Bui) placed 85th and
                                zotReduce (Pooya Khosravi, Haoyu Wang, Milan
                                Lad) placed 99th. These teams also placed 4th,
                                6th, and 7th in the US, as well as 1st, 3rd, and
                                4th in the Western US, respectively. Full
                                results from the competition may be viewed{' '}
                                <a
                                    href="https://ieeextreme.org/ieeextreme-13-0-global-ranking/"
                                    style={{ color: '#6DB6E2' }}>
                                    here
                                </a>
                                .
                                <br />
                                <br />
                                <br />
                                <Col
                                    style={{
                                        textAlign: 'center'
                                    }}>
                                    <img
                                        style={{
                                            maxWidth: '70%',
                                            marginLeft: '15%',
                                            marginRight: '15%',
                                            textAlign: 'center'
                                        }}
                                        src={ieee_acm}
                                        alt=""
                                    />
                                    <i>UCI students after the contest</i>
                                </Col>
                                <br />
                                <br />
                                <Col
                                    style={{
                                        textAlign: 'center'
                                    }}>
                                    <img
                                        style={{
                                            maxWidth: '70%',
                                            marginLeft: '15%',
                                            marginRight: '15%',
                                            textAlign: 'center'
                                        }}
                                        src={ieee_oop}
                                        alt=""
                                    />
                                    <i>
                                        Team OutOfPractice (left to right: Meta
                                        Novitia, Frank Shi, Bryon Tjanaka)
                                    </i>
                                </Col>
                                <br />
                                <br />
                                <br />
                                ACM@UCI would like to thank the Donald Bren
                                School of ICS and IEEE at UCI for helping
                                organize the competition. We are looking forward
                                to competing again next year!
                            </CardText>
                        </Card>
                    </Col>
                    <br />
                    <br />
                    <br />
                </Container>
            </div>
        );
    }
}
