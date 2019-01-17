import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Week from './Week/Week';
import './Quarter.css';

export default class Quarter extends Component {
    constructor(props) {
        super(props);
        this.weeks = [];

        for (let i = 1; i <= props.week - 1; i++) {
            const week = (
                <Week
                    key={i}
                    week={i.toString()}
                    quarter={props.quarter}
                    session={3}
                />
            );
            if (week != null) {
                this.weeks.push(week);
            }
        }

        const last_week = (
            <Week
                key={props.week}
                week={props.week.toString()}
                quarter={props.quarter}
                session={props.session}
            />
        );
        if (last_week != null) {
            this.weeks.push(last_week);
        }
    }

    render() {
        if (this.weeks.length === 0) {
            return null;
        }
        return <Container>{this.weeks}</Container>;
    }
}
