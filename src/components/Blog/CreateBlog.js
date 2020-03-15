import React from 'react';

import { FormGroup, Input } from 'reactstrap';
import { ButtonGroup, Button, Tooltip } from '@material-ui/core';
import {
    FormatBold,
    FormatItalic,
    FormatListBulleted,
    FormatListNumbered,
    InsertPhoto,
    InsertLink,
    KeyboardTab,
    Title
} from '@material-ui/icons';

export default function CreateBlog(props) {
    const wrap = (pattern, adjustCursor) => {
        const editor = document.getElementById('editor');
        editor.focus();
        let start = editor.selectionStart;
        let end = editor.selectionEnd;
        let text = editor.value.slice(start, end);
        let toInsert = pattern.replace(/%Text%/g, text);
        editor.value =
            editor.value.slice(0, start) + toInsert + editor.value.slice(end);
        editor.selectionStart = start + adjustCursor;
        editor.selectionEnd = end + adjustCursor;
        props.setPostData(null, editor.value);
    };

    const insert = (s, atFront) => {
        const editor = document.getElementById('editor');
        editor.focus();
        let start = editor.selectionStart;
        let end = editor.selectionEnd;
        let insertAt = atFront
            ? Math.max(0, editor.value.lastIndexOf('\n', start - 1) + 1)
            : start;
        editor.value =
            editor.value.slice(0, insertAt) + s + editor.value.slice(insertAt);
        editor.selectionStart = start + s.length;
        editor.selectionEnd = end + s.length;
        props.setPostData(null, editor.value);
    };

    const indent = () => {
        const editor = document.getElementById('editor');
        editor.focus();
        let start = editor.selectionStart;
        let end = editor.selectionEnd;
        let lineStart = Math.max(
            0,
            editor.value.lastIndexOf('\n', start - 1) + 1
        );
        let moveBy = 4 - ((start - lineStart + 4) % 4);
        editor.value =
            editor.value.slice(0, start) +
            ' '.repeat(moveBy) +
            editor.value.slice(end);
        editor.selectionStart = start + moveBy;
        editor.selectionEnd = end + moveBy;
    };

    return (
        <React.Fragment>
            <FormGroup row>
                <ButtonGroup
                    variant="contained"
                    color="primary"
                    aria-label="contained primary button group"
                    className="mx-3">
                    <Tooltip title="Header">
                        <Button onClick={e => insert('# ', true)}>
                            <Title />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Bold">
                        <Button onClick={e => wrap('**%Text%**', 2)}>
                            <FormatBold />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Italics">
                        <Button onClick={e => wrap('*%Text%*', 1)}>
                            <FormatItalic />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Indent">
                        <Button onClick={e => indent()}>
                            <KeyboardTab />
                        </Button>
                    </Tooltip>
                </ButtonGroup>

                <ButtonGroup
                    variant="contained"
                    color="primary"
                    aria-label="contained primary button group"
                    className="mx-3">
                    <Tooltip title="Bullet List">
                        <Button onClick={e => insert('* ', true)}>
                            <FormatListBulleted />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Numbered List">
                        <Button onClick={e => insert('1. ', true)}>
                            <FormatListNumbered />
                        </Button>
                    </Tooltip>
                </ButtonGroup>
                <ButtonGroup
                    variant="contained"
                    color="primary"
                    aria-label="contained primary button group"
                    className="mx-3">
                    <Tooltip title="Insert Photo">
                        <Button
                            onClick={e =>
                                wrap('![Description](%IMG_PATH%%Text%)')
                            }>
                            <InsertPhoto />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Insert Link">
                        <Button
                            onClick={e => wrap('[%Text%](%BASE_URL%%Text%)')}>
                            <InsertLink />
                        </Button>
                    </Tooltip>
                </ButtonGroup>
            </FormGroup>

            <FormGroup row>
                <Input
                    type="textarea"
                    id="editor"
                    style={{ fontFamily: '"Courier New", monospaced' }}
                    onChange={e => props.setPostData(null, e.target.value)}
                />
            </FormGroup>
        </React.Fragment>
    );
}
