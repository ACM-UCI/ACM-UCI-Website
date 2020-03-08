import React, { Component } from 'react';
import { Row, Alert, Container, Button, Col } from 'reactstrap';
import Navigation from '../Navbar/Navbar';
import Banner from '../Banner/Banner';
import Submit from './Submit/Submit';
import Data from './Data/Data';
import Log from './Log/Log';
import Profile from './Profile/Profile';
import firebase from 'firebase/app';
import 'firebase/auth';
import config from '../config.js';
import './Login.css';
import { login, logout, getUser, addAuthListener } from './Auth';

const tabI = {
    Submit: 0,
    Log: 1,
    Data: 2,
    Profile: 3
};

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.logged = this.logged.bind(this);
        this.toggle = this.toggle.bind(this);
        this.setTab = this.setTab.bind(this);
        this.processData = this.processData.bind(this);
        this.state = {
            status: 'Login'
        };
        this.emails = {};
        this.owner = {};
        this.show = [
            <Button key="loginbutton" className="loginbutton" onClick={login}>
                {this.state.status}
            </Button>
        ];
        this.default = {};
        for (var key in config['defaultData']) {
            this.default[key] = config['defaultData'][key];
        }

        this.ref = firebase.database().ref();
        this.ref.on('value', this.processData);

        // QUARTER
        // calculating which quarter we are in (based on start time of first meeting in UTC minus 1 hour)
        const quarters = [
            'Fall 2018',
            'Winter 2019',
            'Spring 2019',
            'Fall 2019',
            'Winter 2020',
            'Spring 2020'
        ];
        const startDates = [
            new Date('October 2, 2018 18:00:00 GMT-07:00').getTime(),
            new Date('January 8, 2019 17:00:00 GMT-08:00').getTime(),
            new Date('April 2, 2019 18:00:00 GMT-07:00').getTime(),
            new Date('October 1, 2019 18:00:00 GMT-07:00').getTime(),
            new Date('January 7, 2020 18:00:00 GMT-07:00').getTime(),
            new Date('March 31, 2020 18:00:00 GMT-07:00').getTime()
        ];

        var today = new Date().getTime();

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
            this.session = 2;
            // Usually Thursday
        } else {
            this.session = 1;
            this.week = parseInt(this.week) + 1;
        }

        // Handling after quarter dates
        if (this.week > 11) {
            this.session = 1;
            this.week = 1;
            this.quarter = quarters[i + 1];
        }
    }

    componentDidMount() {
        // check if logged in (after refreshed)
        // uncomment below for debugging
        addAuthListener(u => {
            if (u !== null) {
                // User is logged in
                const { email } = u;

                // Verify has @uci.edu email
                if (
                    email.split('@')[1] !== 'uci.edu' &&
                    email !== 'acmuciguest@gmail.com'
                ) {
                    logout();
                    this.show[1] = (
                        <Alert key="notboard" color="info">
                            Hello {u.displayName}, welcome to the ACM website ^^
                            . Unfortunately, this feature is only for UCI
                            students and faculty at the moment!
                        </Alert>
                    );
                    this.setState({
                        status: 'Login'
                    });
                }

                this.verified(u);
            } else {
                // User is not logged in
                this.show = [
                    <Button
                        key="loginbutton"
                        className="loginbutton"
                        onClick={login}>
                        Login
                    </Button>,
                    <Alert key="notboard" color="info">
                        See you next time {this.owner.displayName.split(' ')[0]}
                        !
                    </Alert>
                ];
                this.owner = {};
                this.setState({
                    status: 'Login'
                });
            }
        });
    }

    processData(data) {
        if (this.state.status === 'Login') {
            this.emails = data.val()['logs'];
        }
    }

    verified(user) {
        this.owner = user;
        this.default['Contributor'] = [this.owner.email.split('@')[0]];
        // this.toggle('Profile');
        this.toggle('Data');
    }

    logged(result) {
        // // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken;
        // // The signed-in user info.
        var user = result.user;
        var email = user.email.split('@');
        if (email[1] !== 'uci.edu' && user.email !== 'acmuciguest@gmail.com') {
            this.show[1] = (
                <Alert key="notboard" color="info">
                    Hello {user.displayName}, welcome to the ACM website ^^ .
                    Unfortunately, this feature is only for UCI students and
                    faculty at the moment!
                </Alert>
            );
            this.setState({
                status: 'Login'
            });
            return;
        }

        var u = {};
        // TO DO: MAKE ADDING NEW QUARTERS AUTOMATIC
        if (!this.emails.hasOwnProperty(email[0])) {
            for (var i = 1; i <= 11; i++) {
                u['/logs/' + email[0] + '/Winter 2019/' + i.toString()] = 0;
                u['/logs/' + email[0] + '/Spring 2019/' + i.toString()] = 0;
                u['/logs/' + email[0] + '/Fall 2019/' + i.toString()] = 0;
                u['/logs/' + email[0] + '/Winter 2020/' + i.toString()] = 0;
                u['/logs/' + email[0] + '/Spring 2020/' + i.toString()] = 0;
                u['/logs/' + email[0] + '/Fall 2020/' + i.toString()] = 0;
            }
            u['/logs/' + email[0] + '/Name'] = user.displayName;
            u['/logs/' + email[0] + '/Position'] = 'Member';
            u['/logs/' + email[0] + '/Photo'] = user.photoURL;
            firebase
                .database()
                .ref()
                .update(u);
        } else if (
            this.emails[email[0]].Photo === undefined ||
            this.emails[email[0]].Photo === ''
        ) {
            u['/logs/' + email[0] + '/Photo'] = user.photoURL;
            firebase
                .database()
                .ref()
                .update(u);
        }

        this.verified(user);
    }

    setTab(ntab) {
        var tabStyle = [
            'loginbutton',
            'loginbutton',
            'loginbutton',
            'loginbutton'
        ];
        tabStyle[tabI[ntab]] = 'loginactivebtn';
        var allTabs = [
            <Submit
                week={this.week}
                quarter={this.quarter}
                owner={this.owner.email.split('@')[0]}
                session={this.session}
                data={this.default}
            />,
            <Log
                week={this.week}
                quarter={this.quarter}
                owner={this.owner.email.split('@')[0]}
            />,
            <Data
                week={this.week}
                quarter={this.quarter}
                session={this.session}
                owner={this.owner.email.split('@')[0]}
            />,
            <Profile owner={this.owner.email.split('@')[0]} />
        ];

        this.show = (
            <Container key="board">
                <Row className="welcome">
                    <Col style={{ textAlign: 'left' }}>
                        Welcome {this.owner.displayName}! ^^
                    </Col>
                    <Col style={{ textAlign: 'right' }}>{this.owner.email}</Col>
                </Row>

                <Button
                    key="submitbutton"
                    className={tabStyle[0]}
                    onClick={() => {
                        this.toggle('Submit');
                    }}>
                    Submit
                </Button>

                <Button
                    key="logbutton"
                    className={tabStyle[1]}
                    onClick={() => {
                        this.toggle('Log');
                    }}>
                    Log
                </Button>

                <Button
                    key="databutton"
                    className={tabStyle[2]}
                    onClick={() => {
                        this.toggle('Data');
                    }}>
                    Data
                </Button>

                <Button
                    key="profilebutton"
                    className={tabStyle[3]}
                    onClick={() => {
                        this.toggle('Profile');
                    }}>
                    Profile
                </Button>

                <Button
                    key="logoutbutton"
                    className="loginbutton"
                    onClick={logout}>
                    Logout
                </Button>
                {allTabs[tabI[ntab]]}
            </Container>
        );
    }

    /**
     * Sets which view to show.
     * @param {String} ntab The view to be shown (Submit, Log, Data, Profile, Logout)
     */
    toggle(ntab) {
        this.setTab(ntab);
        this.setState({
            tab: ntab
        });
    }

    render() {
        return (
            <div>
                <Navigation />
                <Banner
                    lead="Submit Your Problems!"
                    leadSub="Login with your uci.edu account. We've got a lot on the line, people."
                />

                <Container className="logincontainer">{this.show}</Container>
                <div>
                    <br />
                    <br />
                    <br />
                </div>
            </div>
        );
    }
}
