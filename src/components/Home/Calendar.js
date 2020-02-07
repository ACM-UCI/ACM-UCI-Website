import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import './Calendar.css';

export default class Calendar extends Component {
    render() {
        return (
            <Paper className="calendar" elevation={3}>
                <h4 style={{ marginBottom: '0' }}>{this.props.month}</h4>
                <h4>{this.props.date}</h4>
                <a href={this.props.link} target="_blank">
                    {this.props.event}
                </a>
            </Paper>
        );
    }
}
