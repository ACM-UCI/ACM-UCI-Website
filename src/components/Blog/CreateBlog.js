import React from 'react';

import { FormGroup, Input } from 'reactstrap';
import { TextareaAutosize } from '@material-ui/core';

export default function CreateBlog(props) {
    return (
        <FormGroup row>
            <Input
                type="textarea"
                onChange={e => props.setPostData(null, e.target.value)}
            />
        </FormGroup>
    );
}
