import { amber } from '@mui/material/colors';
import Paper from '@mui/material/Paper';
import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { getDatabase, ref, onValue } from 'firebase/database';
import firebase from '../../../Firebase';
import {
    columns,
    extcolumns,
    filters,
    inFilter,
    Max,
} from '../../../utils/LoginUtils/LogUtils';
import './Log.css';

// white, gold, grey, bland gold, blue
const colors = {
    owner: '#4ec5ec', // bright light saturated blue
    normal: 'white', // white
    first: '#fded5d', // gold
    second: 'c2c1b9', // silver
    third: '#9b9567', // bronze
};
const minmax = new Max();

// for use with rendering row bg colors
let currentUser;

function TableRow(props) {
    const { row, ...restProps } = props;
    const bgColor =
        row.Name === currentUser
            ? color.owner
            : row.tot === minmax.gold
            ? colors.first
            : row.tot === minmax.silver
            ? colors.second
            : row.tot === minmax.bronze
            ? colors.third
            : colors.normal;

    return (
        <Table.Row
            {...restProps}
            style={{
                cursor: 'pointer',
                backgroundColor: bgColor,
            }}
        />
    );
}

// Set Color to Red when quarter starts
function HighlightedCell({ value, style, ...restProps }) {
    return (
        <Table.Cell
            {...restProps}
            style={{
                textAlign: 'center',
                // backgroundColor:
                //     value === currentUser ? colors.owner : value < 0 ? 'red' : undefined,
                ...style,
            }}
        >
            <span
                style={{
                    color: value < 0 ? colors.white : undefined,
                }}
            >
                {value}
            </span>
        </Table.Cell>
    );
}

function NormalCell({ value, style, ...restProps }) {
    return (
        <Table.Cell
            {...restProps}
            style={{
                textAlign: 'center',
                ...style,
            }}
        >
            <span>{value}</span>
        </Table.Cell>
    );
}

function NormalHeaderCell({ style, ...restProps }) {
    return (
        <TableHeaderRow.Cell
            {...restProps}
            style={{
                textAlign: isNaN(Number(restProps.column.name))
                    ? 'center'
                    : 'right',
                ...style,
            }}
        />
    );
}

function HeaderCell(props) {
    return <NormalHeaderCell {...props} />;
}

function HighlightedHeaderColCell({ style, ...restProps }) {
    return (
        <TableFixedColumns.Cell
            {...restProps}
            style={{
                textAlign: 'left',
                backgroundColor:
                    restProps.tableRow.key === 'Symbol(heading)'
                        ? 'white'
                        : restProps.tableRow.row.Name === currentUser
                        ? colors.owner
                        : 'white',
                ...style,
            }}
        />
    );
}

function HeaderColCell(props) {
    return <HighlightedHeaderColCell {...props} />;
}

function Cell(props) {
    const { column } = props;
    if (column.name === 'score') {
        return <HighlightedCell {...props} />;
    }
    return <NormalCell {...props} />;
}

/**
 * Defines the rendering of the log component displaying
 * how many problems members have submitted.
 */
export default class Log extends Component {
    constructor(props) {
        super(props);

        // Bind Functions
        this.processData = this.processData.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);

        this.state = {
            // Pass props to state
            owner: props.owner,
            year: props.year,
            quarter: props.quarter,
            week: props.week,

            // Initialize controls
            filter: filters.ALL,
            done: false,

            // Initalize data
            data: [],
        };

        currentUser = props.owner; // For rendering row bg color

        this.extcolumns = extcolumns;
        this.columns = columns;
    }

    componentDidMount() {
        this.callFirebase();
    }

    /**
     * Initiates the fetching and parsing of log data from firebase
     */
    callFirebase() {
        const dbRef = ref(getDatabase());
        onValue(dbRef, this.processData);
    }

    /**
     * Recieves firebase data and parses it to display in the logs.
     * @param {Firebase} data
     */
    processData(data) {
        const { year, quarter, week, filter } = this.state;
        const { logs } = data.val();
        const filteredData = [];
        minmax.reset(); // For calculated bgcolor values for rows

        // for each member calculate score
        for (const member in logs) {
            if (inFilter(member, year, filter)) {
                const member_data = { Name: member };
                let tot = 0;

                // for each week
                for (let i = 1; i <= 11; i++) {
                    const temp = logs[member][quarter][i];
                    tot += temp; // Get total score
                    member_data[i] = parseFloat(temp.toFixed(2)); // Rounding
                }

                member_data.tot = parseFloat(tot.toFixed(2));
                if (inFilter(member, year, filters.BOARD)) {
                    // Calculate board score
                    member_data.score = parseFloat(
                        (tot - (week - 1)).toFixed(2)
                    );
                    minmax.update(tot);
                }
                filteredData.push(member_data);
            }
        }

        this.setState({
            data: filteredData,
            done: true,
        });
    }

    // Callback function to update filter
    updateInputValue(e) {
        // Map selected option index to filter value
        const mappings = {
            0: filters.ALL,
            1: filters.BOARD,
            2: filters.MEMBER,
        };
        this.setState({ filter: mappings[e.target.selectedIndex] }, () => {
            this.callFirebase();
        });
    }

    render() {
        const { data, done } = this.state;
        if (done) {
            return (
                <div style={{ position: 'relative' }}>
                    <div
                        style={{
                            textAlign: 'center',
                            fontSize: '50px',
                            fontFamily: 'Verdana',
                        }}
                    >
                        Wall of Fame
                    </div>
                    <Form.Select
                        style={{
                            marginTop: '2%',
                            marginBottom: '2%',
                            width: '20%',
                            position: 'absolute',
                            right: '0',
                        }}
                        defaultValue="All Members"
                        onChange={(evt) => this.updateInputValue(evt)}
                        id="Board"
                    >
                        <option>All Members</option>
                        <option>Board</option>
                        <option>Non-Board</option>
                    </Form.Select>
                    <Paper
                        style={{
                            marginTop: '8%',
                            marginBottom: '2%',
                        }}
                    >
                        <Grid rows={data} columns={this.columns}>
                            <SortingState
                                defaultSorting={[
                                    { columnName: 'Name', direction: 'asc' },
                                ]}
                            />
                            <IntegratedSorting />
                            <Table
                                cellComponent={Cell}
                                rowComponent={TableRow}
                                columnExtensions={this.extcolumns}
                            />
                            <TableHeaderRow
                                cellComponent={HeaderCell}
                                showSortingControls
                            />
                            <TableFixedColumns
                                cellComponent={HeaderColCell}
                                leftColumns={['Name']}
                                rightColumns={['Total Score']}
                            />
                        </Grid>
                    </Paper>
                </div>
            );
        }
        return null;
    }
}
