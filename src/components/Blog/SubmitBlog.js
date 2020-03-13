import React, { Component } from 'react';

import Navigation from '../Navbar/Navbar';
import Banner from '../Banner/Banner';
import UploadBlog from './UploadBlog';

import {
    Form,
    FormGroup,
    FormText,
    Label,
    Input,
    Button,
    Col,
    Alert,
    Container
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

import { ImageRenderer, DescriptionLink } from './BlogMarkdownRenderers';

import default_image from '../../img/acm.jpg';
const IMG_PATH = require.context('../../img', true);

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
            postData: null,
            errorMsg: null
        };
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
     * @param {*} postObj - The post to be created. Of form {author, post_title, page_title, image_uri, description}
     */
    submit(postObj) {}

    /**
     * Verifies that the provided image filename is a valid image.
     * @param {*} filename - The filename of the image
     */
    verifyImage(filename) {
        try {
            let imageURI = IMG_PATH(`./${filename}`);
            this.setState({ displayImage: imageURI });
        } catch (e) {
            this.setState({ displayImage: null });
        }
    }

    setPostData(errors, data) {
        this.setState({
            postData: data,
            errorMsg: errors
        });
    }

    componentWillMount() {}

    render() {
        // Extract State
        let { curTab, displayImage, postData, errorMsg } = this.state;
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
                        <Form onSubmit={e => console.log(e)} id="post-form">
                            <FormGroup row>
                                <Label for="post-author" sm={2}>
                                    Author
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="text"
                                        name="post-author"
                                        id="post-author"
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
                                Item One
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
