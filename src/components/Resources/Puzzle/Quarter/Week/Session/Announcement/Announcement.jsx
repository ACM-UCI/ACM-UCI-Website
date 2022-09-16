import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Alert,
    Button,
    Row,
    Modal,
    ModalHeader,
    ModalBody,
} from 'react-bootstrap';
import './Announcement.css';
import processCon from '../processCon';
import fblogo from '../../../../../../../img/fb.png';

export default class Announcement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
        };
        this.toggle = this.toggle.bind(this);
        this.name = props.name;
        this.desc = props.desc;
        this.con = props.con;
        this.conName = props.conName;
        this.fb = processCon(this.con);
        if (this.con !== '') {
            this.con = (
                <Button
                    onClick={this.toggle}
                    style={{
                        marginLeft: '1%',
                        height: '30%',
                        fontSize: '10px',
                        color: 'white',
                    }}
                >
                    {this.conName.split(' ')[0]}
                </Button>
            );
        }
    }

    toggle() {
        this.setState((prevState) => ({ modal: !prevState.modal }));
    }

    render() {
        const { modal } = this.state;
        return (
            <div>
                <Alert color="dark">
                    {this.name}:{this.desc} {this.con}
                </Alert>
                <Modal size="lg" isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        {this.conName}
                    </ModalHeader>
                    <ModalBody>
                        <Row className="center">
                            <img
                                alt={`${this.con}'s`}
                                className="pc"
                                src={this.fb[1]}
                            />
                        </Row>
                        <Row className="center">
                            <a
                                href={this.fb[0]}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    alt="facebook link"
                                    className="fb"
                                    src={fblogo}
                                />
                            </a>
                        </Row>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

Announcement.propTypes = {
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    con: PropTypes.string.isRequired,
    conName: PropTypes.string.isRequired,
};
