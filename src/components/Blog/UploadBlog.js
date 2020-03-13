import React, { useState } from 'react';

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
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Typography
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

import { ImageRenderer, DescriptionLink } from './BlogMarkdownRenderers';

const IMG_PATH = require.context('../../img', true);

/**
 * Callback function for the form submission
 * @param {Event} e - The event object passed by the event listener
 */
function submitPost(e) {
    e.preventDefault();
    console.log(e.target);
}

/**
 * Form for uploading blog posts as markdown files. Is one of the two blog post options on SubmitBlog.js.
 */
export default function UploadBlog() {
    const [errorMsg, setError] = useState(null);
    const [postData, setPost] = useState(null);

    const verifyUpload = file => {
        if (!file.name.endsWith('.md')) {
            setError('File must have extension .md');
            setPost(null);
        } else {
            const fileReader = new FileReader();
            fileReader.onload = e => {
                setError(null);
                setPost(e.target.result);
            };
            fileReader.onerror = e => {
                setError('An unknown error occured');
                setPost(null);
            };
            fileReader.readAsText(file);
        }
    };

    return (
        <Container>
            <Form onSubmit={submitPost} id="upload-form">
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
                        <Input type="text" name="post-title" id="post-title" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="page-title" sm={2}>
                        Page Title
                    </Label>
                    <Col sm={10}>
                        <Input type="text" name="page-title" id="page-title" />
                        <FormText>Keep it short & sweet</FormText>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="file-upload" sm={2}>
                        Upload File (.md)
                    </Label>
                    <Col sm={10}>
                        <Input
                            type="file"
                            name="file-upload"
                            id="file-upload"
                            onChange={e => verifyUpload(e.target.files[0])}
                        />
                        <FormText>
                            File must be a text file (.md extenstion) with
                            markdown formatting.
                        </FormText>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Button type="submit" form="upload-form" value="Upload">
                        Upload
                    </Button>
                </FormGroup>
                {errorMsg !== null && <Alert color="danger">{errorMsg}</Alert>}
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
                                    return IMG_PATH(
                                        uri.replace(/%IMG_PATH%/, './')
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
                            className="py-3"
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            )}
        </Container>
    );
}
