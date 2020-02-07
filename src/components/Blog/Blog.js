import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardTitle,
    CardSubtitle,
    CardText,
    CardImg,
    CardBody,
    Button,
    NavLink
} from 'reactstrap';
import { HashLink as Link } from 'react-router-hash-link';
import Navigation from '../Navbar/Navbar';
import Banner from '../Banner/Banner';
import ieee_acm from '../../img/ieee_acm.jpg';
import acm_wics from '../../img/ACMxWICS.jpg';
import './Blog.css';

class Blog extends Component {
    constructor(props) {
        super(props);
    }

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
                    <div style={{ margin: '5%' }}>
                        <Row>
                            <Col md="4">
                                <NavLink tag={Link} to="/blog/ieeextreme13">
                                    <Card className="blogcard">
                                        <CardImg
                                            className="card-img"
                                            src={ieee_acm}
                                        />
                                        <CardBody>
                                            <CardTitle>
                                                ACM@UCI at IEEEXtreme
                                            </CardTitle>
                                            <CardSubtitle>
                                                by Bryon Tjanaka (Oct 26)
                                            </CardSubtitle>
                                        </CardBody>
                                    </Card>
                                </NavLink>
                            </Col>
                            <Col md="4">
                                <NavLink tag={Link} to="/blog/acmxwics">
                                    <Card className="blogcard">
                                        <CardImg
                                            className="card-img"
                                            src={acm_wics}
                                        />
                                        <CardBody>
                                            <CardTitle>
                                                ACMxWICS Mock Interviews
                                            </CardTitle>
                                            <CardSubtitle>
                                                by Jens Tuyls (Feb 6)
                                            </CardSubtitle>
                                        </CardBody>
                                    </Card>
                                </NavLink>
                            </Col>
                        </Row>
                    </div>
                    <br />
                    <br />
                    <br />
                </Container>
            </div>
        );
    }
}

export default Blog;
