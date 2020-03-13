import React from 'react';

import { HashLink as Link } from 'react-router-hash-link';

import { Col } from 'reactstrap';

/**
 * Defines rendering components to be used by React Markdown.
 */

// Rendering Component for all links in the description
export function DescriptionLink(props) {
    return (
        <Link
            className="blog-post-description-link"
            to={props.href}
            {...props}
        />
    );
}

// Rendering Component for all images in the description
export function ImageRenderer(props) {
    return (
        <Col
            style={{
                textAlign: 'center'
            }}>
            <img className="blog-img" alt={props.alt} {...props} />
            <i>{props.alt}</i>
        </Col>
    );
}
