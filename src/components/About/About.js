import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Navigation from '../Navbar/Navbar';
import Banner from '../Banner/Banner';
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';
import './About.css';
import TimelineData from './timeline.json';
import Images from './img/index';

let about_timeline_header = {
    background: '#02284B',
    color: '#ffffff'
};

class About extends Component {
    constructor(props) {
        super(props);
        this.events = [];
        for (let i = TimelineData.length - 1; i >= 0; --i) {
            let img = null;
            if (TimelineData[i].img !== undefined) {
                img = (
                    <figure>
                        <img
                            src={Images[TimelineData[i].img]}
                            alt={TimelineData[i].caption}
                            width="100%"
                        />
                        <figcaption>
                            <center>
                                <i>{TimelineData[i].caption}</i>
                            </center>
                        </figcaption>
                    </figure>
                );
            }
            this.events.push(
                <TimelineItem
                    key={i}
                    dateText={TimelineData[i].date}
                    dateInnerStyle={about_timeline_header}>
                    <h3>{TimelineData[i].title}</h3>
                    <p>{TimelineData[i].desc}</p>
                    {img}
                </TimelineItem>
            );
        }
    }

    render() {
        return (
            <div>
                <Navigation />
                <Banner lead="About" leadSub="A club older than ICS itself." />
                <Container>
                    <Row>
                        <Col
                            md={{ size: 8, offset: 2 }}
                            className="text-center">
                            <p style={{ fontSize: '20px', marginTop: '20px' }}>
                                Since its inception, ACM@UCI has provided
                                numerous opportunities for students to enhance
                                their computer science education. Today, through
                                regular meetings and competitions such as the
                                ICPC (International Collegiate Programming
                                Contest) and IEEExtreme, ACM@UCI enhances
                                students' problem solving skills. Meanwhile,
                                through events like the Seminar Series, it
                                disseminates knowledge on a wide variety of
                                computer science topics.
                            </p>
                            <br />
                            <hr />
                        </Col>
                    </Row>
                </Container>
                <Timeline lineColor={'#6DB6E2'}>{this.events}</Timeline>
            </div>
        );
    }
}

export default About;
