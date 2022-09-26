import React, { Component } from 'react';
import { Container, Accordion, Button } from 'react-bootstrap';
import Session from './Session/Session';
import drop from './drop.png';
import raise from './raise.png';
import './Week.css';

export default class Week extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
        this.week = props.week;
        this.quarter = props.quarter;
        this.session = props.session;
        this.eventKey = props.eventKey;
        this.sessions = [];

        for (let i = 1; i < this.session; i++) {
            this.sessions.push(
                <Session
                    key={i}
                    week={this.week}
                    quarter={this.quarter}
                    session={i}
                    data={props.data}
                />
            );
        }
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    render() {
        if (this.sessions.length === 0) {
            return null;
        }
        var src = drop;
        if (this.state.collapse) {
            src = raise;
        }
        return (
            <Accordion.Item eventKey={this.eventKey}>
                <Accordion.Header>
                    <h3>Week {this.week}</h3>
                </Accordion.Header>
                <Accordion.Body>{this.sessions}</Accordion.Body>
            </Accordion.Item>
        );
    }
}
