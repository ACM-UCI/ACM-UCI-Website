import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import Problem from '../Quarter/Week/Session/Problem/Problem';
import Announcement from '../Quarter/Week/Session/Announcement/Announcement';
import Presentation from '../Quarter/Week/Session/Presentation/Presentation';
import PollCard from '../Quarter/Week/Session/Poll/PollCard';
import config from '../../../config';
import './Present.css';

export default class Present extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.processData = this.processData.bind(this);
        this.state = { collapse: false };
        this.week = props.week;
        this.quarter = props.quarter;
        this.session = props.session;
        this.end = props.end;
        this.events = [];
        this.rows = [];
    }

    componentDidMount() {
        const { data } = this.props;
        this.processData(data);
    }

    toggle() {
        this.setState((prevState) => ({ collapse: !prevState.collapse }));
    }

    processData(myData) {
        const contributors = myData.logs;
        let sessionProblems = {};
        if (this.quarter in myData && this.week in myData[this.quarter]) {
            if (this.session in myData[this.quarter][this.week]) {
                sessionProblems = myData[this.quarter][this.week][this.session];
            }
        }
        const allProblems = myData.submissions;

        const problems = [[]];
        const events = [[]];
        this.announcements = [];

        // Sort by difficulty
        sessionProblems = Object.keys(sessionProblems).sort(
            (a, b) =>
                config.difficulties[allProblems[a].Difficulty] -
                config.difficulties[allProblems[b].Difficulty]
        );
        Object.keys(sessionProblems).forEach((keyInd) => {
            const key = sessionProblems[keyInd];
            if (key in allProblems) {
                const data = allProblems[key];
                if (data !== null) {
                    let t = 'Solution';
                    if (problems[problems.length - 1].length === 3) {
                        problems.push([]);
                    }

                    if (events[events.length - 1].length === 3) {
                        events.push([]);
                    }

                    if (!this.end) {
                        t = 'Help';
                        // make sure no solution is shown since session is ongoing
                        data.Solution = '';
                    }

                    let conName = '';
                    if (data.Contributor[0] in contributors) {
                        conName = contributors[data.Contributor[0]].Name;
                    }

                    if (data.Difficulty === 'announcement') {
                        this.announcements.push(
                            <Announcement
                                key={data.Name}
                                name={data.Name}
                                desc={data.Link}
                                con={data.Contributor[0]}
                                conName={conName}
                            />
                        );
                    } else if (data.Difficulty === 'presentation') {
                        problems[problems.length - 1].push(
                            <Col md="4" className="height space">
                                <Presentation
                                    className="center"
                                    name={data.Name}
                                    presentationLink={data.Link}
                                    presentationNotes={data.PresNotes}
                                />
                            </Col>
                        );
                    } else if (data.Difficulty === 'poll') {
                        problems[problems.length - 1].push(
                            <Col md="4" className="height space">
                                <PollCard
                                    name={data.Name}
                                    link={data.Link}
                                    identifier={key}
                                />
                            </Col>
                        );
                    } else if (data.Difficulty === 'event') {
                        events[events.length - 1].push(
                            <Col md="4" className="height space">
                                <Problem
                                    className="center"
                                    name={data.Name}
                                    link={data.Link}
                                    diff={data.Difficulty}
                                    slink={data.Solution}
                                    con={data.Contributor}
                                    code={data.Code}
                                    note={data.Note}
                                    txt="Info"
                                    week={this.week}
                                    quarter={this.quarter}
                                    session={this.session}
                                    evnt="yes"
                                    contributors={contributors}
                                    identifier={key}
                                />
                            </Col>
                        );
                    } else {
                        problems[problems.length - 1].push(
                            <Col md="4" className="height space">
                                <Problem
                                    name={data.Name}
                                    link={data.Link}
                                    diff={data.Difficulty}
                                    slink={data.Solution}
                                    con={data.Contributor}
                                    conName={conName}
                                    note={data.Note}
                                    code={data.Code}
                                    week={this.week}
                                    quarter={this.quarter}
                                    session={this.session}
                                    txt={t}
                                    contributors={contributors}
                                    identifier={key}
                                />
                            </Col>
                        );
                    }
                }
            }
        });

        if (problems.length > 0) {
            // if last entry is empty, pop it
            if (problems[problems.length - 1].length === 0) {
                problems.pop();
            }

            if (problems.length > 0) {
                while (problems[problems.length - 1].length < 3) {
                    // make sure these don't cause out of bounds error
                    problems[problems.length - 1].push(null);
                }
            }
        }

        if (events.length > 0) {
            // if last entry is empty, pop it
            if (events[events.length - 1].length === 0) {
                events.pop();
            }

            if (events.length > 0) {
                while (events[events.length - 1].length < 3) {
                    // make sure these don't cause out of bounds error
                    events[events.length - 1].push(null);
                }
            }
        }

        // make the rows of maximum 3 problems
        for (let j = 0; j < problems.length; j++) {
            this.rows.push(
                <Row key={(j + 100).toString()} className="center">
                    {problems[j][0]}
                    {problems[j][1]}
                    {problems[j][2]}
                </Row>
            );
        }

        for (let j = 0; j < events.length; j++) {
            this.events.push(
                <Row key={(j + 200).toString()} className="center">
                    {events[j][0]}
                    {events[j][1]}
                    {events[j][2]}
                </Row>
            );
        }

        this.rows = <div>{this.rows}</div>; // to fix issues on displaying

        if (this.events.length > 0) {
            this.events = (
                <Row className="middle">
                    <Col className="evnt">E V E N T S</Col>
                    <Col>{this.events}</Col>
                    <Col className="evnt">E V E N T S</Col>
                </Row>
            );
        }

        this.toggle(); // re-render
    }

    render() {
        return (
            <Container fluid>
                {this.announcements}
                {this.rows}
                <div>
                    <br />
                    <br />
                </div>
                {this.events}
            </Container>
        );
    }
}

Present.propTypes = {
    week: PropTypes.number.isRequired,
    quarter: PropTypes.string.isRequired,
    session: PropTypes.number.isRequired,
    end: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
};
