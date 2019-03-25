import React, { Component } from 'react';
import { Alert, Row, Col } from 'reactstrap';
import Problem from './Problem/Problem';
import Announcement from './Announcement/Announcement';
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
        this.processData(this.props.data);
    }

    processData(myData) {
        const problems = [[]];
        this.announcements = [];

        for (var key in myData) {
            if (myData.hasOwnProperty(key)) {
                const data = myData[key];
                if (data !== null) {
                    if (problems[problems.length - 1].length === 3) {
                        problems.push([]);
                    }

                    var conName = '';
                    if (
                        this.props.contributors.hasOwnProperty(data.Contributor)
                    ) {
                        conName = this.props.contributors[data.Contributor]
                            .Name;
                    }

                    if (data.Session === this.session) {
                        if (data.Difficulty === 'announcement') {
                            this.announcements.push(
                                <Announcement
                                    key={data.Name}
                                    name={data.Name}
                                    desc={data.Link}
                                    con={data.Contributor}
                                    conName={conName}
                                />
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
                                    />
                                </Col>
                            );
                        }
                    }
                }
            }
        }

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
                    className="nothing">
                    Nothing to see here :)
                </Alert>
            );
        }

        this.toggle();
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    render() {
        return (
            <Row className="topmar">
                <pre>S E S S I O N {this.session}</pre>
                <div className="back">
                    {this.announcements}
                    {this.rows}
                </div>
            </Row>
        );
    }
}
