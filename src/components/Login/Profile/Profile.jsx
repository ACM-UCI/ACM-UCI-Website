import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Button, Container, Col, Row, Form, Alert } from 'react-bootstrap';
import './Profile.css';
import { SocialIcon } from 'react-social-icons';
import CircularProgress from '@mui/material/CircularProgress';
import firebase from '../../../Firebase';
import logo from '../../../acm_logo.svg';

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.processData = this.processData.bind(this);
        this.res = this.res.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.update = this.update.bind(this);

        this.state = { imw: '40%', done: false };
        if (window.innerWidth <= 782) {
            this.state.imw = '100%';
        }
        this.profile = {};
        this.owner = props.owner;
        this.pic = logo;
        window.onresize = this.res;
        this.alert = null;
        this.icons = [];
    }

    componentDidMount() {
        this.callFirebase();
    }

    update() {
        const u = {};
        u[`logs/${this.owner}`] = this.profile;
        firebase.database().ref().update(u);
        this.alert = <Alert color="info">Successfully Updated!</Alert>;
        this.icons = [
            <SocialIcon
                target="_blank"
                rel="noopener noreferrer"
                style={{ margin: '1%' }}
                network="email"
                key="email"
                url={`mailto:${this.owner}@uci.edu`}
            />,
        ];
        if (
            this.profile.LinkedIn !== undefined &&
            this.profile.LinkedIn !== ''
        ) {
            this.icons.push(
                <SocialIcon
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ margin: '1%' }}
                    key="linkedin"
                    url={`https://www.linkedin.com/in/${this.profile.LinkedIn}`}
                />
            );
        }
        if (this.profile.GitHub !== undefined && this.profile.GitHub !== '') {
            this.icons.push(
                <SocialIcon
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ margin: '1%' }}
                    key="github"
                    url={`https://github.com/${this.profile.GitHub}`}
                />
            );
        }
        if (
            this.profile.Facebook !== undefined &&
            this.profile.Facebook !== ''
        ) {
            this.icons.push(
                <SocialIcon
                    style={{ margin: '1%' }}
                    key="facebook"
                    url={`https://www.facebook.com/${this.profile.Facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                />
            );
        }
        if (this.profile.Photo !== undefined && this.profile.Photo !== '') {
            this.pic = this.profile.Photo;
        } else {
            this.pic = logo;
        }
        this.setState({});
    }

    res() {
        const { imw } = this.state;
        if (imw === '40%' && window.innerWidth <= 782) {
            this.setState({
                imw: '100%',
            });
        } else if (imw === '100%' && window.innerWidth > 782) {
            this.setState({
                imw: '40%',
            });
        }
    }

    callFirebase() {
        const dbRef = ref(getDatabase());
        onValue(dbRef, this.processData);
    }

    processData(data) {
        this.profile = data.val().logs[this.owner];
        this.icons = [
            <SocialIcon
                style={{ margin: '1%' }}
                network="email"
                key="email"
                url={`mailto:${this.owner}@uci.edu`}
                target="_blank"
                rel="noopener noreferrer"
            />,
        ];
        if (
            this.profile.LinkedIn !== undefined &&
            this.profile.LinkedIn !== ''
        ) {
            this.icons.push(
                <SocialIcon
                    style={{ margin: '1%' }}
                    key="linkedin"
                    url={`https://www.linkedin.com/in/${this.profile.LinkedIn}`}
                    target="_blank"
                    rel="noopener noreferrer"
                />
            );
        }
        if (this.profile.GitHub !== undefined && this.profile.GitHub !== '') {
            this.icons.push(
                <SocialIcon
                    style={{ margin: '1%' }}
                    key="github"
                    url={`https://github.com/${this.profile.GitHub}`}
                    target="_blank"
                    rel="noopener noreferrer"
                />
            );
        }
        if (
            this.profile.Facebook !== undefined &&
            this.profile.Facebook !== ''
        ) {
            this.icons.push(
                <SocialIcon
                    style={{ margin: '1%' }}
                    key="facebook"
                    url={`https://www.facebook.com/${this.profile.Facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                />
            );
        }
        if (this.profile.Photo !== undefined && this.profile.Photo !== '') {
            this.pic = this.profile.Photo;
        } else {
            this.pic = logo;
        }
        this.setState({
            done: true,
        });
    }

    updateInputValue(e) {
        this.profile[e.target.id] = e.target.value;
    }

    render() {
        const { done } = this.state;
        if (done) {
            return (
                <Container style={{ border: '10px solid #02284B ' }}>
                    <Row>
                        <img
                            src={this.pic}
                            width="200px"
                            alt="Profile picture"
                        />
                    </Row>
                    <Row>
                        <Col>
                            <p>
                                <strong>Name</strong>
                            </p>
                            <p>{this.profile.Name}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>
                                <strong>UCINetID</strong>
                            </p>
                            <p>{this.owner}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>
                                <strong>Position</strong>
                            </p>
                            <p>{this.profile.Position}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="Photo">
                                <Form.Label>Photo</Form.Label>
                                <Form.Control
                                    style={{
                                        height: '32px',
                                        marginTop: '28px',
                                    }}
                                    onChange={(evt) =>
                                        this.updateInputValue(evt)
                                    }
                                    defaultValue={this.profile.Photo}
                                    placeholder="your profile pic URL"
                                />
                            </Form.Group>
                            <Form.Group controlId="LinkedIn">
                                <Form.Label>LinkedIn</Form.Label>
                                <Form.Control
                                    style={{
                                        height: '32px',
                                        marginTop: '22px',
                                    }}
                                    onChange={(evt) =>
                                        this.updateInputValue(evt)
                                    }
                                    defaultValue={this.profile.LinkedIn}
                                    placeholder="your LinkedIn username"
                                />
                            </Form.Group>
                            <Form.Group controlId="GitHub">
                                <Form.Label>GitHub</Form.Label>
                                <Form.Control
                                    style={{
                                        height: '32px',
                                        marginTop: '22px',
                                    }}
                                    onChange={(evt) =>
                                        this.updateInputValue(evt)
                                    }
                                    placeholder="your GitHub username"
                                    defaultValue={this.profile.GitHub}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Facebook</Form.Label>
                                <Form.Control
                                    style={{
                                        height: '32px',
                                        marginTop: '22px',
                                    }}
                                    onChange={(evt) =>
                                        this.updateInputValue(evt)
                                    }
                                    placeholder="your Facebook username"
                                    defaultValue={this.profile.Facebook}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row
                        style={{
                            justifyContent: 'center',
                            marginBottom: '3%',
                        }}
                    >
                        {this.icons}
                    </Row>
                    {this.alert}
                    <Button
                        className="submitbtn"
                        style={{ width: '60%' }}
                        onClick={this.update}
                    >
                        Update
                    </Button>
                    <br />
                    <br />
                    <br />
                </Container>
            );
        }
        return <CircularProgress />;
    }
}

Profile.propTypes = {
    owner: PropTypes.string.isRequired,
};
