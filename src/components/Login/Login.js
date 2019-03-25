import React, { Component } from 'react';
import { Row, Alert, Container, Button, Col } from 'reactstrap';
import Navigation from '../Navbar/Navbar';
import Banner from '../Banner/Banner';
import Submit from './Submit/Submit';
import Data from './Data/Data';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import './Login.css';

const emails = [
    'amourady@uci.edu',
    'btjanaka@uci.edu',
    'craut@uci.edu',
    'jtuyls@uci.edu',
    'junliw1@uci.edu',
    'satoks@uci.edu',
    'kgajulap@uci.edu',
    'pooyak@uci.edu',
    'timothy4@uci.edu',
    'cdipalma@uci.edu',
    'mnovitia@uci.edu',
    'bwakasa@uci.edu',
    'renjied@uci.edu',
    'zhonghas@uci.edu'
];

const owners = [
    'Armen',
    'Bryon',
    'Chinmay',
    'Jens',
    'Junlin',
    'Kaleo',
    'Karthik',
    'Pooya',
    'Tim',
    'Chris',
    'Meta',
    'Blake',
    'Jacky',
    'Frank'
];

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.logged = this.logged.bind(this);
        this.lout = this.lout.bind(this);
        this.lin = this.lin.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = {
            status: 'Login'
        };
        this.name = '';
        this.email = '';
        this.owner = '';
        this.show = [
            <Button
                key="loginbutton"
                className="loginbutton"
                onClick={this.login}>
                {this.state.status}
            </Button>
        ];

        // QUARTER
        // calculating which quarter we are in (based on start time of first meeting in UTC minus 1 hour)
        const quarters = ['Fall 2018', 'Winter 2019', 'Spring 2020'];
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
                    See you next time {this.name.split(' ')[0]}!
                </Alert>
            ];
            this.name = '';
            this.email = '';
            this.owner = '';
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
        var m = emails.indexOf(user.email);
        if (m === -1) {
            this.show[1] = (
                <Alert key="notboard" color="info">
                    Hello {user.displayName}, welcome to the ACM website ^^ .
                    Unfortunately, this feature is only for board members at the
                    moment!
                </Alert>
            );
            this.setState({
                status: 'Login'
            });
            return;
        }

        this.name = user.displayName;
        this.email = user.email;
        this.owner = owners[m];

        this.show = (
            <Container key="board">
                <Row className="welcome">
                    <Col style={{ textAlign: 'left' }}>
                        Welcome {this.name}! ^^
                    </Col>
                    <Col style={{ textAlign: 'right' }}>{this.email}</Col>
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
                    session={this.session}
                    data={this.data}
                    owner={this.owner}
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
                            Welcome {this.name}! ^^
                        </Col>
                        <Col style={{ textAlign: 'right' }}>{this.email}</Col>
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
                        owner={this.owner}
                    />
                </Container>
            );
        } else {
            this.show = (
                <Container key="board">
                    <Row className="welcome">
                        <Col style={{ textAlign: 'left' }}>
                            Welcome {this.name}! ^^
                        </Col>
                        <Col style={{ textAlign: 'right' }}>{this.email}</Col>
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
                        data={this.data}
                        owner={this.owner}
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