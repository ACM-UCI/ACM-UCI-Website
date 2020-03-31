import React, { Component } from 'react';
import { Alert, Row } from 'reactstrap';
import Navigation from '../../Navbar/Navbar';
import Banner from '../../Banner/Banner';
import Past from './Past/Past';
import Present from './Present/Present';
import './Puzzle.css';
import firebase from '../../../Firebase';
import $ from 'jquery';
import config from '../../config.js';

export default class Puzzle extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.processData = this.processData.bind(this);
        this.getDate = this.getDate.bind(this);
        this.err = this.err.bind(this);

        this.state = { collapse: false };

        this.quarter = 'Spring 2020';
        this.week = 1;
        this.session = 1;
        this.end = false;
        this.quarters = config['quarters'];

        this.done = false;
        this.error = null;
        this.past = null;
        this.present = null;

        // tricky stuff, may change if website changes
        $.ajax({
            url: 'https://24timezones.com/time-zone/utc',
            context: document.body,
            crossdomain: true
        }).done(this.getDate);
    }

    processData(data) {
        this.data = data.val();
        // this.data = data;

        this.past = (
            <Past
                week={this.week}
                quarters={this.quarters}
                session={this.session}
                className="center"
                data={this.data}
            />
        );

        this.present = (
            <Present
                end={this.end}
                week={this.week}
                quarter={this.quarter}
                session={this.session}
                data={this.data}
                // end={false}
                // week={'2'}
                // quarter={'Spring 2019'}
                // session={1}
                // data={this.data[this.quarter]['2']}
            />
        );
        this.toggle();
    }

    err() {
        this.done = true;
        this.error = (
            <Alert color="info">
                We noticed that your computer's clock is not set correctly.
                Please set it correctly for better performance! :)
            </Alert>
        );
        this.toggle();
    }

    getDate(data) {
        data = data.split('<div id="cityClock">', 2)[1];
        data = data.split('</div>', 2);
        var date = data[1].split(', ');
        date = date[1] + ', ' + date[2].split('<')[0];

        var time = data[0].split(/\D+/);
        var ampm = data[0].split(/<\/*sup>+/)[1];
        if (ampm === 'pm' && time[1] !== '12') {
            time[1] = ((parseInt(time[1], 10) + 12) % 24).toString();
        } else if (ampm === 'am' && time[1] === '12') {
            time[1] = '00';
        }
        date =
            date + ' ' + time[1] + ':' + time[2] + ':' + time[3] + ' GMT+00:00';

        // QUARTER
        // calculating which quarter we are in (based on start time of first meeting in UTC minus 1 hour)
        const quarters = config['quarters'];
        const startDates = config['dates'];

        // change below for testing [ place desired date inside Date() ]
        var today = new Date(date);
        // var today = new Date('April 7, 2020 08:59:59');
        if (!(today instanceof Date) || isNaN(today)) {
            this.err();
            return;
        }
        today = today.getTime();

        // index of the quarter we are in
        let i = 0;
        while (i + 1 < startDates.length && startDates[i + 1] <= today) {
            i += 1;
        }
        this.quarter = quarters[i];

        // WEEK
        // calculating which week we are in (based on start time of first meeting in UTC minus 1 hour)
        // will post questions 1 hr before meeting starts
        // will post solutions right after the meeting ends
        // adding .5 will make sure number is rounded up
        this.week = (
            (today - startDates[i]) / 1000 / 60 / 60 / 24 / 7 +
            0.5
        ).toFixed(0);

        // SESSION
        // calculating what the latest meeting session is (UTC)
        // mod 7 to make sure numbers stay in week range
        const ses =
            Math.floor((today - startDates[i]) / 1000 / 60 / 60 / 24) % 7;
        // Usually Tuesday
        if (ses < 2) {
            this.session = 1;
            // Usually Thursday
        } else {
            this.session = 2;
        }

        // END
        // check if the session ended, assuming each session lasts 2 hours
        // note that ses === 0 corresponds to Tuesday, and ses === 2 corresponds to Thursday
        const hoursElapsed = (today - startDates[i]) / 1000 / 60 / 60; // Total hours elapsed since start of quarter
        const hourOfWeek = hoursElapsed % 168; // 168 hours in week

        if (this.session == 1) {
            this.end = hourOfWeek >= config.meetingLengths[0];
        } else if (this.session == 2) {
            this.end = hourOfWeek >= 48 + config.meetingLengths[1]; // 48 is the number of hours between meetings
        } else {
            this.end = false;
        }

        // Handling after quarter dates
        if (this.week > 11) {
            this.session = 2;
            this.week = 11;
            this.end = true;
        }

        // List of quarters that will be included in past solutions
        // note ".slice" does not include end argument
        this.quarters = quarters.slice(0, i + 1);
        // console.log(this.session, this.quarter, this.end, this.week);
        this.done = true;

        var ref = firebase.database().ref();
        ref.on('value', this.processData);

        this.toggle();
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    render() {
        if (this.done) {
            return (
                <div className="center">
                    <Navigation />
                    <Banner
                        lead="Weekly Problems and Solutions"
                        leadSub="Problems posted an hour before meetings start; solutions posted an hour before meetings end."
                    />
                    {this.error}
                    <div className="center">
                        <Row className="center">
                            <Alert
                                className="easy m"
                                transition={{ in: true, timeout: 300 }}>
                                Easy
                            </Alert>
                            <Alert
                                className="med m"
                                transition={{ in: true, timeout: 300 }}>
                                Medium
                            </Alert>
                            <Alert
                                className="hard m"
                                transition={{ in: true, timeout: 300 }}>
                                Hard
                            </Alert>
                            <Alert
                                className="icpc m"
                                transition={{ in: true, timeout: 300 }}>
                                ICPC
                            </Alert>
                            <Alert
                                className="competition m"
                                transition={{ in: true, timeout: 300 }}>
                                Competition
                            </Alert>
                            <Alert
                                className="codealong m"
                                transition={{ in: true, timeout: 300 }}>
                                Code Along
                            </Alert>
                            <Alert
                                className="event m"
                                transition={{ in: true, timeout: 300 }}>
                                Event
                            </Alert>
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

                <Alert
                    className="med m"
                    transition={{ in: true, timeout: 100 }}>
                    Fetching Data :3
                </Alert>

                <div>
                    <br />
                    <br />
                </div>
            </div>
        );
    }
}
