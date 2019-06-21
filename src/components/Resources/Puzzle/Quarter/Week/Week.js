import React, { Component } from 'react';
import { Container, Collapse, Button } from 'reactstrap';
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
            <Container>
                <Button
                    className="b"
                    onClick={this.toggle}
                    style={{
                        marginTop: '1rem',
                        width: '100%',
                        height: '30%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: '1rem',
                        fontSize: '26px'
                    }}>
                    Week {this.week + ' '}{' '}
                    <img style={{ height: '10px' }} src={src} alt="" />
                </Button>

                <Collapse className="marpad" isOpen={this.state.collapse}>
                    {this.sessions}
                </Collapse>
            </Container>
        );
    }
}
