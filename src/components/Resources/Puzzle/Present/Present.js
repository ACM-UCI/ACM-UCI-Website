import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Problem from '../Quarter/Week/Session/Problem/Problem';
import Announcement from '../Quarter/Week/Session/Announcement/Announcement';
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
        var problems = [[]];
        var events = [[]];
        this.announcements = [];

        for (var key in myData) {
            if (myData.hasOwnProperty(key)) {
                var data = myData[key];

                var t = 'Solution';
                if (problems[problems.length - 1].length === 3) {
                    problems.push([]);
                }

                if (events[events.length - 1].length === 3) {
                    events.push([]);
                }

                if (!this.end && data.Session === this.session.toString()) {
                    t = 'Help';
                    // make sure no solution is shown since session is ongoing
                    data.Solution = '';
                }

                // if this entry is from the current session
                if (data.Session === this.session.toString()) {
                    if (data.Difficulty === 'announcement') {
                        this.announcements.push(
                            <Announcement
                                key={data.Name}
                                name={data.Name}
                                desc={data.Link}
                                con={data.Contributor}
                            />
                        );
                    } else if (data.Difficulty === 'event') {
                        events[events.length - 1].push(
                            <Col md="4" className="height">
                                <Problem
                                    className="center"
                                    name={data.Name}
                                    link={data.Link}
                                    diff={data.Difficulty}
                                    slink={data.Solution}
                                    con={data.Contributor}
                                    code={data.Code}
                                    txt="Info"
                                    week={this.week}
                                    quarter={this.quarter}
                                    session={this.session}
                                    evnt="yes"
                                />
                            </Col>
                        );
                    } else {
                        problems[problems.length - 1].push(
                            <Col md="4" className="height">
                                <Problem
                                    name={data.Name}
                                    link={data.Link}
                                    diff={data.Difficulty}
                                    slink={data.Solution}
                                    con={data.Contributor}
                                    code={data.Code}
                                    week={this.week}
                                    quarter={this.quarter}
                                    session={this.session}
                                    txt={t}
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
                <Row key={(j + 100).toString()} className="space center">
                    {problems[j][0]}
                    {problems[j][1]}
                    {problems[j][2]}
                </Row>
            );
        }

        for (let j = 0; j < events.length; j++) {
            this.events.push(
                <Row key={(j + 200).toString()} className="space center">
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
