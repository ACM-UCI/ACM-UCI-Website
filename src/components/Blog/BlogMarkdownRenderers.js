import React from 'react';

import { Col } from 'reactstrap';

/**
 * Defines rendering components to be used by React Markdown.
 */

// Rendering Component for all links in the description
export function DescriptionLink(props) {
    console.log(props);
    return (
        <a className="blog-post-description-link" href={props.href} {...props}>
            {props.children}
        </a>
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
