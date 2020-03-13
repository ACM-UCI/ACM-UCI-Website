/**
 * Defines the rendering of a singular blog post.
 */

import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Container, Col, Card } from 'reactstrap';
import { HashLink as Link } from 'react-router-hash-link';
import { Redirect } from 'react-router-dom';

import Navigation from '../Navbar/Navbar';
import Banner from '../Banner/Banner';

import firebase from '../../Firebase';

import ReactMarkdown from 'react-markdown';
import { DescriptionLink, ImageRenderer } from './BlogMarkdownRenderers';

import './Blog.css';

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
    'Dec'
];

class BlogPageContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.title,
            post: null,
            redirect: false // will be set true when invalid data received from database
        };

        // Bind Local Functions
        this.loadBlogPost = this.loadBlogPost.bind(this);
    }

    loadBlogPost(firebase_data) {
        let data = firebase_data.val();
        if (data !== null) {
            // Replace new line syntax characters with \n string
            if (data.description !== null) {
                data.description = data.description.replace(
                    / *(\n|<br>|<br *\/>) */g,
                    '\n\n'
                );
            }

            this.setState({ post: data });
        } else {
            this.setState({ redirect: true });
        }
    }

    componentDidMount() {
        // Retrieve Data from Database
        const ref = firebase.database().ref(`/blogs/${this.state.title}`);
        ref.once('value').then(this.loadBlogPost);
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/404" />;
        }

        let post = this.state.post;

        return (
            <div>
                <Navigation />
                <Banner lead="Blogs" leadSub="History in the Making" />

                <Container
                    className="event-body"
                    fluid
                    style={{ margin: 0, padding: 0 }}>
                    <div className="psuedo" />
                    <br />
                    <Col
                        id="maincol"
                        style={{
                            maxWidth: '80%',
                            padding: '0',
                            paddingTop: '20px',
                            marginLeft: '10%',
                            marginRight: '0',
                            paddingRight: '0'
                        }}>
                        <Card body className="card-body-blog">
                            {post !== null && (
                                <React.Fragment>
                                    <Breadcrumb listClassName="blogcrumb">
                                        <BreadcrumbItem>
                                            <Link
                                                to="/blog"
                                                style={{ color: '#6DB6E2' }}>
                                                Home
                                            </Link>
                                        </BreadcrumbItem>
                                        <BreadcrumbItem active>
                                            {post.page_title}
                                        </BreadcrumbItem>
                                    </Breadcrumb>

                                    {/* Post Title */}
                                    <div style={{ textAlign: 'center' }}>
                                        <h2>{post.title}</h2>
                                        <i>{`by ${post.author} (${
                                            MONTHS[post.month - 1]
                                        } ${post.day})`}</i>
                                    </div>

                                    <hr className="event-line" />

                                    <div>
                                        {/* Renders description as markdown parsed html */}
                                        <ReactMarkdown
                                            source={post.description}
                                            transformImageUri={uri => {
                                                if (uri.match(/%IMG_PATH%/)) {
                                                    return IMG_PATH(
                                                        uri.replace(
                                                            /%IMG_PATH%/,
                                                            './'
                                                        )
                                                    );
                                                } else {
                                                    return uri;
                                                }
                                            }}
                                            transformLinkUri={uri => {
                                                if (
                                                    uri !== undefined &&
                                                    uri.match(/%BASE_URL%/)
                                                ) {
                                                    return uri.replace(
                                                        /%BASE_URL%/,
                                                        process.env.PUBLIC_URL
                                                    );
                                                } else {
                                                    return uri;
                                                }
                                            }}
                                            renderers={{
                                                image: ImageRenderer,
                                                link: DescriptionLink
                                            }}
                                        />
                                    </div>
                                </React.Fragment>
                            )}
                        </Card>
                    </Col>
                    <br />
                    <br />
                    <br />
                </Container>
            </div>
        );
    }
}

// Allows for handling query parameters
export default function BlogPage(props) {
    return <BlogPageContent title={props.match.params.title} />;
}
