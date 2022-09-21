import React, { Component } from 'react';
import { Alert, Row } from 'react-bootstrap';
import { getDatabase, ref, onValue } from 'firebase/database';
import Navigation from '../../Navbar/Navbar';
import Banner from '../../Banner/Banner';
import Past from './Past/Past';
import Present from './Present/Present';
import './Puzzle.css';
import firebase from '../../../Firebase';
import { initializeSchedule } from '../../../utils/Scheduling';

const db = getDatabase();

export default class Puzzle extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.processData = this.processData.bind(this);
        this.getDate = this.getDate.bind(this);
        this.err = this.err.bind(this);

        this.state = { collapse: false };

        this.week = 1;
        this.session = 1;
        this.end = false;

        this.done = false;
        this.error = null;
        this.past = null;
        this.present = null;

        initializeSchedule()
            .then(this.getDate)
            .catch((e) => this.err(e.message));
    }

    /**
     * Callback function called after the schedule is initialized
     * @param {*} state
     */
    getDate(state) {
        this.quarter = state.quarter;
        this.week = state.week;
        this.session = state.session;
        this.end = state.currentSessionOver;

        this.done = true;

        this.ref = ref(db);
        onValue(this.ref, this.processData);

        this.toggle();
    }

    err(message) {
        this.done = true;
        this.error = <Alert color="info">{message}</Alert>;
        this.toggle();
    }

    processData(data) {
        this.data = data.val();
        this.past = (
            <Past week={this.week} session={this.session} data={this.data} />
        );

        this.present = (
            <Present
                end={this.end}
                week={this.week}
                quarter={this.quarter}
                session={this.session}
                data={this.data}
            />
        );
        this.toggle();
    }

    toggle() {
        this.setState((prevState) => ({ collapse: !prevState.collapse }));
    }

    render() {
        if (this.done) {
            return (
                <div className="center">
                    <Navigation />
                    <Banner
                        lead="Weekly Problems and Solutions"
                        leadSub="New Problems will be posted an hour before each meeting"
                    />
                    {this.error}
                    <div className="center">
                        <Row className="center">
                            <Alert className="easy m">Easy</Alert>
                            <Alert className="med m">Medium</Alert>
                            <Alert className="hard m">Hard</Alert>
                            <Alert className="icpc m">ICPC</Alert>
                            <Alert className="competition m">Competition</Alert>
                            <Alert className="codealong m">Code Along</Alert>
                            <Alert className="event m">Event</Alert>
                        </Row>
                        <Row className="center">
                            <h1 className="display-4">
                                Join In-Person @ DBH 4011
                            </h1>
                        </Row>
                        <Row className="center">
                            <span>Mondays and Wednesdays 6-8pm</span>
                        </Row>
                    </div>

                    <div className="small center">{this.present}</div>

                    <br />

                    <div className="small center">{this.past}</div>

                    <div>
                        <br />
                        <br />
                    </div>
                </div>
            );
        }
        return (
            <div className="center">
                <Navigation />
                <Banner
                    lead="Weekly Problems and Solutions"
                    leadSub="Ready to have your minds blown?"
                />

                <Alert className="med m">Fetching Data :3</Alert>

                <div>
                    <br />
                    <br />
                </div>
            </div>
        );
    }
}
