import React from 'react';

import { FormGroup, FormText, Label, Input, Col } from 'react-bootstrap';

/**
 * Form for uploading blog posts as markdown files. Is one of the two blog post options on SubmitBlog.js.
 */
export default function UploadBlog(props) {
    /**
     * Verifies that the uploaded file conforms with requirements
     * @param {*} file - File object that is to be uploaded.
     */
    const verifyUpload = (file) => {
        if (!file.name.endsWith('.md')) {
            props.setPostData('File must have extension .md', null);
        } else {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                props.setPostData(null, e.target.result);
            };
            fileReader.onerror = (e) => {
                props.setPostData('An unknown error occured', null);
            };
            fileReader.readAsText(file);
        }
    };

    return (
        <FormGroup row className="mx-0">
            <Label for="file-upload" sm={2}>
                Upload File (.md)
            </Label>
            <Col sm={10}>
                <Input
                    type="file"
                    name="file-upload"
                    id="file-upload"
                    onChange={(e) => verifyUpload(e.target.files[0])}
                />
                <FormText>
                    File must be a text file (.md extenstion) with markdown
                    formatting.
                </FormText>
            </Col>
        </FormGroup>
    );
}
