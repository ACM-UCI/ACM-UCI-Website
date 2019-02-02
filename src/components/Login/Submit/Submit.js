import React, { Component } from 'react';
import { Alert, Col, Row, Button, Form, Input, FormText } from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/database';
import './Submit.css';

export default class Submit extends Component {
    constructor(props) {
        super(props);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.processData = this.processData.bind(this);
        this.upload = this.upload.bind(this);
        this.readCode = this.readCode.bind(this);
        this.err = this.err.bind(this);
        this.state = {
            tog: false
        };
        this.data = {};

        var ref = firebase.database().ref();
        ref.on('value', this.processData);

        this.status = [];

        this.submission = {
            Name: '',
            Link: '',
            Difficulty: 'Select one',
            Note: '',
            Solution: '',
            Contributor: props.owner,
            Session: '',
            Code: '',
            SubmitDate: ''
        };
    }

    processData(data) {
        this.data = data.val();
        this.setState({
            tog: false
        });
    }

    updateInputValue(e) {
        if (e.target.id === 'File' && e.target.value !== '') {
            var file = e.target.files[0];
            this.submission.Solution = file.name;
            var reader = new FileReader();
            reader.onload = this.readCode;
            reader.readAsText(file);
        } else {
            this.submission[e.target.id] = e.target.value;
            while (
                e.target.id === 'Link' &&
                this.submission['Link'].endsWith('/')
            ) {
                var str = this.submission['Link'];
                this.submission['Link'] = str.slice(0, str.length - 1);
            }
        }
    }

    readCode(evt) {
        this.submission.Code = evt.target.result;
    }

    upload() {
        var s = this.submission;
        var errors = [];
        if (s.Name === '') {
            errors.push(
                <li key={errors.length}>Problem Name cannot be blank</li>
            );
        } else if (s.Name.length > 200) {
            errors.push(
                <li key={errors.length}>
                    Problem Name cannot be more than 200 characters
                </li>
            );
        }

        if (
            !s.Link.startsWith('https://leetcode.com/problems/') &&
            !s.Link.startsWith('https://www.hackerrank.com/') &&
            !s.Link.startsWith('https://projecteuler.net/') &&
            !s.Link.startsWith('https://uva.onlinejudge.org/') &&
            !s.Link.startsWith('https://open.kattis.com/problems/') &&
            !s.Link.startsWith('https://drive.google.com/file/') &&
            !s.Link.startsWith('https://codeforces.com/') &&
            !s.Link.startsWith('http://socalcontest.org/') &&
            !s.Link.startsWith('https://www.codechef.com/')
        ) {
            errors.push(<li key={errors.length}>Problem Link is not valid</li>);
        }

        if (s.Difficulty === 'Select one') {
            errors.push(
                <li key={errors.length}>Please choose a Difficulty</li>
            );
        }

        if (s.Note.length > 1000) {
            errors.push(
                <li key={errors.length}>
                    Notes cannot be more than 1000 characters
                </li>
            );
        }

        if (s.Solution !== '' && s.Code === '') {
            errors.push(
                <li key={errors.length}>Please wait! Still reading file :)</li>
            );
        }

        var stop = false;

        var problem = null;
        for (var q in this.data) {
            if (q === 'submissions') {
                var sub = this.data[q];
                for (var key in sub) {
                    if (sub.hasOwnProperty(key)) {
                        problem = sub[key];
                        if (problem != null) {
                            if (
                                s.Link === problem.Link ||
                                s.Link + '/' === problem.Link
                            ) {
                                errors.push(
                                    <li key={errors.length}>
                                        Oof someone else submitted that already!
                                    </li>
                                );
                                stop = true;
                                break;
                            }
                        }
                    }
                }
            } else if (this.data.hasOwnProperty(q) && q !== 'board') {
                var quarter = this.data[q];
                for (var w in quarter) {
                    if (quarter.hasOwnProperty(w)) {
                        var week = quarter[w];
                        for (var keys in week) {
                            if (week.hasOwnProperty(keys)) {
                                problem = week[keys];
                                if (problem != null) {
                                    if (
                                        s.Link === problem.Link ||
                                        s.Link + '/' === problem.Link
                                    ) {
                                        errors.push(
                                            <li key={errors.length}>
                                                Oof someone else submitted that
                                                already!
                                            </li>
                                        );
                                        stop = true;
                                        break;
                                    }
                                }
                            }
                        }
                        if (stop) {
                            break;
                        }
                    }
                }
            }
            if (stop) {
                break;
            }
        }

        if (this.data['board'][this.props.owner] > 4) {
            errors.push(
                <li key={errors.length}>
                    Uhh you've submitted 5 problems already this week
                </li>
            );
        }

        if (errors.length > 0) {
            this.status = (
                <Alert color="danger" style={{ textAlign: 'left' }}>
                    Sorry, failed to upload:
                    {errors}
                </Alert>
            );
        } else {
            s.SubmitDate = Date().toString();

            var newPostKey = firebase
                .database()
                .ref()
                .child('submissions')
                .push().key;
            var updates = {};
            updates['/submissions/' + newPostKey] = s;
            updates['/board/' + this.props.owner] =
                this.data['board'][this.props.owner] + 1;
            firebase
                .database()
                .ref()
                .update(updates, this.err);
            this.err(null);
        }

        this.setState({
            tog: false
        });
    }

    err(error) {
        if (error) {
            this.status = (
                <Alert color="warning" style={{ textAlign: 'left' }}>
                    Failed to upload :( Please contact web dev team!
                </Alert>
            );
        } else {
            this.status = (
                <Alert color="success" style={{ textAlign: 'left' }}>
                    Problem Submitted! Thank you :)
                </Alert>
            );
        }

        this.setState({
            tog: false
        });
    }

    render() {
        return (
            <Form className="formsubmit">
                <Row>
                    <Col className="submitcol">
                        <button
                            className="submitlabel"
                            disabled
                            style={{
                                backgroundColor: 'rgba(109, 181, 226, 0.051)',
                                color: '#02284B'
                            }}>
                            Problem Name
                        </button>
                    </Col>
                    <Col>
                        <Input
                            onChange={evt => this.updateInputValue(evt)}
                            id="Name"
                            placeholder="Plz don't make it too long"
                        />
                    </Col>
                </Row>
                <br />

                <Row>
                    <Col className="submitcol">
                        <button
                            className="submitlabel"
                            disabled
                            style={{
                                backgroundColor: 'rgba(109, 181, 226, 0.051)',
                                color: '#02284B'
                            }}>
                            Problem Link
                        </button>
                    </Col>
                    <Col>
                        <Input
                            onChange={evt => this.updateInputValue(evt)}
                            id="Link"
                            placeholder="Don't include additional queries at the end"
                        />
                    </Col>
                </Row>
                <br />

                <Row>
                    <Col className="submitcol">
                        <button
                            className="submitlabel"
                            disabled
                            style={{
                                backgroundColor: 'rgba(109, 181, 226, 0.051)',
                                color: '#02284B'
                            }}>
                            Difficulty
                        </button>
                    </Col>
                    <Col>
                        <Input
                            type="select"
                            onChange={evt => this.updateInputValue(evt)}
                            name="select"
                            id="Difficulty">
                            <option>Select one</option>
                            <option>easy</option>
                            <option>med</option>
                            <option>hard</option>
                            <option>icpc</option>
                            <option>codealong</option>
                        </Input>
                    </Col>
                </Row>
                <br />

                <Row>
                    <Col className="submitcol">
                        <button
                            className="submitlabel"
                            disabled
                            style={{
                                backgroundColor: 'rgba(109, 181, 226, 0.051)',
                                color: '#02284B'
                            }}>
                            Notes
                        </button>
                    </Col>
                    <Col>
                        <Input
                            type="textarea"
                            name="text"
                            id="Note"
                            placeholder="Optional"
                            onChange={evt => this.updateInputValue(evt)}
                        />
                    </Col>
                </Row>
                <br />

                <Row>
                    <Col className="submitcol">
                        <button
                            className="submitlabel"
                            disabled
                            style={{
                                backgroundColor: 'rgba(109, 181, 226, 0.051)',
                                color: '#02284B'
                            }}>
                            Solution
                        </button>
                    </Col>
                    <Col>
                        <Input
                            type="file"
                            name="file"
                            id="File"
                            accept=".py,.cpp"
                            onChange={evt => this.updateInputValue(evt)}
                        />
                        <FormText color="muted" style={{ textAlign: 'left' }}>
                            If you don't have the solution right now, you can
                            upload later.
                        </FormText>
                    </Col>
                </Row>
                <br />

                {this.status}

                <Button onClick={this.upload} className="submitbtn">
                    Upload
                </Button>
            </Form>
        );
    }
}
