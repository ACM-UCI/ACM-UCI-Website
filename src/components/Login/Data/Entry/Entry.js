import React, { Component } from 'react';
import {
    Alert,
    Container,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Table,
    Input,
    Row,
    Col
} from 'reactstrap';
import './Entry.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import firebase from 'firebase/app';
import 'firebase/database';
import { tomorrowNight } from 'react-syntax-highlighter/dist/styles/hljs';

const Python = codeString => (
    <SyntaxHighlighter language="python" style={tomorrowNight}>
        {codeString}
    </SyntaxHighlighter>
);

const Cpp = codeString => (
    <SyntaxHighlighter language="cpp" style={tomorrowNight}>
        {codeString}
    </SyntaxHighlighter>
);

export default class Entry extends Component {
    constructor(props) {
        super(props);
        this.tempCode = '';
        this.tempSol = '';
        this.msg = null;
        this.toggle = this.toggle.bind(this);
        this.setProblem = this.setProblem.bind(this);
        this.readCode = this.readCode.bind(this);
        this.setSolution = this.setSolution.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.toggle2 = this.toggle2.bind(this);
        this.toggle3 = this.toggle3.bind(this);
        this.session = props.session;
        if (this.session === 1) {
            this.optses1 = '1';
            this.optses2 = '2';
        } else {
            this.optses1 = '2';
            this.optses2 = '1';
        }
        this.week = props.week;
        this.avail = 'Available';
        this.state = {
            modal: false,
            modal2: false,
            modal3: false
        };

        this.data = props.data;
        this.txt = (
            <Container className="solbtn" onClick={this.toggle2}>
                Open
            </Container>
        );
        if (this.data.Note === '') {
            this.txt = '-';
        }

        this.sol = (
            <Container className="solbtn" onClick={this.toggle}>
                {this.data.Solution}
            </Container>
        );
        if (this.data.Code === '') {
            this.sol = '';
            if (this.data.Contributor === props.owner) {
                this.sol = (
                    <Row>
                        <Col
                            md="8"
                            style={{
                                alignItems: 'center',
                                justifyItems: 'center'
                            }}>
                            <div class="fileinputs">
                                <Input
                                    className="file"
                                    style={{ fontSize: '15px' }}
                                    type="file"
                                    name="file"
                                    id={this.data.Link}
                                    accept=".py,.cpp"
                                    onChange={evt => this.updateInputValue(evt)}
                                />
                                <div class="fakefile">
                                    <div className="filebutton">
                                        Choose File
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col
                            style={{
                                alignItems: 'center',
                                justifyItems: 'center'
                            }}>
                            <div class="fileinputs">
                                <div class="fakefile">
                                    <Button
                                        className="setbutton"
                                        onClick={this.setSolution}>
                                        Set
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                );
            }
            this.avail = 'Not Available';
        }

        if (this.data.Session === '') {
            this.ses = (
                <Button
                    onClick={this.toggle3}
                    style={{
                        color: 'white'
                    }}>
                    Not Used
                </Button>
            );
        } else {
            this.ses = props.k + '/' + this.data.Session;
        }

        if (this.data.Solution.endsWith('py')) {
            this.code = Python(this.data.Code);
        } else {
            this.code = Cpp(this.data.Code);
        }

        this.color = 'white';
        if (this.data.Difficulty === 'announcement') {
            this.color = 'black';
        }
    }
    setSolution() {
        if (this.tempSol != '') {
            this.data.Solution = this.tempSol;
            this.data.Code = this.tempCode;
            this.sol = (
                <Container className="solbtn" onClick={this.toggle}>
                    {this.data.Solution}
                </Container>
            );
            if (this.data.Solution.endsWith('py')) {
                this.code = Python(this.data.Code);
            } else {
                this.code = Cpp(this.data.Code);
            }

            var updates = {};
            updates[
                '/' + this.props.k + '/' + this.props.x + '/Solution'
            ] = this.data.Solution;
            updates[
                '/' + this.props.k + '/' + this.props.x + '/Code'
            ] = this.data.Code;
            firebase
                .database()
                .ref()
                .update(updates);

            this.setState({
                modal: false,
                modal2: false,
                modal3: false
            });
        }
    }

    setProblem() {
        if (
            this.props.owner === 'Karthik' ||
            this.props.owner === 'Meta' ||
            this.props.owner === 'Bryon'
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
                modal3: false
            });
        } else {
            this.msg = (
                <Alert color="warning">
                    Sorry! Only Karthik, Bryon, and Meta can set problems for
                    now XD
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
        } else if (evt.target.id === this.data.Link) {
            var file = evt.target.files[0];
            if (file != undefined) {
                this.tempSol = file.name;
                this.sol = (
                    <Row>
                        <Col
                            md="8"
                            style={{
                                alignItems: 'center',
                                justifyItems: 'center'
                            }}>
                            <div class="fileinputs">
                                <Input
                                    className="file"
                                    style={{ fontSize: '15px' }}
                                    type="file"
                                    name="file"
                                    id={this.data.Link}
                                    accept=".py,.cpp"
                                    onChange={evt => this.updateInputValue(evt)}
                                />
                                <div class="fakefile">
                                    <div className="filebutton">
                                        {this.tempSol}
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col
                            style={{
                                alignItems: 'center',
                                justifyItems: 'center'
                            }}>
                            <div class="fileinputs">
                                <div class="fakefile">
                                    <Button
                                        className="setbutton"
                                        onClick={this.setSolution}>
                                        Set
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                );
                this.setState({
                    modal: false,
                    modal2: false,
                    modal3: false
                });
                var reader = new FileReader();
                reader.onload = this.readCode;
                reader.readAsText(file);
            }
        }
    }

    readCode(evt) {
        this.tempCode = evt.target.result;
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
            modal2: false,
            modal3: false
        });
    }
    toggle2() {
        this.setState({
            modal: false,
            modal2: !this.state.modal2,
            modal3: false
        });
    }
    toggle3() {
        this.setState({
            modal: false,
            modal2: false,
            modal3: !this.state.modal3
        });
    }

    render() {
        var problem = this.data;
        return (
            <tr>
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
                        style={{ color: this.color }}
                        disabled>
                        {problem.Difficulty}
                    </button>
                </td>
                <td>{this.sol}</td>
                <td>{this.txt}</td>
                <td>{problem.Contributor}</td>
                <td>{this.ses}</td>
                <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        {problem.Solution}
                    </ModalHeader>
                    <ModalBody>{this.code}</ModalBody>
                </Modal>
                <Modal
                    size="lg"
                    isOpen={this.state.modal2}
                    toggle={this.toggle2}>
                    <ModalHeader toggle={this.toggle2}>
                        {problem.Contributor}
                    </ModalHeader>
                    <ModalBody>{problem.Note}</ModalBody>
                </Modal>
                <Modal isOpen={this.state.modal3} toggle={this.toggle3}>
                    <ModalHeader toggle={this.toggle3}>
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
            </tr>
        );
    }
}
