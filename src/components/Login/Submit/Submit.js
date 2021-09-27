import React, { useState, useEffect, useRef } from 'react';
import { Alert, Col, Row, Button, Form, Input, FormText } from 'reactstrap';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import firebase from '../../../Firebase';
import config from '../../config.js';

// TODO - currently in the process of refactoring, still need to handle uploading to firebase

import './Submit.css';

const difficultyTags = {
    difficulties: ['easy', 'med', 'hard', 'icpc', 'codealong', 'presentation'],
    extras: ['event', 'announcement', 'finals', 'thanksgiving', 'poll']
};

function isUnset(val) {
    return val === undefined || val === '';
}

function InputRow(props) {
    const { label, defaultValue, hint, input, id, updateInputValue } = props;
    const style = {
        backgroundColor: 'rgba(109, 181, 226, 0.051)',
        color: '#02284B'
    };

    return (
        <Row>
            <Col className="submitcol">
                <button className="submitlabel" disabled style={style}>
                    {label}
                </button>
            </Col>
            <Col>
                {input === undefined && (
                    <Input
                        defaultValue={defaultValue}
                        placeholder={hint}
                        id={id}
                        onChange={evt => updateInputValue(evt)}
                    />
                )}
                {input !== undefined && input}
            </Col>
        </Row>
    );
}

function SubmitForm(props) {
    const {
        data,
        submission,
        dbData,
        difficultyOptions,
        categories,
        isPresentation,
        filename,
        prompt,
        updateInputValue
    } = props;

    const difficultyInput = (
        <Input
            type="select"
            defaultValue={data.Difficulty}
            id={'Difficulty'}
            onChange={evt => updateInputValue(evt)}>
            <option>Select one</option>
            {difficultyOptions}
        </Input>
    );

    const contributorInput = (
        <Autocomplete
            multiple
            id="tags-filled-contrib"
            options={Object.keys(dbData.logs).sort()}
            defaultValue={submission.Contributor}
            freeSolo={false}
            onChange={(evt, value) => {
                updateInputValue({
                    target: { id: 'Contributor', value: value }
                });
            }}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                    />
                ))
            }
            renderInput={params => (
                <TextField {...params} variant="outlined" fullWidth />
            )}
        />
    );
    const categoryInput = (
        <Autocomplete
            multiple
            id="tags-filled"
            options={categories}
            defaultValue={submission.Category}
            freeSolo
            onChange={(evt, value) => {
                updateInputValue({
                    target: { id: 'Category', value: value }
                });
            }}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                    />
                ))
            }
            renderInput={params => (
                <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Type and press enter to make custom tags"
                    fullWidth
                />
            )}
        />
    );
    const notesInput = (
        <Input
            type="textarea"
            placeholder="Optional. Add hints or clarifications here."
            id="Note"
            onChange={evt => updateInputValue(evt)}
            value={submission.Note}
        />
    );
    const solutionInput = (
        <React.Fragment>
            <Input
                type="file"
                id="File"
                onChange={evt => updateInputValue(evt)}
            />
            {filename}
            <FormText color="muted" style={{ textAlign: 'left' }}>
                You have to submit solutions for your problem!
            </FormText>
        </React.Fragment>
    );

    return (
        <Form className="formsubmit">
            <InputRow
                label={'Problem Name'}
                defaultValue={data.Name}
                hint={"Plz don't make it too long"}
                id={'Name'}
                updateInputValue={updateInputValue}
            />
            <br />
            <InputRow
                label={'Problem Link'}
                defaultValue={data.Link}
                hint={"Don't include addtional queries at the end"}
                id={'Link'}
                updateInputValue={updateInputValue}
            />
            <br />
            <InputRow
                label={'Difficulty'}
                defaultValue={data.Difficulty}
                input={difficultyInput}
            />
            {isPresentation && (
                <React.Fragment>
                    <br />
                    <InputRow
                        label={'Pres Notes Link'}
                        defaultValue={''}
                        hint={'Link supplementary notes here'}
                        id="PresNotes"
                        updateInputValue={updateInputValue}
                    />
                </React.Fragment>
            )}
            <br />
            <InputRow label="Contributors" input={contributorInput} />
            <br />
            <InputRow label="Categories" input={categoryInput} />
            <br />
            <InputRow label="Notes" input={notesInput} />
            <br />
            <InputRow label="Solution" input={solutionInput} />

            <br />

            <Button className="submitbtn">{prompt}</Button>
        </Form>
    );
}

export default function Submit(props) {
    // === Initialization ===
    const { quarter, week, owner, data: problemData } = props;
    const dbData = useRef(null); // data that is retrieved form the firebase db
    const [loaded, setLoaded] = useState(false);
    const [isPresentation, setIsPresentation] = useState(false);

    const isEditMode = !isUnset(problemData.Link);

    // === Field Initialzation ===
    const fields = useRef({
        filename: null,
        difficultyOptions: [],
        categories: [],
        submission: {},
        // Save if problem already exists, Upload if this is an new problem
        prompt: isEditMode ? 'Save' : 'Upload'
    });

    // handleFieldUpdates
    const updateInputValue = e => {
        if (e.target.id === 'File' && e.target.value !== '') {
            var file = e.target.files[0];
            fields.current.submission.Solution = file.name;
            var reader = new FileReader();
            reader.onload = evt => {
                fields.current.submission.Code = evt.target.result;
            };
            reader.readAsText(file);
        } else {
            fields.current.submission[e.target.id] = e.target.value;
            while (
                e.target.id === 'Link' &&
                fields.current.submission['Link'].endsWith('/')
            ) {
                var str = fields.current.submission['Link'];
                fields.current.submission['Link'] = str.slice(
                    0,
                    str.length - 1
                );
            }
        }

        if (e.target.id === 'Difficulty') {
            const newIsPresentation = e.target.value == 'presentation';
            setIsPresentation(newIsPresentation);
            if (
                newIsPresentation &&
                !fields.current.submission.hasOwnProperty('PresNotes')
            ) {
                fields.current.submission['PresNotes'] = '';
            } else if (!newIsPresentation) {
                delete fields.current.submission.PresNotes;
            }
        }
    };

    //  filename
    if (isEditMode) {
        fields.current.filename = (
            <FormText color="muted" style={{ textAlign: 'left' }}>
                Current Submission: {props.data.Solution}
            </FormText>
        );
    }

    // difficulty
    useEffect(() => {
        difficultyTags.difficulties.forEach((difficulty, index) => {
            fields.current.difficultyOptions.push(
                <option key={`opt${index}`}>{difficulty}</option>
            );
        });
        if (owner === 'ryansy') {
            // TODO make this more streamlined
            difficultyTags.extras.forEach((extra, index) => {
                fields.current.difficultyOptions.push(
                    <option key={`ex${index}`}>{extra}</option>
                );
            });
        }
    }, []);

    for (let key in problemData) {
        fields.current.submission[key] = problemData[key];
    }
    if (isUnset(fields.current.submission['Category'])) {
        fields.current.submission['Category'] = [];
    }
    if (isUnset(fields.current.submission['Session'])) {
        fields.current.submission['Session'] = [];
    }
    if (isUnset(fields.current.submission['Contributor'])) {
        fields.current.submission['Contributor'] = [];
    }

    // === Process Data ===
    const processData = refData => {
        dbData.current = refData.val();
        fields.current.categories = dbData.current['categories'].sort();
        setLoaded(true);
    };

    let ref = null;
    useEffect(() => {
        ref = firebase.database().ref();
        ref.on('value', processData);
    }, []);

    if (!loaded) {
        return <React.Fragment></React.Fragment>;
    } else {
        return (
            <SubmitForm
                data={problemData}
                dbData={dbData.current}
                updateInputValue={updateInputValue}
                isPresentation={isPresentation}
                {...fields.current}
            />
        );
    }
}
