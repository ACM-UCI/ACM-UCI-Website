import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Row, Col } from 'react-bootstrap';
import Problem from './Problem/Problem';
import Announcement from './Announcement/Announcement';
import PollCard from './Poll/PollCard';
import Presentation from './Presentation/Presentation';
import './Session.css';

export default class Session extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.processData = this.processData.bind(this);
        this.state = { collapse: false };
        this.week = props.week;
        this.quarter = props.quarter;
        this.session = props.session;
        this.rows = [[]];
    }

    componentDidMount() {
        const { data } = this.props;
        this.processData(data);
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
        this.announcements = [];

        Object.keys(sessionProblems).forEach((key) => {
            if (key in allProblems) {
                const data = allProblems[key];
                if (data !== null) {
                    if (problems[problems.length - 1].length === 3) {
                        problems.push([]);
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
                                contributors={contributors}
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
                                    mark="past"
                                />
                            </Col>
                        );
                    } else {
                        problems[problems.length - 1].push(
                            <Col md="4" className="height space">
                                <Problem
                                    className="center"
                                    name={data.Name}
                                    link={data.Link}
                                    note={data.Note}
                                    diff={data.Difficulty}
                                    slink={data.Solution}
                                    code={data.Code}
                                    con={data.Contributor}
                                    conName={conName}
                                    txt="Solution"
                                    week={this.week}
                                    quarter={this.quarter}
                                    session={this.session}
                                    contributors={contributors}
                                    identifier={key}
                                />
                            </Col>
                        );
                    }
                }
            }
        });

        if (problems[0].length > 0) {
            if (problems[problems.length - 1].length === 0) {
                problems.pop();
            }
            if (problems.length > 0) {
                while (problems[problems.length - 1].length < 3) {
                    problems[problems.length - 1].push(null);
                }
            }

            for (let j = 0; j < problems.length; j++) {
                this.rows.push(
                    <Row key={j.toString()} className="center">
                        {problems[j][0]}
                        {problems[j][1]}
                        {problems[j][2]}
                    </Row>
                );
            }
        } else {
            this.rows.push(
                <Alert
                    key={this.quarter + this.week + this.session}
                    className="nothing"
                    variant="info"
                >
                    Nothing to see here :)
                </Alert>
            );
        }

        this.toggle();
    }

    toggle() {
        this.setState((prevState) => ({ collapse: !prevState.collapse }));
    }

    render() {
        return (
            <Row className="topmar">
                <pre>S E S S I O N{`  ${this.session}`}</pre>
                <div className="back">{this.rows}</div>
            </Row>
        );
    }
}

Session.propTypes = {
    week: PropTypes.number.isRequired,
    quarter: PropTypes.string.isRequired,
    session: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
};
