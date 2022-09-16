import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navigation from '../Navbar/Navbar';
import Banner from '../Banner/Banner';
// import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';
import './About.css';
import TimelineData from './timeline.json';
import nadc from '../../img/2021_icpc_nadc.webp';
import meeting from '../../img/acm_meeting.jpg';
// import Images from './img-index';

// const aboutTimelineHeader = {
//   background: '#02284B',
//   color: '#ffffff',
// };

export default class About extends Component {
    constructor(props) {
        super(props);
        this.events = [];
        // const img = null;
        for (let i = TimelineData.length - 1; i >= 0; i -= 1) {
            if (TimelineData[i].img !== undefined) {
                // img = (
                //   <figure>
                //     <img
                //       src={Images[TimelineData[i].img].default}
                //       alt={TimelineData[i].caption}
                //       width="100%"
                //     />
                //     <figcaption>
                //       <center>
                //         <i>{TimelineData[i].caption}</i>
                //       </center>
                //     </figcaption>
                //   </figure>
                // );
            }
            this.events.push(
                <div>
                    {/*
                    <TimelineItem
                        key={i}
                        dateText={TimelineData[i].date}
                        dateInnerStyle={aboutTimelineHeader}>
                        <h3>{TimelineData[i].title}</h3>
                        <p>{TimelineData[i].desc}</p>
                        {img}
                    </TimelineItem>
                    */}
                </div>
            );
        }
    }

    render() {
        return (
            <div className="About">
                <Navigation />
                <Banner lead="About" leadSub="A club older than ICS itself." />
                <Container fluid>
                    <Row className="align-items-center justify-content-center gy-3">
                        <h2>Mission Statement</h2>
                        <p>
                            To maximize understanding of computer science topics
                            and nuture problem solving skills for both
                            competitive programming and technical interviews
                        </p>
                    </Row>
                    <Row
                        className="align-items-center justify-content-center gy-3"
                        style={{ backgroundColor: '#eee' }}
                    >
                        <h2>Meetings</h2>
                        <Col lg="4" className="text-center">
                            <img src={meeting} alt="Meeting" />
                        </Col>
                        <Col lg="4">
                            <p>
                                Twice a week, we host meetings where members
                                solve problems of a certain topic, such as
                                dynamic programming or greedy algorithms.
                                Occasionally, we also host programming contests
                                as well!
                            </p>
                        </Col>
                    </Row>
                    <Row className="align-items-center justify-content-center gy-3">
                        <h2>Competitions</h2>
                        <Col lg="4" className="text-center">
                            <img src={nadc} alt="competition" />
                        </Col>
                        <Col lg="4">
                            <p>
                                Every fall, we field teams in the International
                                Collegiate Programming Competition (ICPC). Our
                                team has historically placed well in these
                                competitions, moving past the Southern
                                California Regional and even advancing to the
                                ICPC World Finals!
                            </p>
                        </Col>
                    </Row>
                </Container>
                {/* <Timeline lineColor={'#6DB6E2'}>{this.events}</Timeline> */}
            </div>
        );
    }
}
