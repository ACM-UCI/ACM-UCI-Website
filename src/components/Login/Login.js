import React, { Component } from 'react';
import { Row, Alert, Container, Button, Col } from 'reactstrap';
import Navigation from '../Navbar/Navbar';
import Banner from '../Banner/Banner';
import Submit from './Submit/Submit';
import Data from './Data/Data';
import Log from './Log/Log';
import firebase from 'firebase/app';
import 'firebase/auth';
import './Login.css';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.logged = this.logged.bind(this);
        this.lout = this.lout.bind(this);
        this.lin = this.lin.bind(this);
        this.toggle = this.toggle.bind(this);
        this.processData = this.processData.bind(this);
        this.state = {
            status: 'Login'
        };
        this.emails = {};
        this.owner = {};
        this.show = [
            <Button
                key="loginbutton"
                className="loginbutton"
                onClick={this.login}>
                {this.state.status}
            </Button>
        ];

        this.ref = firebase.database().ref();
        this.ref.on('value', this.processData);

        // QUARTER
        // calculating which quarter we are in (based on start time of first meeting in UTC minus 1 hour)
        const quarters = ['Fall 2018', 'Winter 2019', 'Spring 2019'];
        const startDates = [
            new Date('October 2, 2018 18:00:00 GMT-07:00').getTime(),
            new Date('January 8, 2019 17:00:00 GMT-08:00').getTime(),
            new Date('April 2, 2019 17:00:00 GMT-07:00').getTime()
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

    processData(data) {
        if (this.state.status === 'Login') {
            this.emails = data.val()['logs'];

            // uncomment below for debugging
            // this.logged({ user: { email: 'mnovitia@uci.edu' } });
        }
    }

    login() {
        if (this.state.status === 'Login') {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase
                .auth()
                .signInWithPopup(provider)
                .then(this.logged)
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    // var credential = error.credential;
                    // ...
                    // alert("Failed to log in");
                    console.log(errorCode, errorMessage, email);
                });
        } else {
            firebase.auth().signOut();
            this.show = [
                <Button
                    key="loginbutton"
                    className="loginbutton"
                    onClick={this.login}>
                    Login
                </Button>,
                <Alert key="notboard" color="info">
                    See you next time {this.owner.displayName.split(' ')[0]}!
                </Alert>
            ];
            this.owner = {};
            this.setState({
                status: 'Login',
                tab: 'Submit'
            });
        }
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

        if (!this.emails.hasOwnProperty(email[0])) {
            var u = {};
            for (var i = 1; i <= 11; i++) {
                u['/logs/' + email[0] + '/Winter 2019/' + i.toString()] = 0;
                u['/logs/' + email[0] + '/Spring 2019/' + i.toString()] = 0;
            }
            firebase
                .database()
                .ref()
                .update(u);
            u['/logs/' + email[0] + '/Name'] = user.displayName;
        }

        this.owner = user;

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
                    className="loginactivebtn"
                    onClick={() => {
                        this.toggle('Submit');
                    }}>
                    Submit
                </Button>

                <Button
                    key="logbutton"
                    className="loginbutton"
                    onClick={() => {
                        this.toggle('Log');
                    }}>
                    Log
                </Button>

                <Button
                    key="databutton"
                    className="loginbutton"
                    onClick={() => {
                        this.toggle('Data');
                    }}>
                    Data
                </Button>

                <Button
                    key="logoutbutton"
                    className="loginbutton"
                    onClick={this.login}>
                    Logout
                </Button>
                {/* <Log quarter={this.quarter} week={this.week}/> */}
                <Submit
                    week={this.week}
                    quarter={this.quarter}
                    session={this.session}
                    owner={this.owner.email.split('@')[0]}
                    data={{
                        Name: '',
                        Link: '',
                        Difficulty: 'Select one',
                        Note: '',
                        Solution: '',
                        Contributor: this.owner.email.split(' ')[0],
                        Session: '',
                        Code: '',
                        SubmitDate: ''
                    }}
                />
            </Container>
        );

        this.lout();
    }
    lin() {
        this.setState({
            status: 'Login'
        });
    }
    lout() {
        this.setState({
            status: 'Logout'
        });
    }

    toggle(ntab) {
        if (ntab === 'Data') {
            this.show = (
                <Container key="board">
                    <Row className="welcome">
                        <Col style={{ textAlign: 'left' }}>
                            Welcome {this.owner.displayName}! ^^
                        </Col>
                        <Col style={{ textAlign: 'right' }}>
                            {this.owner.email}
                        </Col>
                    </Row>

                    <Button
                        key="submitbutton"
                        className="loginbutton"
                        onClick={() => {
                            this.toggle('Submit');
                        }}>
                        Submit
                    </Button>

                    <Button
                        key="logbutton"
                        className="loginbutton"
                        onClick={() => {
                            this.toggle('Log');
                        }}>
                        Log
                    </Button>

                    <Button
                        key="databutton"
                        className="loginactivebtn"
                        onClick={() => {
                            this.toggle('Data');
                        }}>
                        Data
                    </Button>

                    <Button
                        key="logoutbutton"
                        className="loginbutton"
                        onClick={this.login}>
                        Logout
                    </Button>
                    <Data
                        week={this.week}
                        quarter={this.quarter}
                        session={this.session}
                        owner={this.owner.email.split('@')[0]}
                    />
                </Container>
            );
        } else if (ntab === 'Log') {
            this.show = (
                <Container key="board">
                    <Row className="welcome">
                        <Col style={{ textAlign: 'left' }}>
                            Welcome {this.owner.displayName}! ^^
                        </Col>
                        <Col style={{ textAlign: 'right' }}>
                            {this.owner.email}
                        </Col>
                    </Row>

                    <Button
                        key="submitbutton"
                        className="loginbutton"
                        onClick={() => {
                            this.toggle('Submit');
                        }}>
                        Submit
                    </Button>

                    <Button
                        key="logbutton"
                        className="loginactivebtn"
                        onClick={() => {
                            this.toggle('Log');
                        }}>
                        Log
                    </Button>

                    <Button
                        key="databutton"
                        className="loginbutton"
                        onClick={() => {
                            this.toggle('Data');
                        }}>
                        Data
                    </Button>

                    <Button
                        key="logoutbutton"
                        className="loginbutton"
                        onClick={this.login}>
                        Logout
                    </Button>
                    <Log
                        week={this.week}
                        quarter={this.quarter}
                        owner={this.owner.email.split('@')[0]}
                    />
                </Container>
            );
        } else {
            this.show = (
                <Container key="board">
                    <Row className="welcome">
                        <Col style={{ textAlign: 'left' }}>
                            Welcome {this.owner.displayName}! ^^
                        </Col>
                        <Col style={{ textAlign: 'right' }}>
                            {this.owner.email}
                        </Col>
                    </Row>

                    <Button
                        key="submitbutton"
                        className="loginactivebtn"
                        onClick={() => {
                            this.toggle('Submit');
                        }}>
                        Submit
                    </Button>

                    <Button
                        key="logbutton"
                        className="loginbutton"
                        onClick={() => {
                            this.toggle('Log');
                        }}>
                        Log
                    </Button>

                    <Button
                        key="databutton"
                        className="loginbutton"
                        onClick={() => {
                            this.toggle('Data');
                        }}>
                        Data
                    </Button>

                    <Button
                        key="logoutbutton"
                        className="loginbutton"
                        onClick={this.login}>
                        Logout
                    </Button>
                    <Submit
                        week={this.week}
                        quarter={this.quarter}
                        owner={this.owner.email.split('@')[0]}
                        session={this.session}
                        data={{
                            Name: '',
                            Link: '',
                            Difficulty: 'Select one',
                            Note: '',
                            Solution: '',
                            Contributor: this.owner.email.split(' ')[0],
                            Session: '',
                            Code: '',
                            SubmitDate: ''
                        }}
                    />
                </Container>
            );
        }
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
                    leadSub="Or else WACeM will haunt you"
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
