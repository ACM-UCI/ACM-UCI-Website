import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Problem from '../Quarter/Week/Session/Problem/Problem';
import Announcement from '../Quarter/Week/Session/Announcement/Announcement';
import Presentation from '../Quarter/Week/Session/Presentation/Presentation';
import PollCard from '../Quarter/Week/Session/Poll/PollCard';
import config from '../../../config.js';
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
        this.events = [];
        this.rows = [];
        this.done = false;
        this.end = props.end;
    }

    componentDidMount() {
        this.processData(this.props.data);
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    processData(myData) {
        var contributors = myData['logs'];
        var sessionProblems = {};
        if (
            myData.hasOwnProperty(this.quarter) &&
            myData[this.quarter].hasOwnProperty(this.week)
        ) {
            if (myData[this.quarter][this.week].hasOwnProperty(this.session)) {
                sessionProblems = myData[this.quarter][this.week][this.session];
            }
        }
        var allProblems = myData['submissions'];

        var problems = [[]];
        var events = [[]];
        this.announcements = [];

        // Sort by difficulty
        sessionProblems = Object.keys(sessionProblems).sort(
            (a, b) =>
                config.difficulties[allProblems[a].Difficulty] -
                config.difficulties[allProblems[b].Difficulty]
        );

        for (var key_ind in sessionProblems) {
            var key = sessionProblems[key_ind];
            if (allProblems.hasOwnProperty(key)) {
                var data = allProblems[key];
                if (data !== null) {
                    var t = 'Solution';
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

                    var conName = '';
                    if (contributors.hasOwnProperty(data.Contributor[0])) {
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
        }

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
        // console.log(this.announcements);
        return (
            <Container>
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
