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
import { tomorrowNight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

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
        this.link = `Ask${this.props.conName} for help`;
        if (this.props.txt === 'Take Poll')
            this.link = `${this.props.conName} is interested in what you think!`;

        if (this.props.note === '') {
            this.code.push(
                <div style={{ marginBottom: '20px' }} key="contrib">
                    {this.props.contributors}
                </div>
            );
        } else {
            this.code.push(
                <div style={{ marginBottom: '20px' }} key={'withnotes'}>
                    <Row className="center">
                        <Col style={{ width: '50%' }}>
                            {this.props.contributors}
                        </Col>
                        <Col style={{ textAlign: 'left' }}>{this.notes}</Col>
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
                <Button
                    className="btn-sol"
                    onClick={() => {
                        this.toggle();
                        this.props.onClick();
                    }}>
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
