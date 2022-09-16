import React from 'react';
import PropTypes from 'prop-types';
import './Banner.css';

export default function Banner({ lead, leadSub, imgSrc }) {
    return (
        <div className="text-center mb-0 banner">
            <h2 className="jumbotron-header display-4">{lead}</h2>
            <p className="lead-sub">{leadSub}</p>

            {imgSrc ? (
                <a
                    href="https://www.acm.org/chapters/student-chapter-excellence-awards"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src={imgSrc} alt="2020 Outstanding Website" />
                </a>
            ) : null}
        </div>
    );
}

Banner.propTypes = {
    lead: PropTypes.string.isRequired,
    leadSub: PropTypes.string,
    imgSrc: PropTypes.string,
};

Banner.defaultProps = {
    leadSub: '',
    imgSrc: '',
};
