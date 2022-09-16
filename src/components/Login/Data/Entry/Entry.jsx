import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getDatabase, ref, update } from 'firebase/database';
import { Alert, Button, Form, Modal, Row, Table } from 'react-bootstrap';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import firebase from '../../../../Firebase';
import board from '../../../Board/boardMembers.json';
import config from '../../../config';
import Submit from '../../Submit/Submit';
import './Entry.css';

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
    m: 'objectivec',
};

const db = getDatabase();

export default class Entry extends Component {
    constructor(props) {
        super(props);

        // bindings
        this.updateInputValue = this.updateInputValue.bind(this);
        this.setProblem = this.setProblem.bind(this);
        this.toggle = this.toggle.bind(this);

        const {
            data,
            boardQuarter,
            boardQuarterInd,
            session,
            wk,
            qrtIndex,
            owner,
            x,
        } = this.props;

        this.avail = '';
        this.sol = '';
        this.txt = '';
        this.code = '';
        this.edit = null;
        this.msg = null;
        this.msg2 = null;
        this.data = data;
        this.owner = owner;
        this.boardQuarter = boardQuarter;
        this.x = x;

        this.ref = ref(db);

        this.selectedSess = '';

        this.allweeks = [];
        for (let w = 1; w <= 11; w++) {
            this.allweeks.push(<option key={`w${w.toString()}`}>{w}</option>);
        }

        const quarterMeetingSchedule = config.meetings[boardQuarterInd];
        this.allsessions = [];
        for (let i = 0; i < quarterMeetingSchedule.length; ++i) {
            this.allsessions.push(<option key={`s${i}`}>{i + 1}</option>);
        }

        this.session = 1;

        this.week = 1;

        this.state = {
            // see solution, see note, set problem, edit, remove session
            modal: [false, false, false, false, false],
            session: this.session,
            week: this.week,
        };

        if (
            (this.data.Contributor !== undefined &&
                this.data.Contributor.indexOf(owner) !== -1) ||
            owner in board[config.current]
        ) {
            this.edit = (
                <Button
                    className="editbutton"
                    onClick={() => {
                        this.toggle(3);
                    }}
                >
                    Edit
                </Button>
            );
        }
    }

    // Note: only board can set problems right now
    setProblem() {
        // change this to position !!!!!
        if (this.owner in board[config.current]) {
            if (this.data.Session === undefined) {
                this.data.Session = [];
            }

            const sess = `${this.boardQuarter}/${
                this.state.week
            }/${this.state.session.toString()}`;

            // if adding a new session
            const sessNames = this.data.Session.map((v) => v.Name);
            if (sessNames.indexOf(sess) === -1) {
                this.data.Session.push({
                    Name: `${this.boardQuarter}/${
                        this.state.week
                    }/${this.state.session.toString()}`,
                    Ratings: {
                        like: 0,
                        dislike: 0,
                    },
                    SolutionViews: 0,
                    HintViews: 0,
                    Clicks: 0,
                });
                const updates = {};
                updates[
                    `/${this.boardQuarter}/${
                        this.state.week
                    }/${this.state.session.toString()}/${this.x}`
                ] = {
                    tag: '',
                };
                updates[`/submissions/${this.x}/Session`] = this.data.Session;

                update(this.ref, updates);
                this.setState((prevState) => ({
                    ...prevState,
                    modal: [false, false, false, false, false],
                }));
            } else {
                this.msg = (
                    <Alert color="warning">
                        Sorry! This problem is already used in that session! ^^
                    </Alert>
                );

                this.setState((prevState) => ({
                    ...prevState,
                    modal: prevState.modal,
                }));
            }
        } else {
            this.msg = (
                <Alert color="warning">
                    Sorry! Only board members can set problems!
                </Alert>
            );
            this.setState((prevState) => ({
                ...prevState,
                modal: prevState.modal,
            }));
        }
    }

    remove() {
        // change this to position !!!!!
        if (this.owner in board[config.current]) {
            // if removing from this quarter
            if (this.selectedSess.startsWith(this.boardQuarter)) {
                const sessNames = this.data.Session.map((v) => v.Name);
                const sessionIndex = sessNames.indexOf(this.selectedSess);
                this.data.Session.splice(sessionIndex, 1);
                const updates = {};
                updates[`${this.selectedSess}/${this.x}`] = null;
                updates[`/submissions/${this.x}/Session`] = this.data.Session;
                update(this.ref, updates);

                this.setState((prevState) => ({
                    ...prevState,
                    modal: [false, false, false, false, false],
                }));
            } else {
                this.msg2 = (
                    <Alert color="warning">
                        Sorry! This session is from a different quarter! ^^
                    </Alert>
                );

                this.setState((prevState) => ({
                    ...prevState,
                    modal: prevState.modal,
                }));
            }
        } else {
            this.msg2 = (
                <Alert color="warning">
                    Sorry! Only Bryon, Jens, and Meta can remove problems for
                    now XD
                </Alert>
            );
            this.setState((prevState) => ({
                ...prevState,
                modal: prevState.modal,
            }));
        }
    }

    updateInputValue(evt) {
        if (evt.target.id === 'Session') {
            this.setState((prevState) => ({
                ...prevState,
                session: evt.target.value,
            }));
        } else if (evt.target.id === 'Week') {
            this.setState((prevState) => ({
                ...prevState,
                week: evt.target.value,
            }));
        }
    }

    toggle(i) {
        this.setState((prevState) => {
            const newM = prevState.modal;
            newM[i] = !newM[i];
            return { ...prevState, modal: newM };
        });
    }

    render() {
        const problem = this.data;
        let i;
        let c;

        // set solution name, button, and availability
        this.sol = '';
        this.avail = 'Not Available';
        if (problem.Solution !== '') {
            this.avail = 'Available';
            let solName = problem.Solution.substring(0, 15);
            for (i = 15; i < problem.Solution.length; i += 15) {
                solName += '\n';
                solName += problem.Solution.substring(i, i + 15);
            }
            this.sol = (
                <Button
                    className="solbtn"
                    onClick={() => {
                        this.toggle(0);
                    }}
                >
                    {solName}
                </Button>
            );
            // !!!!! position
            if (
                (Array.isArray(problem.Contributor)
                    ? !problem.Contributor.includes(this.owner)
                    : problem.Contributor !== this.owner) &&
                !(this.owner in board[config.current])
            ) {
                this.sol = (
                    <Button
                        disabled
                        className="solbtn"
                        onClick={() => {
                            this.toggle(0);
                        }}
                    >
                        Blocked
                    </Button>
                );
            }
        }

        // set code
        this.code = null;
        if (problem.Solution !== undefined) {
            const ext = problem.Solution.split('.').slice(-1)[0];
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
                    }}
                >
                    Open
                </Button>
            );
        }

        // set contributors
        this.contributors = [];
        for (i = 0; i < this.data.Contributor.length; i++) {
            c = this.data.Contributor[i];
            if (i > 0) {
                c = `, ${c}`;
            }
            this.contributors.push(c);
        }

        // set sessions
        this.sessions = [];
        if (this.data.Session) {
            for (i = 0; i < this.data.Session.length; i++) {
                this.sessions.push(
                    <Button
                        id={this.data.Session[i].Name}
                        key={`sessbtn${i.toString()}`}
                        className="solbtn"
                        onClick={(e) => {
                            this.selectedSess = e.target.id;
                            this.toggle(4);
                        }}
                    >
                        {this.data.Session[i].Name}
                    </Button>
                );
            }
        }

        // set categories
        this.categories = [];
        if (this.data.Category) {
            for (i = 0; i < this.data.Category.length; i++) {
                c = this.data.Category[i];
                if (i > 0) {
                    c = `, ${c}`;
                }
                this.categories.push(c);
            }
        }

        const { modal } = this.state;
        return (
            <tr>
                <th scope="row" style={{ textAlign: 'left' }}>
                    <a
                        className="problinkdata"
                        href={problem.Link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {problem.Name}
                    </a>
                </th>
                <td>
                    <button
                        type="button"
                        className={problem.Difficulty}
                        style={{ color: 'white' }}
                        disabled
                    >
                        {problem.Difficulty}
                    </button>
                </td>
                <td>{this.sol}</td>
                <td>{this.txt}</td>
                <td>{this.contributors}</td>
                <td>{this.sessions}</td>
                <td>{this.categories}</td>
                <td>
                    <Button
                        onClick={() => {
                            this.toggle(2);
                        }}
                        style={{
                            color: 'white',
                            borderRadius: '50%',
                            fontSize: '14px',
                        }}
                    >
                        +
                    </Button>
                </td>
                <td>{this.edit}</td>

                {/* View Solution Code Modal */}
                <Modal
                    size="lg"
                    show={modal[0]}
                    onHide={() => {
                        this.toggle(0);
                    }}
                >
                    <Modal.Header closeButton>{problem.Solution}</Modal.Header>
                    <Modal.Body>{this.code}</Modal.Body>
                </Modal>

                {/* Problem Notes Modal */}
                <Modal
                    size="lg"
                    show={modal[1]}
                    onHide={() => {
                        this.toggle(1);
                    }}
                >
                    <Modal.Header closeButton>
                        {problem.Contributor.map((name, index) => {
                            if (index) return `, ${name}`;
                            return name;
                        })}
                    </Modal.Header>
                    <Modal.Body>{problem.Note}</Modal.Body>
                </Modal>

                {/* Add Problem to Session Modal */}
                <Modal
                    show={modal[2]}
                    onHide={() => {
                        this.toggle(2);
                    }}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{problem.Name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table>
                            <tbody>
                                <tr>
                                    <th>Difficulty</th>
                                    <td>{problem.Difficulty}</td>
                                </tr>
                                <tr>
                                    <th>Contributor</th>
                                    <td>{this.contributors}</td>
                                </tr>
                                <tr>
                                    <th>Solution</th>
                                    <td>{this.avail}</td>
                                </tr>
                                <tr>
                                    <th>Quarter</th>
                                    <td>{this.boardQuarter}</td>
                                </tr>
                                <tr>
                                    <th>
                                        <Form.Label>Week</Form.Label>
                                    </th>
                                    <td>
                                        <Form.Select
                                            value={this.state.week}
                                            onChange={(evt) =>
                                                this.updateInputValue(evt)
                                            }
                                            name="select"
                                            id="Week"
                                        >
                                            {this.allweeks}
                                        </Form.Select>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <Form.Label>Session</Form.Label>
                                    </th>
                                    <td>
                                        <Form.Select
                                            value={this.state.session}
                                            onChange={(evt) =>
                                                this.updateInputValue(evt)
                                            }
                                            id="Session"
                                        >
                                            {this.allsessions}
                                        </Form.Select>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        {this.msg}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                this.toggle(2);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={this.setProblem}>
                            Set
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Edit Modal */}
                <Modal
                    size="lg"
                    show={modal[3]}
                    onHide={() => {
                        this.toggle(3);
                    }}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit</Modal.Title>
                    </Modal.Header>
                    <Submit
                        week={this.wk}
                        quarter={this.qrt}
                        owner={this.owner}
                        session={this.session}
                        data={problem}
                        x={this.x}
                    />
                </Modal>

                {/* Remove Session Modal */}
                <Modal
                    size="sm"
                    show={modal[4]}
                    onHide={() => {
                        this.toggle(4);
                    }}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Remove Session?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.msg2 === null
                            ? 'This action cannot be undone!'
                            : this.msg2}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                this.toggle(4);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => {
                                this.remove();
                            }}
                        >
                            Remove
                        </Button>
                    </Modal.Footer>
                </Modal>
            </tr>
        );
    }
}

Entry.propTypes = {
    data: PropTypes.object.isRequired,
    boardQuarter: PropTypes.string.isRequired,
    boardQuarterInd: PropTypes.number.isRequired,
    session: PropTypes.number.isRequired,
    wk: PropTypes.number.isRequired,
    qrtIndex: PropTypes.number.isRequired,
    owner: PropTypes.string.isRequired,
    x: PropTypes.string.isRequired,
};
