import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Navigation from '../Navbar/Navbar';
import Banner from '../Banner/Banner';
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';
import './About.css';

let about_timeline_header = {
    background: '#02284B',
    color: '#ffffff'
};

class About extends Component {
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
                <Timeline lineColor={'#6DB6E2'}>
                    <TimelineItem
                        dateText="1965-1967"
                        dateInnerStyle={about_timeline_header}>
                        <h3>ACM@UCI is Founded</h3>
                        <p>
                            Decades before companies like Amazon or Google are
                            founded, years before the first ICPC, and even a
                            year before ICS becomes a department at UCI, ACM@UCI
                            is started as a local chapter of the Association for
                            Computing Machinery (ACM).
                        </p>
                    </TimelineItem>
                    <TimelineItem
                        dateText="1990-1991"
                        dateInnerStyle={about_timeline_header}>
                        <p>
                            <h3>
                                ACM@UCI Competes in World Finals for the First
                                Time
                            </h3>
                            After placing 2nd at the 1990 ICPC Southern
                            California Regional (being beat only by a team from
                            New Zealand), ACM@UCI advances to the ICPC World
                            Finals, then known as the ACM Scholastic Computing
                            Contest, held in San Antonio, Texas. The team of
                            four ultimately places 14th.
                        </p>
                    </TimelineItem>
                    <TimelineItem
                        dateText="2013-2014"
                        dateInnerStyle={about_timeline_header}>
                        <p>
                            <h3>ACM@UCI Competes in World Finals</h3>
                            After placing 2nd at the 2013 ICPC Southern
                            California Regional, ACM@UCI advances to the 2014
                            ICPC World Finals.
                        </p>
                    </TimelineItem>
                    <TimelineItem
                        dateText="October 2016"
                        dateInnerStyle={about_timeline_header}>
                        <p>
                            <h3>
                                <i>UCI 76ers</i> Rank 1st Nationally at
                                IEEExtreme 10.0
                            </h3>
                            ACM@UCI's team <i>UCI 76ers</i> places 1st in the US
                            at IEEExtreme 10.0, a 24-hour worldwide programming
                            contest.
                        </p>
                    </TimelineItem>
                    <TimelineItem
                        dateText="2016-2017"
                        dateInnerStyle={about_timeline_header}>
                        <p>
                            <h3>
                                <i>filter</i> Competes in World Finals
                            </h3>
                            After finishing 1st at the 2016 ICPC Southern
                            California Regional (including solving a problem in
                            the last 24 seconds of the competition), ACM@UCI's
                            team <i>filter</i> advances to the 2017 ICPC World
                            Finals.
                        </p>
                    </TimelineItem>
                    <TimelineItem
                        dateText="November 2017"
                        dateInnerStyle={about_timeline_header}>
                        <p>
                            <h3>
                                <i>filter</i> Places 3rd in SoCal
                            </h3>
                            At the 2017 ICPC Southern California Regional,
                            ACM@UCI's team <i>filter</i> pulls off another
                            successful finish at 3rd place. Overall, ACM@UCI
                            does extremely well, getting all 5 of its teams into
                            the top 25.
                        </p>
                    </TimelineItem>
                    <TimelineItem
                        dateText="Spring 2018"
                        dateInnerStyle={about_timeline_header}>
                        <p>
                            <h3>First Seminar Series</h3>
                            ACM@UCI hosts its first seminar series, with
                            students giving talks on computer science topics as
                            diverse as gambling, medical imaging, and functional
                            programming.
                        </p>
                    </TimelineItem>
                    <TimelineItem
                        dateText="October 2018"
                        dateInnerStyle={about_timeline_header}>
                        <p>
                            <h3>IEEExtreme 12.0</h3>
                            At IEEExtreme 12.0, ACM@UCI gets two teams,{' '}
                            <i>sheep</i> and <i>sleep24hrs</i>, into the top 100
                            in the world. The two teams also rank 6th and 7th in
                            the US, respectively.
                        </p>
                    </TimelineItem>
                    <TimelineItem
                        dateText="November 2018"
                        dateInnerStyle={about_timeline_header}>
                        <p>
                            <h3>2018 SoCal Regional</h3>
                            Despite losing most of its senior members, ACM@UCI
                            teams pull off successful finishes at the 2018 SoCal
                            Regional, getting two teams, <i>filter</i> and{' '}
                            <i>iterator</i>, to rank 7th and 9th, and getting
                            all 5 teams into the top 25 yet again.
                        </p>
                    </TimelineItem>
                    <TimelineItem
                        dateText="Winter 2019"
                        dateInnerStyle={about_timeline_header}>
                        <p>
                            <h3>Seminar Series v2</h3>
                            ACM@UCI hosts another seminar series, once again
                            with diverse talks.
                        </p>
                    </TimelineItem>
                </Timeline>
            </div>
        );
    }
}

export default About;
