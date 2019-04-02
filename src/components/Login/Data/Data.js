import React, { Component } from 'react';
import { Input, Table } from 'reactstrap';
import Entry from './Entry/Entry';
import './Data.css';
import firebase from 'firebase/app';
import 'firebase/database';

export default class Data extends Component {
    constructor(props) {
        super(props);
        this.filters = {
            diffs: 'Difficulty',
            cons: 'Contributor',
            solf: 'Solution',
            sess: 'Session',
            note: 'Notes'
        };
        this.processData = this.processData.bind(this);
        this.state = {
            tog: false
        };
        this.week = props.week;
        this.quarter = props.quarter;
        this.session = props.session;
        this.data = {};
        this.body = [];
        this.cons = [<option key="con">Contributor</option>];
    }

    componentDidMount() {
        var ref = firebase.database().ref();
        ref.on('value', this.processData);
    }

    updateInputValue(evt) {
        if (evt.target.id === 'difffilter') {
            this.filters.diffs = evt.target.value;
        } else if (evt.target.id === 'solfilter') {
            this.filters.solf = evt.target.value;
        } else if (evt.target.id === 'confilter') {
            this.filters.cons = evt.target.value;
        } else if (evt.target.id === 'sessfilter') {
            this.filters.sess = evt.target.value;
        } else if (evt.target.id === 'notefilter') {
            this.filters.note = evt.target.value;
        }
        this.processData(this.data);
    }

    processData(data) {
        this.data = data;
        this.body = [];
        var submissions = data.val();
        for (var q in submissions) {
            if (q === 'submissions') {
                var s = submissions[q];
                for (var key in s) {
                    if (s.hasOwnProperty(key) && s[key] != null) {
                        this.body.push(
                            <Entry
                                key={key}
                                // current time
                                wk={this.props.week}
                                qrt={this.props.quarter}
                                ses={this.props.session}
                                // data
                                data={s[key]}
                                filters={this.filters}
                                owner={this.props.owner}
                                // paths
                                week={this.week}
                                quarter={this.quarter}
                                session={this.session}
                                k={'submissions'}
                                x={key}
                            />
                        );
                    }
                }
            } else if (
                submissions.hasOwnProperty(q) &&
                q !== 'board' &&
                q !== 'logs'
            ) {
                var quarter = submissions[q];
                for (var w in quarter) {
                    if (quarter.hasOwnProperty(w)) {
                        var week = quarter[w];
                        for (var keys in week) {
                            if (
                                week.hasOwnProperty(keys) &&
                                week[keys] != null
                            ) {
                                this.body.push(
                                    <Entry
                                        key={q + '/' + w + '/' + keys}
                                        // current time
                                        wk={this.props.week}
                                        qrt={this.props.quarter}
                                        ses={this.props.session}
                                        // data
                                        data={week[keys]}
                                        filters={this.filters}
                                        owner={this.props.owner}
                                        // paths
                                        k={q + '/' + w}
                                        x={keys}
                                    />
                                );
                            }
                        }
                    }
                }
            }
        }

        this.cons = [<option key="con">Contributor</option>];
        for (var user in submissions['logs']) {
            if (submissions['logs'].hasOwnProperty(user)) {
                this.cons.push(<option key={user}>{user}</option>);
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
                                {this.cons}
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
                                <option>Spring 2019</option>
                                <option>Not Used</option>
                            </Input>
                        </th>
                        <th />
                    </tr>
                </thead>
                <tbody>{this.body}</tbody>
            </Table>
        );
    }
}
