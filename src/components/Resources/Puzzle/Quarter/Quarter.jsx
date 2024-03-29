import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Accordion } from 'react-bootstrap';
import Week from './Week/Week';
import './Quarter.css';
import config from '../../../config';

export default class Quarter extends Component {
    constructor(props) {
        super(props);
        this.weeks = [];
        this.currWeek = props.week;

        const lastWeek = (
            <Week
                key={props.week}
                week={props.week}
                quarter={props.quarter}
                session={props.session}
                data={props.data}
            />
        );
        if (lastWeek != null) {
            this.weeks.push(lastWeek);
        }

        for (let i = props.week - 1; i > 0; i--) {
            const week = (
                <Week
                    eventKey={i}
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
        return (
            <Accordion className="marpad" defaultActiveKey={this.currWeek}>
                {this.weeks}
            </Accordion>
        );
    }
}

Quarter.propTypes = {
    week: PropTypes.number.isRequired,
    quarter: PropTypes.string.isRequired,
    session: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
    quarterIndex: PropTypes.number.isRequired,
};
