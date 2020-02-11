import React, { Component } from 'react';
import { Alert, Col, Row, Button, Form, Input, FormText } from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/database';
import board from '../../Board/board.json';
import './Submit.css';
import config from '../../config.js';
import Chip from '@material-ui/core/Chip';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const vars = {
    difficulties: ['easy', 'med', 'hard', 'icpc', 'codealong'],
    extras: ['event', 'announcement', 'finals', 'thanksgiving', 'poll']
};

const BootstrapInput = withStyles(theme => ({
    root: {},
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
        }
    }
}))(InputBase);

export default class Submit extends Component {
    constructor(props) {
        super(props);

        this.acceptedLangs = '.py';
        for (var lang in config.supportedLanguage) {
            this.acceptedLangs += ',.' + lang;
        }
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
            this.diffSel.push(
                <option key={'opt' + i.toString()}>
                    {vars.difficulties[i]}
                </option>
            );
        }
        if (props.owner === 'mnovitia') {
            for (i = 0; i < vars.extras.length; i++) {
                this.diffSel.push(
                    <option key={'ex' + i.toString()}>{vars.extras[i]}</option>
                );
            }
        }

        this.status = [];

        this.submission = {};
        for (var key in props.data) {
            this.submission[key] = props.data[key];
        }
        if (
            this.submission['Category'] === '' ||
            this.submission['Category'] === undefined
        ) {
            this.submission['Category'] = [];
        }
        if (
            this.submission['Session'] === '' ||
            this.submission['Session'] === undefined
        ) {
            this.submission['Session'] = [];
        }
        if (
            this.submission['Contributor'] === '' ||
            this.submission['Contributor'] === undefined
        ) {
            this.submission['Contributor'] = [props.owner];
        }

        this.categories = [];

        this.ref = firebase.database().ref();
        this.ref.on('value', this.processData);
    }

    processData(data) {
        this.data = data.val();
        /* this is code for initializing logs in firebase to 0 BE CAREFUL
        var okay = false; // change this
        if (okay) {
            var u = {};
            for (var b in this.data['logs']) {
                if (this.data['logs'].hasOwnProperty(b)) {
                    // u['/logs/' + b + '/LinkedIn'] = null;
                    // u['/logs/' + b + '/GitHub'] = null;
                    // u['/logs/' + b + '/Facebook'] = null;
                    // uncomment this to initialize all
                    var quartersToAdd = [];
                    // quartersToAdd = ["Winter 2020","Spring 2020", "Fall 2020"];
                    // u['/logs/' + b + '/0/'] = null;
                    // u['/logs/' + b + '/1/'] = null;
                    // u['/logs/' + b + '/2/'] = null;
                    for(var qi in quartersToAdd) {
                        var qAdd = quartersToAdd[qi];
                        if(!this.data['logs'][b].hasOwnProperty(qAdd)) {
                            for (var i = 1; i <= 11; i++) {
                                u['/logs/' + b + '/'+qAdd+'/' + i.toString()] = 0;
                            }
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
        this.categories = this.data['categories'].sort();
        this.setState({});
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

        this.setState({});
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

            if (s.Contributor.length === 0) {
                errors.push(
                    <li key={errors.length}>Umm... who's the contributor?</li>
                );
            }

            // current problem collision checker
            if (s.Difficulty !== 'event') {
                var problem = null;
                for (var key in this.data['submissions']) {
                    if (this.data['submissions'].hasOwnProperty(key)) {
                        problem = this.data['submissions'][key];
                        if (problem != null) {
                            if (
                                (s.Link === problem.Link ||
                                    s.Link + '/' === problem.Link) &&
                                problem.Link !== this.props.data.Link
                            ) {
                                errors.push(
                                    <li key={errors.length}>
                                        Oof someone submitted that already!
                                    </li>
                                );
                                break;
                            }
                        }
                    }
                }
            }
        }

        // adding custom categories - TO DO: check if ever gonna have a double update
        var current_categories = [];
        for (var c in this.categories)
            current_categories.push(this.categories[c].toLowerCase()); // case insensitive
        for (var new_c in s.Category) {
            if (!current_categories.includes(s.Category[new_c].toLowerCase())) {
                this.categories.push(s.Category[new_c]);
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
            s.SubmitBy = this.owner;
            var updates = { categories: this.categories };
            var conLen = 0;
            var i = 0;
            var contrib = '';

            if (
                vars.difficulties.indexOf(this.props.data.Difficulty) !== -1 &&
                this.props.data.Contributor !== undefined &&
                this.props.data.Contributor !== ''
            ) {
                conLen = this.props.data.Contributor.length;
                for (i = 0; i < conLen; i++) {
                    contrib = this.props.data.Contributor[i];
                    updates[
                        '/logs/' +
                            contrib +
                            '/' +
                            this.quarter +
                            '/' +
                            this.week
                    ] =
                        this.data['logs'][contrib][this.quarter][this.week] -
                        1 / conLen;
                }
            }

            if (vars.difficulties.indexOf(s.Difficulty) !== -1) {
                conLen = this.submission.Contributor.length;
                for (i = 0; i < conLen; i++) {
                    contrib = this.submission.Contributor[i];
                    if (
                        updates.hasOwnProperty(
                            '/logs/' +
                                contrib +
                                '/' +
                                this.quarter +
                                '/' +
                                this.week
                        )
                    ) {
                        updates[
                            '/logs/' +
                                contrib +
                                '/' +
                                this.quarter +
                                '/' +
                                this.week
                        ] += 1 / conLen;
                    } else {
                        updates[
                            '/logs/' +
                                contrib +
                                '/' +
                                this.quarter +
                                '/' +
                                this.week
                        ] =
                            this.data['logs'][contrib][this.quarter][
                                this.week
                            ] +
                            1 / conLen;
                    }
                }
            }

            if (
                this.props.data.Link !== '' &&
                this.props.data.Link !== undefined
            ) {
                updates['submissions/' + this.props.x] = s;
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
                    Problem Submitted! Thank you :) (May need to refresh Data
                    tab to see changes)
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
                            Contributors
                        </button>
                    </Col>

                    <Col style={{ textAlign: 'left' }}>
                        <Autocomplete
                            multiple
                            id="tags-filled-contrib"
                            options={Object.keys(this.data.logs).sort()}
                            defaultValue={this.submission.Contributor}
                            freeSolo={false}
                            onChange={(evt, value) => {
                                this.updateInputValue({
                                    target: { id: 'Contributor', value: value }
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
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
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
                            Categories
                        </button>
                    </Col>
                    <Col style={{ textAlign: 'left' }}>
                        <Autocomplete
                            multiple
                            id="tags-filled"
                            options={this.categories.sort()}
                            defaultValue={this.submission.Category}
                            freeSolo
                            onChange={(evt, value) => {
                                this.updateInputValue({
                                    target: { id: 'Category', value: value }
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
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    placeholder="Type and press enter to make custom tags"
                                    fullWidth
                                />
                            )}
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
                            accept={this.acceptedLangs}
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
