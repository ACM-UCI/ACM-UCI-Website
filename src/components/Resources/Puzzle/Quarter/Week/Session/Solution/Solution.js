import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Row,
    Container
} from 'reactstrap';
import './Solution.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNight } from 'react-syntax-highlighter/dist/styles/hljs';
import fblogo from '../../../../../../../img/fb.png';
import processCon from '../processCon.js';

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
        this.con = props.con;
        this.txt = props.txt;
        this.code = null;
    }

    componentDidMount() {
        if (this.props.code === '') {
            const fb = processCon(this.props.con);
            if (this.con === '') {
                this.con = ' Any Board Member';
            }
            this.link = `Bother ${this.con}`;
            this.code = (
                <Container>
                    <Row className="center">
                        <img alt={`${this.con}'s`} className="pc" src={fb[1]} />
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
                </Container>
            );
        } else {
            this.setCode(this.props.code);
            this.link = this.props.link;
        }
    }

    setCode(data) {
        if (this.type === 'py') {
            this.code = Python(data);
        } else {
            this.code = Cpp(data);
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
