import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Navigation from '../Navbar/Navbar';
import Banner from '../Banner/Banner';
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';
import './About.css';
import TimelineData from './timeline.json';
import Images from './img-index';

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
                            <p style={{ fontSize: '20px', marginTop: '40px' }}>
                                Members of ACM@UCI enjoy computer science and
                                puzzles. We study algorithms and compete in
                                prestigious programming contests like ICPC and
                                IEEExtreme. Our overall mission is to maximize
                                understanding of computer science topics and
                                develop problem solving skills that one would
                                not generally learn in a classroom setting.
                                Thus, we organize several activities. Twice a
                                week, we host meetings where members solve a
                                problem set. Furthermore, we facilitate
                                campuswide competitions for students to further
                                hone their skills. Every fall, we field teams in
                                ICPC and IEEExtreme. Our teams have historically
                                placed well in these competitions, advancing to
                                the ICPC World Finals and regularly placing in
                                the top 100 in the world at IEEExtreme. Finally,
                                we organize an annual quarter-long seminar
                                series where club members present on topics of
                                interest.
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
