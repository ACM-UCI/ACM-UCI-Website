/**
 * Defines The Blog page where all blog posts can be browsed. Retrieves Blog Posts from database /blogs/ and renders an array of BlogItems
 */

import React, { Component } from 'react';

import { Container, Row, Col } from 'reactstrap';

import Navigation from '../Navbar/Navbar';
import Banner from '../Banner/Banner';
import BlogItem from './BlogItem';

import { database } from 'firebase/app';

import './Blog.css';

class Blog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };

        // Bind Local Function
        this.loadBlogPosts = this.loadBlogPosts.bind(this);
    }

    // Callback for updating this.state.posts after database fetch complete
    loadBlogPosts(firebase_data) {
        this.setState({ posts: Object.entries(firebase_data.val()) });
    }

    componentDidMount() {
        // Retrieve Data from Database
        const ref = database().ref('/blogs');
        ref.once('value').then(this.loadBlogPosts);
    }

    render() {
        // Sort Posts by Date, Oldest First
        this.state.posts.sort((a, b) => {
            let postA = a[1];
            let postB = b[1];
            if (postA.year === postB.year) {
                if (postA.month === postB.month) {
                    return postA.day - postB.day;
                } else {
                    return postA.month - postB.month;
                }
            } else {
                return postA.year - postB.year;
            }
        });

        // Generate BlogItem components
        // TODO when too many posts may need to split among multiple rows
        let blogItems = this.state.posts.map(post => {
            return (
                <Col md="4" key={post[0]}>
                    <BlogItem post={post} />
                </Col>
            );
        });

        return (
            <div>
                <Navigation />
                <Banner lead="Blogs" leadSub="History in the Making" />
                <Container
                    className="event-body"
                    fluid
                    style={{ margin: 0, padding: 0 }}>
                    <div className="pseudo" />
                    <br />
                    <div style={{ margin: '5%' }}>
                        <Row>{blogItems}</Row>
                    </div>
                    <br />
                    <br />
                    <br />
                </Container>
            </div>
        );
    }
}

export default Blog;
