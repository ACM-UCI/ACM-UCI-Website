import React, { Component } from 'react';
import { Input, Table } from 'reactstrap';
import Entry from './Entry/Entry';
import filter from './Entry/filter';
import config from '../../config.js';
import './Data.css';
import firebase from '../../../Firebase';
import Pagination from './Pagination.js';

const titles = {
    diff: 'Difficulty',
    solf: 'Solution',
    note: 'Notes',
    cons: 'Contributor',
    sess: 'Session',
    cate: 'Category'
};

export default class Data extends Component {
    constructor(props) {
        super(props);
        this.filters = {};
        for (var t in titles) this.filters[t] = 'All';

        this.options = {
            diff: [
                <option key="difficulty">All</option>,
                <option key="difficulty-easy">easy</option>,
                <option key="difficulty-med">med</option>,
                <option key="difficulty-hard">hard</option>,
                <option key="difficulty-icpc">icpc</option>,
                <option key="difficulty-codealong">codealong</option>
            ],
            sess: [
                <option key="sessopt">All</option>,
                <option key="sessoptnotused">Not Used</option>
            ],
            solf: [
                <option key="_solution">All</option>,
                <option key="no_solution">No Solution</option>,
                <option key="has_solution">Has Solution</option>
            ],
            note: [
                <option key="_notes">All</option>,
                <option key="no_solution">No Notes</option>,
                <option key="has_solution">Has Notes</option>
            ],
            cons: [<option key="con-all">All</option>],
            cate: [<option key="cate-all">All</option>]
        };

        var quarters = config['quarters'];
        for (var i in quarters) {
            for (var j = 1; j <= 11; j++) {
                this.options.sess.push(
                    <option key={'sessopt' + quarters[i] + j.toString() + '/1'}>
                        {quarters[i] + '/' + j.toString() + '/1'}
                    </option>
                );
                this.options.sess.push(
                    <option key={'sessopt' + quarters[i] + j.toString() + '/2'}>
                        {quarters[i] + '/' + j.toString() + '/2'}
                    </option>
                );
            }
        }

        this.processData = this.processData.bind(this);
        this.state = { tog: false, page: 1 };
        this.week = props.week;
        this.quarter = props.quarter;
        this.quarterIndex = props.quarterIndex;
        this.session = props.session;
        this.data = {};
        this.body = [];
        this.rownum = 20;
        this.changePage = this.changePage.bind(this);
        this.loaded = false;
    }

    componentDidMount() {
        this.loaded = true;
        var ref = firebase.database().ref();
        ref.on('value', this.processData);
    }

    changePage(num) {
        this.setState({ page: num });
    }

    updateInputValue(evt) {
        var name = evt.target.id.substring(0, 4);
        if (name === 'rows') {
            this.rownum = evt.target.value;
            this.setState({ page: 1 });
        } else if (this.filters.hasOwnProperty(name)) {
            this.filters[name] = evt.target.value;
            this.processData(this.data);
        }
    }

    processData(data) {
        this.data = data;
        this.body = [];
        var submissions = data.val()['submissions'];
        for (var key in submissions) {
            if (
                submissions.hasOwnProperty(key) &&
                submissions[key] !== null &&
                filter(submissions[key], this.filters)
            ) {
                this.body.push(
                    <Entry
                        key={key}
                        // current time
                        wk={this.props.week}
                        qrt={this.props.quarter}
                        qrtIndex={this.props.quarterIndex}
                        boardQuarter={this.props.boardQuarter}
                        boardQuarterInd={this.props.boardQuarterInd}
                        session={this.props.session}
                        // data
                        data={submissions[key]}
                        owner={this.props.owner}
                        // paths
                        x={key}
                    />
                );
            }
        }

        var logs = data.val()['logs'];
        this.options.cons = [<option key="con">All</option>];
        Object.keys(logs).forEach(user =>
            this.options.cons.push(<option key={user}>{user}</option>)
        );

        var categories = data.val()['categories'];
        this.options.cate = [<option key="cate">All</option>];
        categories
            .sort()
            .forEach(v =>
                this.options.cate.push(<option key={'cate' + v}>{v}</option>)
            );

        // make sure to not setstate when component have not mounted
        if (this.loaded) {
            this.setState({
                tog: !this.state.tog,
                page: 1
            });
        }
    }

    render() {
        return (
            <>
                <br />
                <br />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'left',
                        flexWrap: 'wrap',
                        backgroundColor: '#EFFCFF'
                    }}>
                    {Object.keys(titles).map((v, i) => (
                        <div
                            key={v + 'check'}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                position: 'relative',
                                margin: '10px',
                                marginRight: '30px',
                                width: '230px',
                                padding: '10px',
                                backgroundColor: '#aad1e9',
                                borderRadius: '20px'
                            }}>
                            {titles[v.substring(0, 4)]} :
                            <Input
                                style={{
                                    width: '100px',
                                    marginLeft: '10px',
                                    position: 'absolute',
                                    right: 10,
                                    top: 3
                                }}
                                type="select"
                                onChange={evt => this.updateInputValue(evt)}
                                name="select"
                                id={v + 'filter'}>
                                {this.options[v]}
                            </Input>
                        </div>
                    ))}
                </div>
                <div
                    style={{
                        height: '60px',
                        width: '100%',
                        position: 'relative'
                    }}>
                    <div
                        style={{
                            height: '60px',
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                            paddingTop: '20px'
                        }}>
                        <Pagination
                            curr={this.state.page}
                            rows={this.rownum}
                            pages={Math.ceil(this.body.length / this.rownum)}
                            callback={this.changePage}
                        />
                    </div>
                    <Input
                        style={{
                            width: '100px',
                            margin: '10px',
                            position: 'absolute',
                            top: 0,
                            right: 0
                        }}
                        type="select"
                        onChange={evt => this.updateInputValue(evt)}
                        name="select"
                        id={'rows'}>
                        {[...Array(5).keys()].map(v => (
                            <option
                                key={'rownum' + v.toString()}
                                value={(v + 1) * 20}>
                                {(v + 1) * 20} rows
                            </option>
                        ))}
                        <option key={'rownumall'} value={this.body.length + 1}>
                            All
                        </option>
                    </Input>
                </div>
                <Table style={{ justifyItems: 'center' }} responsive>
                    <thead>
                        <tr>
                            <th>Name</th>
                            {Object.keys(titles).map(v => (
                                <th key={'th' + v}>{titles[v]}</th>
                            ))}
                            <th>Set</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.body.slice(
                            (this.state.page - 1) * this.rownum,
                            this.state.page * this.rownum
                        )}
                    </tbody>
                </Table>
                <div
                    style={{
                        height: '60px',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        paddingTop: '20px'
                    }}>
                    <Pagination
                        curr={this.state.page}
                        rows={this.rownum}
                        pages={Math.ceil(this.body.length / this.rownum)}
                        callback={this.changePage}
                    />
                </div>
            </>
        );
    }
}
