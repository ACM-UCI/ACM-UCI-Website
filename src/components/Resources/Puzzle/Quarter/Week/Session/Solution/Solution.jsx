import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Col, Button, Modal, Row } from 'react-bootstrap';
import './Solution.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Python(codeString) {
    return (
        <SyntaxHighlighter key="mycode" language="python" style={tomorrowNight}>
            {codeString}
        </SyntaxHighlighter>
    );
}

function Cpp(codeString) {
    return (
        <SyntaxHighlighter key="mycode" language="cpp" style={tomorrowNight}>
            {codeString}
        </SyntaxHighlighter>
    );
}

export default class Solution extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            collapse: false,
        };

        this.toggle = this.toggle.bind(this);
        this.setCode = this.setCode.bind(this);
        this.type = props.link.split('.');
        this.type = this.type[this.type.length - 1];
        this.link = props.link;
        this.txt = props.txt;
        this.code = [];
        this.notes = [];
        const notes = props.note.split(/\n+/);
        for (let i = 0; i < notes.length; i++) {
            if (notes[i] !== '') {
                this.notes.push(
                    <Alert
                        color="light"
                        style={{ borderLeft: '3px solid black' }}
                        key={i}
                    >
                        {notes[i]}
                    </Alert>
                );
            }
        }
    }

    componentDidMount() {
        const { conName, txt, note, contributors, code, link } = this.props;
        this.link = `Ask${conName} for help`;
        if (txt === 'Take Poll')
            this.link = `${conName} is interested in what you think!`;

        if (note === '') {
            this.code.push(
                <div style={{ marginBottom: '20px' }} key="contrib">
                    {contributors}
                </div>
            );
        } else {
            this.code.push(
                <div style={{ marginBottom: '20px' }} key="withnotes">
                    <Row className="center">
                        <Col style={{ width: '50%' }}>{contributors}</Col>
                        <Col style={{ textAlign: 'left' }}>{this.notes}</Col>
                    </Row>
                </div>
            );
        }
        if (link !== '') {
            this.setCode(code);
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
        this.setState((prevState) => ({ modal: !prevState.modal }));
    }

    togglevis() {
        this.setState((prevState) => ({ collapse: !prevState.collapse }));
    }

    render() {
        const { onClick } = this.props;
        const { modal } = this.state;
        return (
            <div>
                <Button
                    className="btn-sol btn-secondary"
                    onClick={() => {
                        this.toggle();
                        onClick();
                    }}
                >
                    {this.txt}
                </Button>
                <Modal size="lg" show={this.state.modal} onHide={this.toggle}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.link}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.code}</Modal.Body>
                </Modal>
            </div>
        );
    }
}

Solution.propTypes = {
    link: PropTypes.string.isRequired,
    txt: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
    conName: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    contributors: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};
