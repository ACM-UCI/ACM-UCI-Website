import React from 'react';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import './Calendar.css';

export default function Calendar({ month, date, link, event }) {
    return (
        <Paper className="calendar" elevation={3}>
            <h4 style={{ marginBottom: '0' }}>{month}</h4>
            <h4>{date}</h4>
            {event}
        </Paper>
    );
}

Calendar.propTypes = {
    month: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    event: PropTypes.string,
};

Calendar.defaultProps = {
    event: '',
};
