import React, { Component } from 'react';
import { Col, Card, CardBody, CardTitle } from 'reactstrap';
import './Problem.css';
import Solution from '../Solution/Solution';
import processCon from '../processCon.js';

export default class Problem extends Component {
    constructor(props) {
        super(props);
        this.solution = null;
        if (
            props.diff === 'easy' ||
            props.diff === 'med' ||
            props.diff === 'hard' ||
            props.diff === 'icpc' ||
            props.diff === 'codealong' ||
            props.diff === 'event'
        ) {
            var txt = props.txt;
            if (props.diff === 'event') {
                txt = 'Info';
            }
            this.solution = (
                <Solution
                    txt={txt}
                    week={props.week}
                    link={props.slink}
                    quarter={props.quarter}
                    con={props.con}
                    conName={props.conName}
                    code={props.code}
                    note={props.note}
                />
            );
        }
        this.link = props.link;
        this.obj = <CardTitle>{props.name}</CardTitle>;
        if (
            props.diff === 'easy' ||
            props.diff === 'med' ||
            props.diff === 'hard' ||
            props.diff === 'icpc' ||
            props.diff === 'codealong' ||
            props.diff === 'event'
        ) {
            if (props.link === '') {
                this.link = processCon(props.con)[0];
            }
            this.obj = (
                <a
                    className={`minh word ${this.props.diff}`}
                    href={this.link}
                    target="_blank"
                    rel="noopener noreferrer">
                    {this.obj}
                </a>
            );
        }

        if (props.evnt !== 'yes') {
            this.diff = props.diff + ' probcard minh';
        } else {
            this.diff = props.diff + ' evntcard minh';
        }
    }

    render() {
        return (
            <Card className={this.diff}>
                <CardBody>
                    <Col>
                        {this.obj}
                        {this.solution}
                    </Col>
                </CardBody>
            </Card>
        );
    }
}
