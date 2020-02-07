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
import acm_wics from '../../../img/ACMxWICS.jpg';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import '../Blog.css';

export default class ACMxWICS extends Component {
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
                                    ACMxWICS
                                </BreadcrumbItem>
                            </Breadcrumb>
                            <CardTitle style={{ textAlign: 'center' }}>
                                <h2>ACM@UCI and WICS Mock Interviews</h2>
                                <i>by Jens Tuyls (February 6)</i>
                            </CardTitle>
                            <hr className="event-line" />
                            <CardText>
                            On Monday, January 13th, ACM@UCI and Women in Computer
                            Science (WICS) held a mock interview event to prepare
                            the ICS students for upcoming interviews. A lot
                            of students who had little to no technical interview
                            experience came out to improve their skills at this
                            event. Interviewers were asked to score the teams
                            based on accuracy of the solution, team work, and
                            communication. We hope this event was useful for
                            students to improve their technical knowledge of
                            algorithms so they can be more confident when
                            interviewing for an internship of full-time position.
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
                                    src={acm_wics}
                                    alt=""
                                />
                                <i>One of our interviewers (Chinmay Raut)
                                    explaining a problem to the interviewees.</i>
                            </Col>
                            <br />
                            <br />
                            Thank you to all our interviewer volunteers, as well
                            as to everyone who came out and made this a successful
                            event! We would also like to thank the Donald Ben School
                            of ICS, as well as WICS for helping us with the logistics
                            of this event!  
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
