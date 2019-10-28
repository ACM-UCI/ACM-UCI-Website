import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import Navigation from '../Navbar/Navbar';
import Banner from '../Banner/Banner';
import Resource from './Resource/Resource';
import './Resources.css';

class Resources extends Component {
    render() {
        return (
            <div>
                <Navigation />
                <Banner
                    lead="ACM Resources"
                    leadSub="Find our tutorials here!"
                />
                <Container>
                    <Row>
                        <Link className="full" to="/introToCp">
                            <Resource
                                title="New Member Guide"
                                description="New to competitive programming? Get up to speed quickly with our tutorials
                              on the basics such as I/O, commandline, etc."
                            />
                        </Link>
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

export default Resources;
