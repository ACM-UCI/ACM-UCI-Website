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
                                IEEExtreme. The overall mission of our club is
                                to maximize understanding of computer science
                                topics and develop problem solving skills that
                                one would not generally learn in a classroom
                                setting. To this end, we organize several
                                activities. Twice a week, we host meetings where
                                members solve a problem set. Also, we facilitate
                                campuswide competitions for students to further
                                hone their skills. Every fall, we field teams in
                                ICPC and IEEExtreme. Last year, all 5 teams we
                                sent to the SoCal ICPC Regional were in the top
                                25 out of 98, and 2 teams at IEEExtreme were in
                                the top 100 in the world. We also organize an
                                annual 8 week seminar series where club members
                                present on a research topic of interest.
                                Currently, our club consists of ~500 members,
                                with an average attendance of 30 at our
                                meetings.
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
