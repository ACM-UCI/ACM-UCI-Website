import React, { Component } from 'react';
import {
    Alert,
    Container,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Table,
    Input
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
    cpp: 'cpp'
};

const shouldDisplay = ['none', undefined];

export default class Entry extends Component {
    constructor(props) {
        super(props);

        // bindings
        this.updateInputValue = this.updateInputValue.bind(this);
        this.setProblem = this.setProblem.bind(this);

        this.avail = '';
        this.sol = '';
        this.txt = '';
        this.code = '';
        this.tempSol = '';
        this.edit = null;
        this.msg = null;
        this.data = props.data;

        this.session = props.session;
        this.filters = props.filters;
        this.optses1 = '2';
        this.optses2 = '1';
        if (this.session === 1) {
            this.optses1 = '1';
            this.optses2 = '2';
        }

        this.week = props.week;
        this.state = {
            // see solution, see note, set problem, edit
            modal: [false, false, false, false]
        };

        // set session
        if (this.data.Session === '') {
            this.ses = (
                <Button
                    onClick={() => {
                        this.toggle(2);
                    }}
                    style={{
                        color: 'white'
                    }}>
                    Not Used
                </Button>
            );
        } else {
            this.ses = props.k + '/' + this.data.Session;
        }

        if (props.owner === this.data.Contributor) {
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

    setProblem() {
        if (
            this.props.owner === 'mnovitia' ||
            this.props.owner === 'btjanaka' ||
            this.props.owner === 'jtuyls'
        ) {
            this.data.Session = this.session.toString();
            var newPostKey = firebase
                .database()
                .ref()
                .child(this.props.quarter)
                .child(this.week)
                .push().key;
            var updates = {};
            updates[
                '/' + this.props.quarter + '/' + this.week + '/' + newPostKey
            ] = this.data;
            updates['/submissions/' + this.props.x] = null;
            firebase
                .database()
                .ref()
                .update(updates);
            this.setState({
                modal: [false, false, false, false]
            });
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
                        {problem.Solution}
                    </Button>
                );
            }
        }

        // set code
        var ext = problem.Solution.split('.').slice(-1)[0];
        this.code = (
            <SyntaxHighlighter language={lang[ext]} style={tomorrowNight}>
                {problem.Code}
            </SyntaxHighlighter>
        );

        // set notes
        this.txt = '-';
        if (problem.Note !== '') {
            this.txt = (
                <Container
                    className="solbtn"
                    onClick={() => {
                        this.toggle(1);
                    }}>
                    Open
                </Container>
            );
        }

        return (
            <tr
                style={{
                    display:
                        shouldDisplay[
                            filter(
                                problem,
                                this.props.k.split('/')[0],
                                this.filters
                            )
                        ]
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
                <td>{problem.Contributor}</td>
                <td>{this.ses}</td>
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
                        {problem.Contributor}
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
                                    <td>: {problem.Contributor}</td>
                                </tr>
                                <tr>
                                    <th>Solution</th>
                                    <td>: {this.avail}</td>
                                </tr>
                                <tr>
                                    <th>Quarter</th>
                                    <td>: {this.props.quarter}</td>
                                </tr>
                                <tr>
                                    <th>Week</th>
                                    <td>
                                        <Input
                                            type="select"
                                            onChange={evt =>
                                                this.updateInputValue(evt)
                                            }
                                            name="select"
                                            id="Week">
                                            <option>{this.props.week}</option>
                                            <option>
                                                {parseInt(this.props.week) + 1}
                                            </option>
                                            <option>
                                                {parseInt(this.props.week) + 2}
                                            </option>
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
                    toggle={() => {
                        this.toggle(3);
                    }}>
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
                        session={this.props.ses}
                        data={problem}
                        k={this.props.k}
                        x={this.props.x}
                    />
                </Modal>
            </tr>
        );
    }
}
