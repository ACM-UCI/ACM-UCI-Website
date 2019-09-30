import React, { Component } from 'react';
import { Input, Table } from 'reactstrap';
import Entry from './Entry/Entry';
import config from '../../config.js';
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
        this.sessoptions = [
            <option key="sessopt">Session</option>,
            <option key="sessoptnotused">Not Used</option>
        ];

        var quarters = config['quarters'];
        for (var i in quarters) {
            for (var j = 1; j <= 11; j++) {
                this.sessoptions.push(
                    <option key={'sessopt' + quarters[i] + j.toString() + '/1'}>
                        {quarters[i] + '/' + j.toString() + '/1'}
                    </option>
                );
                this.sessoptions.push(
                    <option key={'sessopt' + quarters[i] + j.toString() + '/2'}>
                        {quarters[i] + '/' + j.toString() + '/2'}
                    </option>
                );
            }
        }

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
        var submissions = data.val()['submissions'];
        for (var key in submissions) {
            if (submissions.hasOwnProperty(key) && submissions[key] != null) {
                this.body.push(
                    <Entry
                        key={key}
                        // current time
                        wk={this.props.week}
                        qrt={this.props.quarter}
                        sess={this.props.session}
                        // data
                        data={submissions[key]}
                        filters={this.filters}
                        owner={this.props.owner}
                        // paths
                        x={key}
                    />
                );
            }
        }

        var logs = data.val()['logs'];
        this.cons = [<option key="con">Contributor</option>];
        for (var user in logs) {
            if (logs.hasOwnProperty(user)) {
                this.cons.push(<option key={user}>{user}</option>);
            }
        }

        this.setState({
            tog: !this.state.tog
        });
    }

    render() {
        return (
            <>
                {this.categoryFilter}
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
                                    {this.sessoptions}
                                </Input>
                            </th>
                            <th />
                            <th />
                        </tr>
                    </thead>
                    <tbody>{this.body}</tbody>
                </Table>
            </>
        );
    }
}
