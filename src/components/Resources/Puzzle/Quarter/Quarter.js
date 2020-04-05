import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Week from './Week/Week';
import './Quarter.css';
import config from '../../../config';

export default class Quarter extends Component {
    constructor(props) {
        super(props);
        this.weeks = [];

        const last_week = (
            <Week
                key={props.week}
                week={props.week}
                quarter={props.quarter}
                session={props.session}
                data={props.data}
            />
        );
        if (last_week != null) {
            this.weeks.push(last_week);
        }

        for (let i = props.week - 1; i > 0; i--) {
            const week = (
                <Week
                    key={i}
                    week={i}
                    quarter={props.quarter}
                    session={config.meetings[props.quarterIndex].length + 1}
                    data={props.data}
                />
            );
            if (week != null) {
                this.weeks.push(week);
            }
        }
    }

    render() {
        if (this.weeks.length === 0) {
            return null;
        }
        return <Container>{this.weeks}</Container>;
    }
}
