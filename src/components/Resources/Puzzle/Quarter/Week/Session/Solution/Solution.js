import React, { Component } from 'react';
import {
    Alert,
    Col,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Row
} from 'reactstrap';
import './Solution.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNight } from 'react-syntax-highlighter/dist/styles/hljs';
import fblogo from '../../../../../../../img/fb.png';
import processCon from '../processCon.js';

const Python = codeString => (
    <SyntaxHighlighter key="mycode" language="python" style={tomorrowNight}>
        {codeString}
    </SyntaxHighlighter>
);

const Cpp = codeString => (
    <SyntaxHighlighter key="mycode" language="cpp" style={tomorrowNight}>
        {codeString}
    </SyntaxHighlighter>
);

export default class Solution extends Component {
    constructor(props) {
        super(props);
        this.show = props.sol;
        this.state = {
            modal: false,
            collapse: false
        };

        this.toggle = this.toggle.bind(this);
        this.setCode = this.setCode.bind(this);
        this.type = props.link.split('.');
        this.type = this.type[this.type.length - 1];
        this.link = props.link;
        this.conName = props.conName.split(' ')[0];
        this.txt = props.txt;
        this.code = [];
        this.notes = [];
        var notes = props.note.split(/\n+/);
        for (var i = 0; i < notes.length; i++) {
            if (notes[i] !== '') {
                this.notes.push(
                    <Alert
                        color="light"
                        style={{ borderLeft: '3px solid black' }}
                        key={i}>
                        {notes[i]}
                    </Alert>
                );
            }
        }
    }

    componentDidMount() {
        const fb = processCon(this.props.con);
        if (this.con === '') {
            this.conName = ' Any Board Member';
        }
        this.link = `Ask ${this.conName} for help`;

        if (this.props.note === '') {
            this.code.push(
                <div
                    style={{ marginBottom: '20px' }}
                    className="center"
                    key="contrib">
                    <Row
                        style={{
                            objectFit: 'contain'
                        }}>
                        <img
                            alt={`${this.con}'s`}
                            className="pc"
                            src={fb[1]}
                            style={{
                                width: '100%'
                            }}
                        />
                    </Row>
                    <a href={fb[0]} target="_blank" rel="noopener noreferrer">
                        <img alt="facebook link" className="fb" src={fblogo} />
                    </a>
                </div>
            );
        } else {
            this.code.push(
                <div style={{ marginBottom: '20px' }} key={'withnotes'}>
                    <Row className="center">
                        <Col style={{ width: '50%' }}>
                            <Row className="center">
                                <div
                                    style={{
                                        objectFit: 'contain'
                                    }}>
                                    <img
                                        alt={`${this.con}'s`}
                                        src={fb[1]}
                                        style={{
                                            width: '100%'
                                        }}
                                    />
                                </div>
                            </Row>
                        </Col>
                        <Col style={{ textAlign: 'left' }}>{this.notes}</Col>
                    </Row>
                    <Row className="center">
                        <a
                            href={fb[0]}
                            target="_blank"
                            rel="noopener noreferrer">
                            <img
                                alt="facebook link"
                                className="fb"
                                src={fblogo}
                            />
                        </a>
                    </Row>
                </div>
            );
        }
        if (this.props.link !== '') {
            this.setCode(this.props.code);
        }
    }

    setCode(data) {
        if (this.type === 'py') {
            this.code.push(Python(data));
        } else {
            this.code.push(Cpp(data));
        }
        this.togglevis();
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    togglevis() {
        this.setState({ collapse: !this.state.collapse });
    }

    render() {
        return (
            <div>
                <Button className="btn-sol" onClick={this.toggle}>
                    {this.txt}
                </Button>
                <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>{this.link}</ModalHeader>
                    <ModalBody>{this.code}</ModalBody>
                </Modal>
            </div>
        );
    }
}
