import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Col, Row, Button, Form } from 'react-bootstrap';
import {
    getDatabase,
    ref,
    onValue,
    child,
    push,
    update,
} from 'firebase/database';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import firebase from '../../../Firebase';
import board from '../../Board/boardMembers.json';
import './Submit.css';
import config from '../../config';

const db = getDatabase();

// TOOD - Will need to drastically redesign this system to allow greater flexibility
const vars = {
    difficulties: ['easy', 'med', 'hard', 'icpc', 'codealong', 'presentation'],
    extras: ['event', 'announcement', 'finals', 'thanksgiving', 'poll'],
};

export default class Submit extends Component {
    constructor(props) {
        super(props);

        this.acceptedLangs = '.py';
        Object.keys(config.supportedLanguage).forEach((lang) => {
            this.acceptedLangs += `,.${lang}`;
        });
        this.quarter = props.quarter;
        this.week = props.week;
        this.owner = props.owner;

        this.updateInputValue = this.updateInputValue.bind(this);
        this.processData = this.processData.bind(this);
        this.upload = this.upload.bind(this);
        this.readCode = this.readCode.bind(this);
        this.err = this.err.bind(this);
        this.state = {
            loaded: false,
            status: null,
        };

        this.prompt = 'Upload';
        if (props.data.Link !== '' && props.data.Link !== undefined) {
            this.prompt = 'Save';
        }

        this.data = {};
        if (props.data.Solution !== undefined && props.data.Solution !== '') {
            this.filename = (
                <Form.Text color="muted" style={{ textAlign: 'left' }}>
                    Current Submission: {props.data.Solution}
                </Form.Text>
            );
        }

        this.diffSel = [];
        let i = 0;

        for (i = 0; i < vars.difficulties.length; i++) {
            this.diffSel.push(
                <option key={`opt${i.toString()}`}>
                    {vars.difficulties[i]}
                </option>
            );
        }
        if (props.owner === 'mnovitia' || props.owner === 'ryansy') {
            for (i = 0; i < vars.extras.length; i++) {
                this.diffSel.push(
                    <option key={`ex${i.toString()}`}>{vars.extras[i]}</option>
                );
            }
        }

        this.isPresentation = false;

        this.submission = {};
        Object.entries(props.data).forEach(([key, value]) => {
            this.submission[key] = value;
        });

        if (
            this.submission.Category === '' ||
            this.submission.Category === undefined
        ) {
            this.submission.Category = [];
        }
        if (
            this.submission.Session === '' ||
            this.submission.Session === undefined
        ) {
            this.submission.Session = [];
        }
        if (
            this.submission.Contributor === '' ||
            this.submission.Contributor === undefined
        ) {
            this.submission.Contributor = [props.owner];
        }

        this.categories = [];
    }

    componentDidMount() {
        this.ref = ref(db);
        onValue(this.ref, this.processData);
    }

    processData(data) {
        this.data = data.val();
        /* this is code for initializing logs in firebase to 0 BE CAREFUL
        var okay = false; // change this
        if (okay) {
            var u = {};
            // for (var b in this.data['logs']) {
            //     if (this.data['logs'].hasOwnProperty(b)) {
            //         // u['/logs/' + b + '/LinkedIn'] = null;
            //         // u['/logs/' + b + '/GitHub'] = null;
            //         // u['/logs/' + b + '/Facebook'] = null;
            //         // uncomment this to initialize all
            //         var quartersToAdd = [];
            //         // quartersToAdd = ["Winter 2020","Spring 2020", "Fall 2020"];
            //         // u['/logs/' + b + '/0/'] = null;
            //         // u['/logs/' + b + '/1/'] = null;
            //         // u['/logs/' + b + '/2/'] = null;
            //         for(var qi in quartersToAdd) {
            //             var qAdd = quartersToAdd[qi];
            //             if(!this.data['logs'][b].hasOwnProperty(qAdd)) {
            //                 for (var i = 1; i <= 11; i++) {
            //                     u['/logs/' + b + '/'+qAdd+'/' + i.toString()] = 0;
            //                 }
            //             }
            //         }
            //     }
            // }
            for (var b in this.data['submissions']) {
                if (
                    this.data['submissions'].hasOwnProperty(b) &&
                    this.data['submissions'][b].hasOwnProperty('Session')
                ) {
                    for (var sess_i = 0; sess_i < 10; sess_i += 1) {
                        var sess = sess_i;
                        if (
                            sess < this.data['submissions'][b]['Session'].length
                        ) {
                            var name = '';
                            for (var letter in this.data['submissions'][b][
                                'Session'
                            ][sess]) {
                                name += this.data['submissions'][b]['Session'][
                                    sess
                                ][letter];
                            }
                            u['/submissions/' + b + '/Session/' + sess] = {
                                Name: name.toString(),
                                Ratings: {
                                    like: 0,
                                    dislike: 0
                                },
                                Clicks: 0,
                                SolutionViews: 0,
                                HintViews: 0
                            };
                            console.log(name);
                        }
                    }
                }
            }
            firebase
                .database()
                .ref()
                .update(u);
        }
        // */
        this.categories = this.data.categories.sort();
        this.setState({ loaded: true });
    }

    updateInputValue(e) {
        if (e.target.id === 'File' && e.target.value !== '') {
            const file = e.target.files[0];
            this.submission.Solution = file.name;
            const reader = new FileReader();
            reader.onload = this.readCode;
            reader.readAsText(file);
        } else {
            this.submission[e.target.id] = e.target.value;
            while (
                e.target.id === 'Link' &&
                this.submission.Link.endsWith('/')
            ) {
                const str = this.submission.Link;
                this.submission.Link = str.slice(0, str.length - 1);
            }
        }

        if (e.target.id === 'Difficulty') {
            this.isPresentation = e.target.value === 'presentation';
            if (this.isPresentation && !('PresNotes' in this.submission)) {
                this.submission.PresNotes = '';
            } else if (!this.isPresentation) {
                delete this.submission.PresNotes;
            }
        }

        this.setState({});
    }

    readCode(evt) {
        this.submission.Code = evt.target.result;
    }

    upload() {
        const s = this.submission;
        const errors = [];

        if (s.Difficulty === 'presentation') {
            // Quick Error Check:
            if (s.Name === '') {
                errors.push(
                    <li key={errors.length}>Problem name cannot be blank</li>
                );
            }
            if (s.Link === '') {
                errors.push(
                    <li key={errors.length}>No Problem Link Selected</li>
                );
            }

            if (errors.length > 0) {
                this.setState((prevState) => ({
                    ...prevState,
                    status: (
                        <Alert color="danger" style={{ textAlign: 'left' }}>
                            Sorry, failed to upload:
                            {errors}
                        </Alert>
                    ),
                }));
            } else {
                s.SubmitDate = Date().toString();
                s.SubmitBy = this.owner;

                const newPostKey = push(child(this.ref, 'submissions')).key;
                const updates = {};
                updates[`/submissions/${newPostKey}`] = s;

                update(this.ref, updates);
                this.err(null);
            }
            return;
        }

        if (s.Difficulty === 'Select one') {
            errors.push(
                <li key={errors.length}>Please choose a Difficulty</li>
            );
        }

        if (s.Name === '') {
            errors.push(
                <li key={errors.length}>Problem Name cannot be blank</li>
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

            if (s.Contributor.length === 0) {
                errors.push(
                    <li key={errors.length}>
                        Umm... who&apos;s the contributor?
                    </li>
                );
            }

            // current problem collision checker
            if (s.Difficulty !== 'event') {
                let problem = null;
                Object.keys(this.data.submissions).forEach((key) => {
                    problem = this.data.submissions[key];
                    if (problem != null) {
                        if (
                            (s.Link === problem.Link ||
                                `${s.Link}/` === problem.Link) &&
                            problem.Link !== this.props.data.Link
                        ) {
                            errors.push(
                                <li key={errors.length}>
                                    Oof someone submitted that already!
                                </li>
                            );
                        }
                    }
                });
            }
        }

        // adding custom categories - TO DO: check if ever gonna have a double update
        const currentCategories = this.categories.map((c) => c.toLowerCase());
        Object.keys(s.Category).forEach((newC) => {
            if (!currentCategories.includes(s.Category[newC].toLowerCase())) {
                this.categories.push(s.Category[newC]);
            }
        });

        if (
            !(this.owner in board[config.current]) &&
            this.owner in this.data.logs &&
            this.quarter in this.data.logs[this.owner] &&
            this.week in this.data.logs[this.owner][this.quarter] &&
            this.data.logs[this.owner][this.quarter][this.week] >= 5
        ) {
            errors.push(
                <li key={errors.length}>
                    Uhh you&apos;ve submitted 5 problems already this week
                </li>
            );
        }

        if (errors.length > 0) {
            this.setState((prevState) => ({
                ...prevState,
                status: (
                    <Alert color="danger" style={{ textAlign: 'left' }}>
                        Sorry, failed to upload:
                        {errors}
                    </Alert>
                ),
            }));
        } else {
            s.SubmitDate = Date().toString();
            s.SubmitBy = this.owner;
            const updates = { categories: this.categories };
            let conLen = 0;
            let i = 0;
            let contrib = '';

            if (
                vars.difficulties.indexOf(this.data.Difficulty) !== -1 &&
                this.data.Contributor !== undefined &&
                this.data.Contributor !== ''
            ) {
                conLen = this.data.Contributor.length;
                for (i = 0; i < conLen; i++) {
                    contrib = this.data.Contributor[i];
                    updates[`/logs/${contrib}/${this.quarter}/${this.week}`] =
                        this.data.logs[contrib][this.quarter][this.week] -
                        1 / conLen;
                }
            }

            // if (vars.difficulties.indexOf(s.Difficulty) !== -1) {
            //   conLen = this.submission.Contributor.length;
            //   for (i = 0; i < conLen; i++) {
            //     contrib = this.submission.Contributor[i];
            //     const logString = `/logs/${contrib}/${this.quarter}/${this.week}`;
            //     console.log(logString, updates, this.data)
            //     if (logString in updates) {
            //       updates[logString] += 1 / conLen;
            //     } else {
            //       updates[logString] = this.data.logs[contrib][this.quarter][this.week] + 1 / conLen;
            //     }
            //   }
            // }

            if (
                this.props.data.Link !== '' &&
                this.props.data.Link !== undefined
            ) {
                const { x } = this.props;
                updates[`submissions/${x}`] = s;
                update(this.ref, updates);
                this.err(null);
            } else {
                const newPostKey = push(child(this.ref, 'submissions')).key;
                updates[`/submissions/${newPostKey}`] = s;

                update(this.ref, updates);
                this.err(null);
            }
        }
    }

    err(error) {
        console.log(error);
        if (error) {
            this.setState((prevState) => ({
                ...prevState,
                status: (
                    <Alert color="warning" style={{ textAlign: 'left' }}>
                        Failed to upload :( Please contact web dev team!
                    </Alert>
                ),
            }));
        } else {
            this.setState((prevState) => ({
                ...prevState,
                status: (
                    <Alert color="success" style={{ textAlign: 'left' }}>
                        Problem Submitted! Thank you :) (May need to refresh
                        Data tab to see changes)
                    </Alert>
                ),
            }));
        }
    }

    render() {
        const { loaded } = this.state;
        if (!loaded) return null;
        return (
            <Form className="formsubmit">
                <Form.Group as={Row} className="mb-3" controlId="Name">
                    <Form.Label column sm={2}>
                        Problem Name
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            onChange={(evt) => this.updateInputValue(evt)}
                            defaultValue={this.props.data.Name}
                            required
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="Link">
                    <Form.Label column sm={2}>
                        Problem Link
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            onChange={(evt) => this.updateInputValue(evt)}
                            defaultValue={this.props.data.Link}
                            placeholder="Don't include additional queries at the end"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="Difficulty">
                    <Form.Label column sm={2}>
                        Difficulty
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Select
                            defaultValue={this.props.data.Difficulty}
                            onChange={(evt) => this.updateInputValue(evt)}
                            name="select"
                            id="Difficulty"
                        >
                            <option>Select one</option>
                            {this.diffSel}
                        </Form.Select>
                    </Col>
                </Form.Group>

                {/* {this.isPresentation && (
                    <React.Fragment>
                        <Row>
                            <Col className="submitcol">
                                <button
                                    className="submitlabel"
                                    disabled
                                    style={{
                                        backgroundColor:
                                            'rgba(109, 181, 226, 0.051)',
                                        color: '#02284B'
                                    }}>
                                    Pres Notes Link
                                </button>
                            </Col>
                            <Col>
                                <Input
                                    type="text"
                                    defaultValue=""
                                    onChange={evt => this.updateInputValue(evt)}
                                    name="presentation-notes"
                                    id="PresNotes"
                                />
                            </Col>
                        </Row>
                        <br />
                    </React.Fragment>
                )} */}

                <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="tags-filled-contrib"
                >
                    <Form.Label column sm={2}>
                        Contributors
                    </Form.Label>
                    <Col sm={10}>
                        <Autocomplete
                            multiple
                            id="tags-filled-contrib"
                            options={Object.keys(this.data.logs).sort()}
                            value={this.submission.Contributor}
                            freeSolo={false}
                            onChange={(evt, value) => {
                                this.updateInputValue({
                                    target: { id: 'Contributor', value },
                                });
                            }}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        variant="outlined"
                                        label={option}
                                        {...getTagProps({ index })}
                                    />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="tags-filled">
                    <Form.Label column sm={2}>
                        Categories
                    </Form.Label>
                    <Col sm={10}>
                        <Autocomplete
                            multiple
                            id="tags-filled"
                            options={this.categories.sort()}
                            value={this.submission.Category}
                            freeSolo
                            onChange={(evt, value) => {
                                this.updateInputValue({
                                    target: { id: 'Category', value },
                                });
                            }}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        variant="outlined"
                                        label={option}
                                        {...getTagProps({ index })}
                                    />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    placeholder="Type and press enter to make custom tags"
                                />
                            )}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="Note">
                    <Form.Label column sm={2}>
                        Notes
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            as="textarea"
                            placeholder="Optional. Place each point in a new line"
                            value={this.submission.Note}
                            onChange={(evt) => this.updateInputValue(evt)}
                        />
                    </Col>
                </Form.Group>

                {/* May need to use a custom input type file element here as
          Form.Control has no accept attribute. */}
                <Form.Group as={Row} className="mb-3" controlId="File">
                    <Form.Label column sm={2}>
                        Solution
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="file"
                            accept={this.acceptedLangs}
                            onChange={(evt) => this.updateInputValue(evt)}
                            required
                        />
                        {this.filename}
                    </Col>
                </Form.Group>

                {this.state.status}

                <Button onClick={this.upload} className="submitbtn">
                    {this.prompt}
                </Button>
            </Form>
        );
    }
}

Submit.propTypes = {
    quarter: PropTypes.string,
    week: PropTypes.number.isRequired,
    owner: PropTypes.string.isRequired,
    link: PropTypes.string,
    Solution: PropTypes.string,
    data: PropTypes.object.isRequired,
    x: PropTypes.string,
};

Submit.defaultProps = {
    quarter: '',
    week: 0,
    link: '',
    Solution: '',
    x: '',
};
