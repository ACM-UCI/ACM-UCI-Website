import React, { Component } from 'react';
// import { Container, Row } from 'reactstrap';
import './Log.css';
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

export default class Log extends Component {
    constructor(props) {
        super(props);

        this.done = false;

        this.processData = this.processData.bind(this);

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
                width: 70
            });
        }

        this.columns.push({
            name: 'tot',
            title: 'Total Score'
        });

        this.data = [];
    }

    componentDidMount() {
        var ref = firebase.database().ref();
        ref.on('value', this.processData);
    }

    processData(data) {
        var logs = data.val()['logs'];
        var d = {};
        var tot;
        var mins = [];
        this.data = [];

        // for each board member
        for (var key in logs) {
            if (logs.hasOwnProperty(key)) {
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

    render() {
        if (this.done) {
            return (
                <div>
                    <div
                        style={{
                            textAlign: 'center',
                            fontSize: '50px',
                            fontFamily: 'Verdana'
                        }}>
                        Wall of Fame
                    </div>
                    <Paper>
                        <Grid rows={this.data} columns={this.columns}>
                            <SortingState
                                defaultSorting={[
                                    { columnName: 'Name', direction: 'asc' }
                                ]}
                            />
                            <IntegratedSorting />
                            <Table
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
