import React from 'react';
import PropTypes from 'prop-types';
import './Resource.css';

export default function Resource({ title, description }) {
    return (
        <div className="resource-jumbotron mt-4 mb-0">
            <h3 className="resource-header">{title}</h3>
            <p className="lead-sub">{description}</p>
        </div>
    );
}

Resource.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};
