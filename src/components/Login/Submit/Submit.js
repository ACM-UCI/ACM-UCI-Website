import React, { Component } from 'react';
import { Alert, Col, Row, Button, Form, Input, FormText } from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/database';
import board from '../../Board/board.json';
import './Submit.css';

const vars = {
    difficulties: ['easy', 'med', 'hard', 'icpc', 'codealong'],
    extras: ['event', 'announcment', 'finals', 'thanksgiving']
};

export default class Submit extends Component {
    constructor(props) {
        super(props);

        this.quarter = props.quarter;
        this.week = props.week;
        this.owner = props.owner;

        this.updateInputValue = this.updateInputValue.bind(this);
        this.processData = this.processData.bind(this);
        this.upload = this.upload.bind(this);
        this.readCode = this.readCode.bind(this);
        this.err = this.err.bind(this);
        this.state = {
            tog: false
        };

        this.prompt = 'Upload';
        if (props.data.Link !== '' && props.data.Link !== undefined) {
            this.prompt = 'Save';
        }

        this.data = {};
        if (props.data.Solution !== undefined && props.data.Solution !== '') {
            this.filename = (
                <FormText color="muted" style={{ textAlign: 'left' }}>
                    Current Submission: {props.data.Solution}
                </FormText>
            );
        }

        this.diffSel = [];
        var i = 0;
        for (i = 0; i < vars.difficulties.length; i++) {
            this.diffSel.push(<option>{vars.difficulties[i]}</option>);
        }
        if (props.owner === 'mnovitia') {
            for (i = 0; i < vars.extras.length; i++) {
                this.diffSel.push(<option>{vars.extras[i]}</option>);
            }
        }

        this.ref = firebase.database().ref();
        this.ref.on('value', this.processData);

        this.status = [];

        this.submission = {};
        for (var key in props.data) {
            this.submission[key] = props.data[key];
        }
    }

    processData(data) {
        this.data = data.val();
        /* this is code for initializing logs in firebase to 0 BE CAREFUL
        var okay = true;
        if (okay) {
            var u = {};
            for (var b in this.data['board']) {
                if (
                    this.data['board'].hasOwnProperty(b) &&
                    b !== 'Week' &&
                    !this.data['logs'].hasOwnProperty(b)
                ) {
                    // uncomment this to initialize all
                    for (var i = 1; i <= 11; i++) {
                        u['/logs/' + b + '/Fall 2018/' + i.toString()] = 0;
                        u['/logs/' + b + '/Winter 2019/' + i.toString()] = 0;
                        u['/logs/' + b + '/Spring 2019/' + i.toString()] = 0;
                    }
                }
            }
            firebase
                .database()
                .ref()
                .update(u);
        }
        // */
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
        this.setState({
            tog: false
        });
    }

    readCode(evt) {
        this.submission.Code = evt.target.result;
    }

    upload() {
        var s = this.submission;
        var errors = [];

        if (s.Difficulty === 'Select one') {
            errors.push(
                <li key={errors.length}>Please choose a Difficulty</li>
            );
        }

        if (
            vars.difficulties.indexOf(s.Difficulty) !== -1 ||
            s.Difficulty === 'event'
        ) {
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

            // No link checks for now
            if (
                // !s.Link.startsWith('https://leetcode.com/problems/') &&
                // !s.Link.startsWith('https://www.hackerrank.com/') &&
                // !s.Link.startsWith('https://projecteuler.net/') &&
                // !s.Link.startsWith('https://uva.onlinejudge.org/') &&
                // !s.Link.startsWith('http://uva.onlinejudge.org/') &&
                // !s.Link.startsWith('https://open.kattis.com/problems/') &&
                // !s.Link.startsWith('https://drive.google.com/file/') &&
                // !s.Link.startsWith('https://codeforces.com/') &&
                // !s.Link.startsWith('http://socalcontest.org/') &&
                // !s.Link.startsWith('https://www.codechef.com/') &&
                s.Link === ''
            ) {
                errors.push(
                    <li key={errors.length}>Problem Link is not valid</li>
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
                    <li key={errors.length}>
                        Please wait! Still reading file :) Submit again in a
                        sec!
                    </li>
                );
            }

            if (s.Solution === '' && s.Difficulty !== 'event') {
                errors.push(
                    <li key={errors.length}>Please submit a solution!</li>
                );
            }

            // current problem collision checker
            if (s.Difficulty !== 'event') {
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
                                        (s.Link === problem.Link ||
                                            s.Link + '/' === problem.Link) &&
                                        problem.Link !== this.props.data.Link
                                    ) {
                                        errors.push(
                                            <li key={errors.length}>
                                                Oof someone submitted that
                                                already!
                                            </li>
                                        );
                                        stop = true;
                                        break;
                                    }
                                }
                            }
                        }
                    } else if (
                        this.data.hasOwnProperty(q) &&
                        q !== 'board' &&
                        q !== 'logs'
                    ) {
                        var quarter = this.data[q];
                        for (var w in quarter) {
                            if (quarter.hasOwnProperty(w)) {
                                var week = quarter[w];
                                for (var keys in week) {
                                    if (week.hasOwnProperty(keys)) {
                                        problem = week[keys];
                                        if (problem != null) {
                                            if (
                                                (s.Link === problem.Link ||
                                                    s.Link + '/' ===
                                                        problem.Link) &&
                                                problem.Link !==
                                                    this.props.data.Link
                                            ) {
                                                errors.push(
                                                    <li key={errors.length}>
                                                        Oof someone else
                                                        submitted that already!
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
            }
        }

        if (
            !board['2019-2020'].hasOwnProperty(this.owner) &&
            this.data['logs'][this.owner][this.quarter][this.week] >= 2
        ) {
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
            this.setState({
                tog: false
            });
        } else {
            s.SubmitDate = Date().toString();
            var updates = {};
            if (
                this.props.data.Link !== '' &&
                this.props.data.Link !== undefined
            ) {
                updates[this.props.k + '/' + this.props.x] = s;
                firebase
                    .database()
                    .ref()
                    .update(updates, this.err);
                this.err(null);
            } else {
                var newPostKey = firebase
                    .database()
                    .ref()
                    .child('submissions')
                    .push().key;
                updates['/submissions/' + newPostKey] = s;

                if (vars.difficulties.indexOf(s.Difficulty) !== -1) {
                    updates[
                        '/logs/' +
                            this.owner +
                            '/' +
                            this.quarter +
                            '/' +
                            this.week
                    ] =
                        this.data['logs'][this.owner][this.quarter][this.week] +
                        1;
                }

                firebase
                    .database()
                    .ref()
                    .update(updates, this.err);
                this.err(null);

                this.setState({
                    tog: false
                });
            }
        }
    }

    err(error) {
        if (error) {
            this.status = (
                <Alert color="warning" style={{ textAlign: 'left' }}>
                    Failed to upload :( Please contact web dev team!
                </Alert>
            );
            this.setState({
                tog: false
            });
        } else {
            this.status = (
                <Alert color="success" style={{ textAlign: 'left' }}>
                    Problem Submitted! Thank you :)
                </Alert>
            );
        }
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
                            defaultValue={this.props.data.Name}
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
                            defaultValue={this.props.data.Link}
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
                            defaultValue={this.props.data.Difficulty}
                            onChange={evt => this.updateInputValue(evt)}
                            name="select"
                            id="Difficulty">
                            <option>Select one</option>
                            {this.diffSel}
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
                            placeholder="Optional. Place each point in a new line"
                            value={this.submission.Note}
                            id="Note"
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
                        {this.filename}
                        <FormText color="muted" style={{ textAlign: 'left' }}>
                            You have to submit solutions for your problem!
                        </FormText>
                    </Col>
                </Row>
                <br />

                {this.status}

                <Button onClick={this.upload} className="submitbtn">
                    {this.prompt}
                </Button>
            </Form>
        );
    }
}
