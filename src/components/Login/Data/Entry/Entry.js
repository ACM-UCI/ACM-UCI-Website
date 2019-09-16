import React, { Component } from 'react';
import {
    Alert,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Table,
    Input,
    Row
} from 'reactstrap';
import './Entry.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import firebase from 'firebase/app';
import 'firebase/database';
import { tomorrowNight } from 'react-syntax-highlighter/dist/styles/hljs';
import Submit from '../../Submit/Submit';
import filter from './filter.js';

const lang = {
    py: 'python',
    cpp: 'cpp',
    js: 'javascript',
    c: 'cpp',
    go: 'go',
    swift: 'swift',
    java: 'java',
    rb: 'ruby',
    cs: 'cs',
    php: 'php',
    kt: 'kotlin',
    m: 'objectivec'
};

const shouldDisplay = ['none', undefined];

export default class Entry extends Component {
    constructor(props) {
        super(props);

        // bindings
        this.updateInputValue = this.updateInputValue.bind(this);
        this.setProblem = this.setProblem.bind(this);
        this.toggle = this.toggle.bind(this);

        this.avail = '';
        this.sol = '';
        this.txt = '';
        this.code = '';
        this.tempSol = '';
        this.edit = null;
        this.msg = null;
        this.msg2 = null;
        this.data = props.data;

        this.selectedSess = '';

        this.allweeks = [];
        for (var w = 1; w <= 11; w++) {
            this.allweeks.push(<option key={'w' + w.toString()}>{w}</option>);
        }

        this.session = props.sess;
        this.filters = props.filters;
        this.optses1 = '2';
        this.optses2 = '1';
        if (this.session === 1) {
            this.optses1 = '1';
            this.optses2 = '2';
        }

        this.week = props.wk;
        this.state = {
            // see solution, see note, set problem, edit, remove session
            modal: [false, false, false, false, false]
        };

        if (
            this.data.Contributor !== undefined &&
            this.data.Contributor.indexOf(this.props.owner) !== -1
        ) {
            this.edit = (
                <Button
                    className="editbutton"
                    onClick={() => {
                        this.toggle(3);
                    }}>
                    Edit
                </Button>
            );
        }
    }

    remove() {
        // change this to position !!!!!
        if (
            this.props.owner === 'mnovitia' ||
            this.props.owner === 'btjanaka' ||
            this.props.owner === 'jtuyls'
        ) {
            // if removing from this quarter
            if (this.selectedSess.startsWith(this.props.qrt)) {
                var sessionIndex = this.data.Session.indexOf(this.selectedSess);
                this.data.Session.splice(sessionIndex, 1);
                var updates = {};
                updates[this.selectedSess + '/' + this.props.x] = null;
                updates[
                    '/submissions/' + this.props.x + '/Session'
                ] = this.data.Session;
                firebase
                    .database()
                    .ref()
                    .update(updates);

                this.setState({
                    modal: [false, false, false, false, false]
                });
            } else {
                this.msg2 = (
                    <Alert color="warning">
                        Sorry! This session is from a different quarter! ^^
                    </Alert>
                );

                this.setState({
                    modal: this.state.modal
                });
            }
        } else {
            this.msg2 = (
                <Alert color="warning">
                    Sorry! Only Bryon, Jens, and Meta can remove problems for
                    now XD
                </Alert>
            );
            this.setState({
                modal: this.state.modal
            });
        }
    }

    setProblem() {
        // change this to position !!!!!
        if (
            this.props.owner === 'mnovitia' ||
            this.props.owner === 'btjanaka' ||
            this.props.owner === 'jtuyls'
        ) {
            if (this.data.Session === undefined) {
                this.data.Session = [];
            }

            var sess =
                this.props.qrt +
                '/' +
                this.week +
                '/' +
                this.session.toString();

            // if adding a new session
            if (this.data.Session.indexOf(sess) === -1) {
                this.data.Session.push(
                    this.props.qrt +
                        '/' +
                        this.week +
                        '/' +
                        this.session.toString()
                );
                var updates = {};
                updates[
                    '/' +
                        this.props.qrt +
                        '/' +
                        this.week +
                        '/' +
                        this.session.toString() +
                        '/' +
                        this.props.x
                ] = {
                    tag: ''
                };
                updates[
                    '/submissions/' + this.props.x + '/Session'
                ] = this.data.Session;
                firebase
                    .database()
                    .ref()
                    .update(updates);

                this.setState({
                    modal: [false, false, false, false, false]
                });
            } else {
                this.msg = (
                    <Alert color="warning">
                        Sorry! This problem is already used in that session! ^^
                    </Alert>
                );

                this.setState({
                    modal: this.state.modal
                });
            }
        } else {
            this.msg = (
                <Alert color="warning">
                    Sorry! Only Bryon, Jens, and Meta can set problems for now
                    XD
                </Alert>
            );
            this.setState({
                modal: this.state.modal
            });
        }
    }

    updateInputValue(evt) {
        if (evt.target.id === 'Session') {
            this.session = evt.target.value;
        } else if (evt.target.id === 'Week') {
            this.week = evt.target.value;
        }
    }

    toggle(i) {
        var newM = this.state.modal;
        newM[i] = !newM[i];
        this.setState({
            modal: newM
        });
    }

    render() {
        var problem = this.props.data;

        // set solution name, button, and availability
        this.sol = '';
        this.avail = 'Not Available';
        if (problem.Solution !== '') {
            this.avail = 'Available';
            this.sol = (
                <Button
                    className="solbtn"
                    onClick={() => {
                        this.toggle(0);
                    }}>
                    {problem.Solution}
                </Button>
            );
            // !!!!! position
            if (
                problem.Contributor !== this.props.owner &&
                this.props.owner !== 'mnovitia' &&
                this.props.owner !== 'btjanaka' &&
                this.props.owner !== 'jtuyls'
            ) {
                this.sol = (
                    <Button
                        disabled
                        className="solbtn"
                        onClick={() => {
                            this.toggle(0);
                        }}>
                        Blocked
                    </Button>
                );
            }
        }

        // set code
        this.code = null;
        if (problem.Solution !== undefined) {
            var ext = problem.Solution.split('.').slice(-1)[0];
            this.code = (
                <SyntaxHighlighter language={lang[ext]} style={tomorrowNight}>
                    {problem.Code}
                </SyntaxHighlighter>
            );
        }

        // set notes
        this.txt = '-';
        if (problem.Note !== '') {
            this.txt = (
                <Button
                    className="solbtn"
                    onClick={() => {
                        this.toggle(1);
                    }}>
                    Open
                </Button>
            );
        }

        // set contributors
        this.contributors = [];
        for (var i in this.data.Contributor) {
            var c = this.data.Contributor[i];
            if (i > 0) {
                c = ', ' + c;
            }
            this.contributors.push(c);
        }

        // set sessions
        this.sessions = [];
        for (i in this.data.Session) {
            this.sessions.push(
                <Button
                    id={this.data.Session[i]}
                    key={'sessbtn' + i.toString()}
                    className="solbtn"
                    onClick={e => {
                        this.selectedSess = e.target.id;
                        this.toggle(4);
                    }}>
                    {this.data.Session[i]}
                </Button>
            );
        }

        return (
            <tr
                style={{
                    display: shouldDisplay[filter(problem, this.filters)]
                }}>
                <th scope="row" style={{ textAlign: 'left' }}>
                    <a
                        className="problinkdata"
                        href={problem.Link}
                        target="_blank"
                        rel="noopener noreferrer">
                        {problem.Name}
                    </a>
                </th>
                <td>
                    <button
                        className={problem.Difficulty}
                        style={{ color: 'white' }}
                        disabled>
                        {problem.Difficulty}
                    </button>
                </td>
                <td>{this.sol}</td>
                <td>{this.txt}</td>
                <td>{this.contributors}</td>
                <td>{this.sessions}</td>
                <td>
                    <Button
                        onClick={() => {
                            this.toggle(2);
                        }}
                        style={{
                            color: 'white',
                            borderRadius: '50%',
                            fontSize: '14px'
                        }}>
                        +
                    </Button>
                </td>
                <td>{this.edit}</td>
                <Modal
                    size="lg"
                    isOpen={this.state.modal[0]}
                    toggle={() => {
                        this.toggle(0);
                    }}>
                    <ModalHeader
                        toggle={() => {
                            this.toggle(0);
                        }}>
                        {problem.Solution}
                    </ModalHeader>
                    <ModalBody>{this.code}</ModalBody>
                </Modal>
                <Modal
                    size="lg"
                    isOpen={this.state.modal[1]}
                    toggle={() => {
                        this.toggle(1);
                    }}>
                    <ModalHeader
                        toggle={() => {
                            this.toggle(1);
                        }}>
                        {problem.Contributor.map((name, i) => {
                            if (i) return ', ' + name;
                            return name;
                        })}
                    </ModalHeader>
                    <ModalBody>{problem.Note}</ModalBody>
                </Modal>
                <Modal
                    isOpen={this.state.modal[2]}
                    toggle={() => {
                        this.toggle(2);
                    }}>
                    <ModalHeader
                        toggle={() => {
                            this.toggle(2);
                        }}>
                        {problem.Name}
                    </ModalHeader>
                    <ModalBody>
                        <Table>
                            <tbody>
                                <tr>
                                    <th>Difficulty</th>
                                    <td>: {problem.Difficulty}</td>
                                </tr>
                                <tr>
                                    <th>Contributor</th>
                                    <td>: {this.contributors}</td>
                                </tr>
                                <tr>
                                    <th>Solution</th>
                                    <td>: {this.avail}</td>
                                </tr>
                                <tr>
                                    <th>Quarter</th>
                                    <td>: {this.props.qrt}</td>
                                </tr>
                                <tr>
                                    <th>Week</th>
                                    <td>
                                        <Input
                                            type="select"
                                            value={this.props.wk}
                                            onChange={evt =>
                                                this.updateInputValue(evt)
                                            }
                                            name="select"
                                            id="Week">
                                            {this.allweeks}
                                        </Input>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Session</th>
                                    <td>
                                        <Input
                                            type="select"
                                            onChange={evt =>
                                                this.updateInputValue(evt)
                                            }
                                            name="select"
                                            id="Session">
                                            <option>{this.optses1}</option>
                                            <option>{this.optses2}</option>
                                        </Input>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <div style={{ textAlign: 'center' }}>
                            {this.msg}
                            <Button onClick={this.setProblem}>Set</Button>
                        </div>
                    </ModalBody>
                </Modal>
                <Modal
                    size="lg"
                    isOpen={this.state.modal[3]}
                    // toggle={() => {
                    //     this.toggle(3);
                    // }}
                >
                    <ModalHeader
                        toggle={() => {
                            this.toggle(3);
                        }}>
                        Edit
                    </ModalHeader>
                    <Submit
                        week={this.props.wk}
                        quarter={this.props.qrt}
                        owner={this.props.owner}
                        session={this.props.sess}
                        data={problem}
                        x={this.props.x}
                    />
                </Modal>
                <Modal
                    size="sm"
                    isOpen={this.state.modal[4]}
                    toggle={() => {
                        this.toggle(4);
                    }}>
                    <ModalHeader
                        toggle={() => {
                            this.toggle(4);
                        }}>
                        Remove Session
                    </ModalHeader>
                    {this.msg2}
                    <Row
                        style={{
                            textAlign: 'center',
                            justifyContent: 'center'
                        }}>
                        <Button
                            onClick={() => {
                                this.toggle(4);
                            }}
                            style={{ width: '25%', margin: '5%' }}>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                this.remove();
                            }}
                            style={{ width: '25%', margin: '5%' }}>
                            Remove
                        </Button>
                    </Row>
                </Modal>
            </tr>
        );
    }
}
