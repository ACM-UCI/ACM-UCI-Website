/**
 * Defines the Card Component displaying a specific Blog.
 * Will be rendered in Blog.js (acm-uci.org/blog)
 */

import React from 'react';

import { NavLink, Card, CardSubtitle, CardImg } from 'react-bootstrap';

import { HashLink as Link } from 'react-router-hash-link';

const IMG_PATH = require.context('../../img', true);
const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

export default function BlogItem(props) {
    let route = props.post[0];
    let post = props.post[1];
    return (
        <NavLink tag={Link} to={'/blog/' + route}>
            <Card className="blogcard">
                <CardImg className="card-img" src={IMG_PATH(`./${post.img}`)} />
                <Card.Body>
                    <Card.Title style={{ fontWeight: 'bold' }}>
                        {post.title}
                    </Card.Title>
                    <CardSubtitle>
                        {`by ${post.author} (${MONTHS[post.month - 1]} ${
                            post.day
                        })`}
                    </CardSubtitle>
                </Card.Body>
            </Card>
        </NavLink>
    );
}
