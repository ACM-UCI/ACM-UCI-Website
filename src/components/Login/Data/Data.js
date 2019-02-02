import React, { Component } from 'react';
import { Input, Table } from 'reactstrap';
import Entry from './Entry/Entry';
import './Data.css';
import firebase from 'firebase/app';
import 'firebase/database';

export default class Data extends Component {
    constructor(props) {
        super(props);
        this.diffs = 'Difficulty';
        this.cons = 'Contributor';
        this.solf = 'Solution';
        this.sess = 'Session';
        this.note = 'Notes';
        this.processData = this.processData.bind(this);
        this.state = {
            tog: false
        };
        this.week = props.week;
        this.quarter = props.quarter;
        this.session = props.session;
        this.data = {};
        this.body = [];
    }

    componentDidMount() {
        var ref = firebase.database().ref();
        ref.on('value', this.processData);
    }

    updateInputValue(evt) {
        if (evt.target.id === 'difffilter') {
            this.diffs = evt.target.value;
        } else if (evt.target.id === 'solfilter') {
            this.solf = evt.target.value;
        } else if (evt.target.id === 'confilter') {
            this.cons = evt.target.value;
        } else if (evt.target.id === 'sessfilter') {
            this.sess = evt.target.value;
        } else if (evt.target.id === 'notefilter') {
            this.note = evt.target.value;
        }
        this.processData(this.data);
    }

    processData(data) {
        this.data = data;
        this.body = [];
        var submissions = data.val();
        var problem = null;

        for (var q in submissions) {
            if (q === 'submissions') {
                var s = submissions[q];
                for (var key in s) {
                    if (s.hasOwnProperty(key)) {
                        problem = s[key];
                        if (problem != null) {
                            if (
                                ((this.diffs === 'Difficulty' &&
                                    (problem.Difficulty === 'easy' ||
                                        problem.Difficulty === 'med' ||
                                        problem.Difficulty === 'hard' ||
                                        problem.Difficulty === 'codealong' ||
                                        problem.Difficulty === 'icpc')) ||
                                    this.diffs === problem.Difficulty) &&
                                (this.solf === 'Solution' ||
                                    (this.solf === 'No Solution' &&
                                        problem.Code === '') ||
                                    (this.solf === 'Has Solution' &&
                                        problem.Code !== '')) &&
                                (this.cons === 'Contributor' ||
                                    this.cons === problem.Contributor) &&
                                (this.sess === 'Session' ||
                                    (this.sess === 'Not Used' &&
                                        problem.Session === '') ||
                                    this.sess === q) &&
                                (this.note === 'Notes' ||
                                    (this.note === 'No Notes' &&
                                        problem.Note === '') ||
                                    (this.note === 'Has Notes' &&
                                        problem.Note !== ''))
                            ) {
                                this.body.push(
                                    <Entry
                                        key={key}
                                        x={key}
                                        data={problem}
                                        week={this.week}
                                        quarter={this.quarter}
                                        session={this.session}
                                        owner={this.props.owner}
                                    />
                                );
                            }
                        }
                    }
                }
            } else if (submissions.hasOwnProperty(q) && q !== 'board') {
                var quarter = submissions[q];
                for (var w in quarter) {
                    if (quarter.hasOwnProperty(w)) {
                        var week = quarter[w];
                        for (var keys in week) {
                            if (week.hasOwnProperty(keys)) {
                                problem = week[keys];
                                if (problem != null) {
                                    if (
                                        ((this.diffs === 'Difficulty' &&
                                            (problem.Difficulty === 'easy' ||
                                                problem.Difficulty === 'med' ||
                                                problem.Difficulty === 'hard' ||
                                                problem.Difficulty ===
                                                    'codealong' ||
                                                problem.Difficulty ===
                                                    'icpc')) ||
                                            this.diffs ===
                                                problem.Difficulty) &&
                                        (this.solf === 'Solution' ||
                                            (this.solf === 'No Solution' &&
                                                problem.Code === '') ||
                                            (this.solf === 'Has Solution' &&
                                                problem.Code !== '')) &&
                                        (this.cons === 'Contributor' ||
                                            this.cons ===
                                                problem.Contributor) &&
                                        (this.sess === 'Session' ||
                                            (this.sess === 'Not Used' &&
                                                problem.Session === '') ||
                                            this.sess === q) &&
                                        (this.note === 'Notes' ||
                                            (this.note === 'No Notes' &&
                                                problem.Note === '') ||
                                            (this.note === 'Has Notes' &&
                                                problem.Note !== ''))
                                    ) {
                                        this.body.push(
                                            <Entry
                                                owner={this.props.owner}
                                                key={q + '/' + w + '/' + keys}
                                                x={keys}
                                                data={problem}
                                                k={q + '/' + w}
                                            />
                                        );
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        this.setState({
            tog: !this.state.tog
        });
    }

    render() {
        return (
            <Table style={{ justifyItems: 'center' }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>
                            <Input
                                type="select"
                                onChange={evt => this.updateInputValue(evt)}
                                name="select"
                                id="difffilter">
                                <option>Difficulty</option>
                                <option>easy</option>
                                <option>med</option>
                                <option>hard</option>
                                <option>icpc</option>
                                <option>codealong</option>
                            </Input>
                        </th>
                        <th>
                            <Input
                                type="select"
                                onChange={evt => this.updateInputValue(evt)}
                                name="select"
                                id="solfilter">
                                <option>Solution</option>
                                <option>No Solution</option>
                                <option>Has Solution</option>
                            </Input>
                        </th>
                        <th>
                            <Input
                                type="select"
                                onChange={evt => this.updateInputValue(evt)}
                                name="select"
                                id="notefilter">
                                <option>Notes</option>
                                <option>No Notes</option>
                                <option>Has Notes</option>
                            </Input>
                        </th>
                        <th>
                            <Input
                                type="select"
                                onChange={evt => this.updateInputValue(evt)}
                                name="select"
                                id="confilter">
                                <option>Contributor</option>
                                <option>Armen</option>
                                <option>Blake</option>
                                <option>Bryon</option>
                                <option>Chinmay</option>
                                <option>Chris</option>
                                <option>Frank</option>
                                <option>Jacky</option>
                                <option>Jens</option>
                                <option>Junlin</option>
                                <option>Kaleo</option>
                                <option>Karthik</option>
                                <option>Meta</option>
                                <option>Pooya</option>
                                <option>Tim</option>
                            </Input>
                        </th>
                        <th>
                            <Input
                                type="select"
                                onChange={evt => this.updateInputValue(evt)}
                                name="select"
                                id="sessfilter">
                                <option>Session</option>
                                <option>Fall 2018</option>
                                <option>Winter 2019</option>
                                <option>Not Used</option>
                            </Input>
                        </th>
                    </tr>
                </thead>
                <tbody>{this.body}</tbody>
            </Table>
        );
    }
}
