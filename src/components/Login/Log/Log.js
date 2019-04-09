import React, { Component } from 'react';
import { Input, Row } from 'reactstrap';
import './Log.css';
import board from '../../Board/board.json';
import firebase from 'firebase/app';
import 'firebase/database';
import Paper from '@material-ui/core/Paper';
import { SortingState, IntegratedSorting } from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableFixedColumns
} from '@devexpress/dx-react-grid-material-ui';

const styles = [
    {
        backgroundColor: 'white'
    },
    {
        backgroundColor: '#fded5d'
    },
    {
        backgroundColor: '#c2c1b9'
    },
    {
        backgroundColor: '#9b9567'
    }
];

var m = [300, 300, 300];

var TableRow = ({ row, ...restProps }) => (
    <Table.Row
        {...restProps}
        style={{
            cursor: 'pointer',
            ...styles[m.indexOf(row.tot) + 1]
        }}
    />
);

const HighlightedCell = ({ value, style, ...restProps }) => (
    <Table.Cell
        {...restProps}
        style={{
            backgroundColor: value < 0 ? 'red' : undefined,
            ...style
        }}>
        <span
            style={{
                color: value < 0 ? 'white' : undefined
            }}>
            {value}
        </span>
    </Table.Cell>
);

const Cell = props => {
    const { column } = props;
    if (column.name === 'score') {
        return <HighlightedCell {...props} />;
    }
    return <Table.Cell {...props} />;
};

export default class Log extends Component {
    constructor(props) {
        super(props);

        this.done = false;
        this.filter = 'All Members';
        this.processData = this.processData.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);

        this.quarter = props.quarter;
        this.week = props.week;

        this.state = {
            tog: false
        };

        this.extcolumns = [
            {
                columnName: 'Name',
                width: 170
            },
            {
                columnName: 'score',
                align: 'center'
            },
            {
                columnName: 'tot',
                align: 'center'
            }
        ];

        this.columns = [
            {
                name: 'Name'
            }
        ];

        for (var i = 1; i <= 11; i++) {
            this.columns.push({ name: i.toString() });
            this.extcolumns.push({
                columnName: i.toString(),
                // align: "center",
                width: 60
            });
        }

        this.columns.push({
            name: 'score',
            title: 'Board Score'
        });

        this.columns.push({
            name: 'tot',
            title: 'Total Score'
        });

        this.data = [];
    }

    componentDidMount() {
        this.callFirebase();
    }

    callFirebase() {
        var ref = firebase.database().ref();
        ref.on('value', this.processData);
    }

    processData(data) {
        var logs = data.val()['logs'];
        var d = {};
        var tot;
        var mins = [];
        this.data = [];

        // for each member
        for (var key in logs) {
            if (
                logs.hasOwnProperty(key) &&
                key != 'pattis' &&
                (this.filter === 'All Members' ||
                    (this.filter === 'Board' &&
                        board['2019-2020'].hasOwnProperty(key) &&
                        key != 'kgajulap') ||
                    (this.filter === 'Non-Board' &&
                        !board['2019-2020'].hasOwnProperty(key)))
            ) {
                d = { Name: key };
                tot = 0;

                // for each week
                for (var i = 1; i <= 11; i++) {
                    d[i] = logs[key][this.quarter][i];

                    // get the total score
                    tot += d[i];
                }

                // For Wall of Shame:
                // if (mins.indexOf(tot - this.week * 2) === -1) {
                //     mins.push(tot - this.week * 2);
                // }
                //d['tot'] = tot - this.week * 2;

                if (mins.indexOf(tot) === -1) {
                    mins.push(tot);
                }
                d['tot'] = tot;
                if (
                    board['2019-2020'].hasOwnProperty(key) &&
                    key != 'kgajulap'
                ) {
                    d['score'] = tot - (this.week - 1) * 2;
                }
                this.data.push(d);
            }
        }

        mins.sort(function(a, b) {
            return b - a;
        });
        mins.splice(3, mins.length - 3);
        m = mins;

        this.done = true;

        this.setState({
            tog: !this.state.tog
        });
    }

    updateInputValue(e) {
        this.filter = e.target.value;
        this.callFirebase();
    }

    render() {
        if (this.done) {
            return (
                <div style={{ position: 'relative' }}>
                    <div
                        style={{
                            textAlign: 'center',
                            fontSize: '50px',
                            fontFamily: 'Verdana'
                        }}>
                        Wall of Fame
                    </div>
                    <Input
                        style={{
                            marginTop: '2%',
                            marginBottom: '2%',
                            width: '20%',
                            position: 'absolute',
                            right: '0'
                        }}
                        type="select"
                        defaultValue={'All Members'}
                        onChange={evt => this.updateInputValue(evt)}
                        name="select"
                        id="Board">
                        <option>All Members</option>
                        <option>Board</option>
                        <option>Non-Board</option>
                    </Input>
                    <Paper
                        style={{
                            marginTop: '8%',
                            marginBottom: '2%'
                        }}>
                        <Grid rows={this.data} columns={this.columns}>
                            <SortingState
                                defaultSorting={[
                                    { columnName: 'Name', direction: 'asc' }
                                ]}
                            />
                            <IntegratedSorting />
                            <Table
                                cellComponent={Cell}
                                rowComponent={TableRow}
                                columnExtensions={this.extcolumns}
                            />
                            <TableHeaderRow showSortingControls />
                            <TableFixedColumns
                                leftColumns={['Name']}
                                rightColumns={['Total Score']}
                            />
                        </Grid>
                    </Paper>
                </div>
            );
        } else {
            return null;
        }
    }
}
