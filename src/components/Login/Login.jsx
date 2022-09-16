import React, { Component } from 'react';
import { Row, Alert, Container, Button, Col } from 'react-bootstrap';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import Navigation from '../Navbar/Navbar';
import Banner from '../Banner/Banner';
import Submit from './Submit/Submit';
import Data from './Data/Data';
import Log from './Log/Log';
import 'firebase/auth';
import config from '../config';
import './Login.css';
import { login, logout, addAuthListener, getUser } from './Auth';
import { initializeSchedule, getConfiguredYear } from '../../utils/Scheduling';

const tabI = {
    Submit: 0,
    Data: 1,
};

const db = getDatabase();

export default class Login extends Component {
    constructor(props) {
        super(props);

        const status = 'Login';

        this.logged = this.logged.bind(this);
        this.setUser = this.setUser.bind(this);
        this.toggle = this.toggle.bind(this);
        this.setTab = this.setTab.bind(this);
        this.processData = this.processData.bind(this);
        this.state = {
            status,
            canDisplayData: false,
        };
        this.emails = {};
        this.owner = {};
        this.show = [
            <Button key="loginbutton" className="loginbutton" onClick={login}>
                {status}
            </Button>,
        ];
        this.default = {};
        Object.entries(config.defaultData).forEach(([key, value]) => {
            this.default[key] = value;
        });

        this.ref = ref(db);
        onValue(this.ref, this.processData);
        initializeSchedule()
            .then((state) => {
                this.quarter = state.quarter;
                this.quarterIndex = state.quarterIndex;
                this.boardQuarter = state.boardQuarter;
                this.boardQuarterInd = state.boardQuarterInd;
                this.week = state.week;
                this.session = state.session;
                this.setState({ canDisplayData: true });
                getUser().then(this.setUser);
            })
            .catch((e) => {
                this.show = (
                    <Alert key="error" color="danger">
                        {e.message}
                    </Alert>
                );
                this.setState({ canDisplayData: false });
            });
    }

    componentDidMount() {
        // check if logged in (after refreshed)
        // uncomment below for debugging
        addAuthListener(this.setUser);
    }

    setUser(u) {
        if (u !== null) {
            // User is logged in
            const { email } = u;
            const ucinetid = email.split('@')[0];

            // Verify has @uci.edu email
            if (
                email.split('@')[1] !== 'uci.edu' &&
                email !== 'acmuciguest@gmail.com'
            ) {
                logout();
                this.show[1] = (
                    <Alert key="notboard" color="info">
                        Hello {u.displayName}, welcome to the ACM website ^^ .
                        Unfortunately, this feature is only for UCI students and
                        faculty at the moment!
                    </Alert>
                );
                this.setState({
                    status: 'Login',
                });
            }

            const userUpdateData = {};

            // Check if log entry exists, if not, insert new log entry
            if (!(ucinetid in this.emails)) {
                for (let i = 1; i <= 11; i++) {
                    userUpdateData[
                        `/logs/${ucinetid}/Winter 2019/${i.toString()}`
                    ] = 0;
                    userUpdateData[
                        `/logs/${ucinetid}/Spring 2019/${i.toString()}`
                    ] = 0;
                    userUpdateData[
                        `/logs/${ucinetid}/Fall 2019/${i.toString()}`
                    ] = 0;
                    userUpdateData[
                        `/logs/${ucinetid}/Winter 2020/${i.toString()}`
                    ] = 0;
                    userUpdateData[
                        `/logs/${ucinetid}/Spring 2020/${i.toString()}`
                    ] = 0;
                    userUpdateData[
                        `/logs/${ucinetid}/Fall 2020/${i.toString()}`
                    ] = 0;
                    userUpdateData[
                        `/logs/${ucinetid}/Winter 2021/${i.toString()}`
                    ] = 0;
                    userUpdateData[
                        `/logs/${ucinetid}/Spring 2021/${i.toString()}`
                    ] = 0;
                    userUpdateData[
                        `/logs/${ucinetid}/Fall 2021/${i.toString()}`
                    ] = 0;
                    userUpdateData[
                        `/logs/${ucinetid}/Fall 2022/${i.toString()}`
                    ];
                }
                userUpdateData[`/logs/${ucinetid}/Name`] = u.displayName;
                userUpdateData[`/logs/${ucinetid}/Position`] = 'Member';
                userUpdateData[`/logs/${ucinetid}/Photo`] = u.photoURL;

                update(this.ref, userUpdateData);
            } else if (
                this.emails[ucinetid].Photo === undefined ||
                this.emails[ucinetid].Photo === ''
            ) {
                userUpdateData[`/logs/${ucinetid}/Photo`] = u.photoURL;
                update(this.ref, userUpdateData);
            }

            const { canDisplayData } = this.state;
            if (canDisplayData) {
                this.verified(u);
            }
        } else {
            // User is not logged in
            this.show = [
                <Button
                    key="loginbutton"
                    className="loginbutton"
                    onClick={login}
                >
                    Login
                </Button>,
                'displayName' in this.owner ? (
                    <Alert key="notboard" color="info">
                        See you next time {this.owner.displayName.split(' ')[0]}
                        !
                    </Alert>
                ) : (
                    <span key="blank" />
                ),
            ];
            this.owner = {};
            this.setState({
                status: 'Login',
            });
        }
    }

    setTab(ntab) {
        const tabStyle = ['loginbutton', 'loginbutton'];
        tabStyle[tabI[ntab]] = 'loginactivebtn';
        const allTabs = [
            <Submit
                week={this.week}
                quarter={this.quarter}
                boardQuarter={this.boardQuarter}
                boardQuarterInd={this.boardQuarterInd}
                owner={this.owner.email.split('@')[0]}
                session={this.session}
                data={this.default}
            />,
            <Data
                week={this.week}
                quarter={this.quarter}
                boardQuarter={this.boardQuarter}
                boardQuarterInd={this.boardQuarterInd}
                quarterIndex={this.quarterIndex}
                session={this.session}
                owner={this.owner.email.split('@')[0]}
            />,
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
                    }}
                >
                    Submit
                </Button>

                <Button
                    key="databutton"
                    className={tabStyle[1]}
                    onClick={() => {
                        this.toggle('Data');
                    }}
                >
                    Data
                </Button>

                <Button
                    key="logoutbutton"
                    className="loginbutton"
                    onClick={logout}
                >
                    Logout
                </Button>
                {allTabs[tabI[ntab]]}
            </Container>
        );
    }

    logged(result) {
        // // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken
        // // The signed-in user info.
        const { user } = result;
        const email = user.email.split('@');
        if (email[1] !== 'uci.edu' && user.email !== 'acmuciguest@gmail.com') {
            this.show[1] = (
                <Alert key="notboard" color="info">
                    Hello {user.displayName}, welcome to the ACM website ^^ .
                    Unfortunately, this feature is only for UCI students and
                    faculty at the moment!
                </Alert>
            );
            this.setState({
                status: 'Login',
            });
            return;
        }

        const u = {};
        // TO DO: MAKE ADDING NEW QUARTERS AUTOMATIC
        if (!(email[0] in this.emails)) {
            for (let i = 1; i <= 11; i++) {
                u[`/logs/${email[0]}/Winter 2019/${i.toString()}`] = 0;
                u[`/logs/${email[0]}/Spring 2019/${i.toString()}`] = 0;
                u[`/logs/${email[0]}/Fall 2019/${i.toString()}`] = 0;
                u[`/logs/${email[0]}/Winter 2020/${i.toString()}`] = 0;
                u[`/logs/${email[0]}/Spring 2020/${i.toString()}`] = 0;
                u[`/logs/${email[0]}/Fall 2020/${i.toString()}`] = 0;
                u[`/logs/${email[0]}/Winter 2021/${i.toString()}`] = 0;
                u[`/logs/${email[0]}/Spring 2021/${i.toString()}`] = 0;
                u[`/logs/${email[0]}/Fall 2021/${i.toString()}`] = 0;
                u[`/logs/${email[0]}/Fall 2022/${i.toString()}`] = 0;
            }
            u[`/logs/${email[0]}/Name`] = user.displayName;
            u[`/logs/${email[0]}/Position`] = 'Member';
            u[`/logs/${email[0]}/Photo`] = user.photoURL;
            update(this.ref, u);
        } else if (
            this.emails[email[0]].Photo === undefined ||
            this.emails[email[0]].Photo === ''
        ) {
            u[`/logs/${email[0]}/Photo`] = user.photoURL;
            update(this.ref, u);
        }

        this.verified(user);
    }

    processData(data) {
        const { status } = this.state;
        if (status === 'Login') {
            this.emails = data.val().logs;
            const username =
                'email' in this.owner ? this.owner.email.split('@')[0] : '';
            if (username in this.emails) {
                if (!(this.quarter in this.emails[username])) {
                    const u = {};
                    for (let i = 0; i <= 11; i++) {
                        u[
                            `/logs/${username}/${this.quarter}/${i.toString()}`
                        ] = 0;
                    }
                    update(this.ref, u);
                }
            }
        }
    }

    verified(user) {
        this.owner = user;
        this.default.Contributor = [this.owner.email.split('@')[0]];
        // this.toggle('Profile')
        this.toggle('Data');
    }

    /**
     * Sets which view to show.
     * @param {String} ntab The view to be shown (Submit, Log, Data, Profile, Logout)
     */
    toggle(ntab) {
        this.setTab(ntab);
        this.setState({
            status: ntab,
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
