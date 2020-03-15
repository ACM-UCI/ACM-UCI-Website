import React, { Component } from 'react';

import Navigation from '../Navbar/Navbar';
import Banner from '../Banner/Banner';
import UploadBlog from './UploadBlog';
import CreateBlog from './CreateBlog';

import firebase from '../../Firebase';
import {
    Form,
    FormGroup,
    FormText,
    Label,
    Input,
    Button,
    Col,
    Alert,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import ReactMarkdown from 'react-markdown';
import {
    Paper,
    Tabs,
    Tab,
    Box,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Typography
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import { Redirect, Link } from 'react-router-dom';

import { ImageRenderer, DescriptionLink } from './BlogMarkdownRenderers';
import { addAuthListener } from '../Login/Auth';

import default_image from '../../img/acm.jpg';
const IMG_PATH = require.context('../../img', true);

/**
 * Helper component for the tab selection between creating and uploading posts.
 */
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

/**
 * Defines the UI for creating/uploading new blog posts.
 */
export default class SubmitBlog extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.submit = this.submit.bind(this);
        this.verifyImage = this.verifyImage.bind(this);
        this.setPostData = this.setPostData.bind(this);

        this.state = {
            curTab: 0,
            displayImage: null,
            imgName: null,
            postData: null,
            errorMsg: null,
            author: null,
            postTitle: null,
            pageTitle: null,
            redirect: false,
            authenticated: false,
            success: false,
            displayModal: false
        };

        addAuthListener(u =>
            this.setState({ authenticated: u !== null, redirect: u === null })
        );
    }

    /**
     * Toggles the TabPanel being displayed
     * @param {*} event
     * @param {*} newTab - if 0: Create; else if 1: upload
     */
    toggle(event, newTab) {
        this.setState({ curTab: newTab });
    }

    /**
     * Given the post to be created, adds new post to the firebase database.
     * @param {Event} e - The post to be created. Of form {author, post_title, page_title, image_uri, description}
     */
    submit(e) {
        e.preventDefault();

        // Collect Data
        const {
            author,
            postTitle,
            pageTitle,
            displayImage,
            imgName,
            postData
        } = this.state;

        let errors = [];
        // Verify Data
        if (author === null || author.trim().length === 0) {
            errors.push('Author must be set');
        }
        if (postTitle === null || postTitle.trim().length === 0) {
            errors.push('Post title must be set');
        }
        if (pageTitle === null || pageTitle.trim().length === 0) {
            errors.push('Page title must be set');
        }
        if (displayImage === null || displayImage.trim().length === 0) {
            errors.push('Display image must be set');
        }

        if (errors.length > 0) {
            this.setState({ errorMsg: errors.join(', ') });
            return;
        } else {
            let d = new Date();
            let day = d.getDate();
            let month = d.getMonth() + 1;
            let year = d.getFullYear();

            const dbRef = firebase
                .database()
                .ref('/blogs/' + pageTitle.toLowerCase().replace(/ /g, '-'));
            dbRef.set(
                {
                    author: author,
                    description: postData,
                    img: imgName,
                    page_title: pageTitle,
                    title: postTitle,
                    day: day,
                    month: month,
                    year: year
                },
                error => {
                    if (error !== null && error.code === 'PERMISSION_DENIED') {
                        console.log('Trying to hack? I think not!');
                        this.setState({ redirect: true });
                    } else if (error !== null) {
                        this.setState({ errorMsg: 'Something went wrong' });
                    } else {
                        // No Error
                        document.getElementById('post-form').reset();

                        this.setState({
                            success: true,
                            displayImage: null,
                            postData: null,
                            displayModal: true
                        });
                    }
                }
            );
        }
    }

    /**
     * Verifies that the provided image filename is a valid image.
     * @param {*} filename - The filename of the image
     */
    verifyImage(filename) {
        try {
            let imageURI = IMG_PATH(`./${filename}`);
            this.setState({
                displayImage: imageURI,
                imgName: filename
            });
        } catch (e) {
            this.setState({
                displayImage: null,
                imgName: null
            });
        }
    }

    /**
     * Sets the body of the post to be rendered by preview & to be saved in database.
     * @param {*} data - A string in markdown syntax containing the body of the post.
     */
    setPostData(errors, data) {
        this.setState({
            postData: data,
            errorMsg: errors
        });
    }

    render() {
        // Redirect if unauthorized
        if (this.state.redirect) {
            return <Redirect to="/blog" />;
        } else if (!this.state.authenticated) {
            // still loading account
            return (
                <Alert
                    className="med m"
                    transition={{ in: true, timeout: 100 }}>
                    Fetching Data :3
                </Alert>
            );
        }

        // Extract State
        let {
            curTab,
            displayImage,
            postData,
            errorMsg,
            success,
            pageTitle,
            displayModal
        } = this.state;
        return (
            <React.Fragment>
                <Navigation />
                <Banner lead="Blogs" leadSub="History in the Making" />
                <Container>
                    <Paper>
                        <Tabs
                            value={curTab}
                            onChange={this.toggle}
                            indicatorColor="primary"
                            textColor="primary"
                            centered>
                            <Tab label="Create" />
                            <Tab label="Upload" />
                        </Tabs>
                    </Paper>
                    <Container className="shadow-lg p-3">
                        <Form onSubmit={this.submit} id="post-form">
                            <FormGroup row>
                                <Label for="post-author" sm={2}>
                                    Author
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="text"
                                        name="post-author"
                                        id="post-author"
                                        onChange={e =>
                                            this.setState({
                                                author: e.target.value
                                            })
                                        }
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="post-title" sm={2}>
                                    Post Title
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="text"
                                        name="post-title"
                                        id="post-title"
                                        onChange={e =>
                                            this.setState({
                                                postTitle: e.target.value
                                            })
                                        }
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="page-title" sm={2}>
                                    Page Title
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="text"
                                        name="page-title"
                                        id="page-title"
                                        onChange={e =>
                                            this.setState({
                                                pageTitle: e.target.value
                                            })
                                        }
                                    />
                                    <FormText>Keep it short & sweet</FormText>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="page-title" sm={2}>
                                    Display Image
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="text"
                                        name="page-title"
                                        id="page-title"
                                        onChange={e =>
                                            this.verifyImage(e.target.value)
                                        }
                                    />
                                    <FormText>
                                        Image must exist in website
                                    </FormText>
                                    {/* If a valid image display it below input field */}
                                    {displayImage !== null && (
                                        <img
                                            src={displayImage}
                                            className="w-50"
                                            alt="display-img"
                                        />
                                    )}
                                </Col>
                            </FormGroup>
                            <TabPanel value={curTab} index={0}>
                                <CreateBlog setPostData={this.setPostData} />
                            </TabPanel>
                            <TabPanel value={curTab} index={1}>
                                <UploadBlog setPostData={this.setPostData} />
                            </TabPanel>
                            <FormGroup>
                                <Button
                                    type="submit"
                                    form="post-form"
                                    value="Post">
                                    Post
                                </Button>
                            </FormGroup>
                            {errorMsg !== null && (
                                <Alert color="danger">{errorMsg}</Alert>
                            )}
                            {success && errorMsg === null && (
                                // <Alert color="success">Blog Post Submitted</Alert>
                                <Modal
                                    isOpen={displayModal}
                                    toggle={e =>
                                        this.setState({
                                            displayModal: !displayModal
                                        })
                                    }>
                                    <ModalHeader>Success</ModalHeader>
                                    <ModalBody>
                                        Blog post successfully submitted
                                    </ModalBody>
                                    <ModalFooter>
                                        <Link
                                            to={`/blog/${pageTitle
                                                .toLowerCase()
                                                .replace(/ /g, '-')}`}>
                                            <Button>View It</Button>
                                        </Link>
                                    </ModalFooter>
                                </Modal>
                            )}
                        </Form>

                        {/* display post description preview */}
                        {postData !== null && (
                            <ExpansionPanel className="shadow-lg">
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header">
                                    <Typography>Preview</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <ReactMarkdown
                                        source={postData}
                                        transformImageUri={uri => {
                                            if (uri.match(/%IMG_PATH%/)) {
                                                try {
                                                    return IMG_PATH(
                                                        uri.replace(
                                                            /%IMG_PATH%/,
                                                            './'
                                                        )
                                                    );
                                                } catch (e) {
                                                    return default_image;
                                                }
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
                                                    process.env.PUBLIC_URL + '/'
                                                );
                                            } else {
                                                return uri;
                                            }
                                        }}
                                        renderers={{
                                            image: ImageRenderer,
                                            link: DescriptionLink
                                        }}
                                        className="py-3"
                                    />
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        )}
                    </Container>
                </Container>
            </React.Fragment>
        );
    }
}
