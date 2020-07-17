import React, { Component } from 'react';
import { Input } from 'reactstrap';
import './Log.css';
import firebase from '../../../Firebase';
import {
    Max,
    extcolumns,
    columns,
    filters,
    inFilter
} from '../../../utils/LoginUtils/LogUtils';
import Paper from '@material-ui/core/Paper';
import { SortingState, IntegratedSorting } from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableFixedColumns
} from '@devexpress/dx-react-grid-material-ui';
import color from '@material-ui/core/colors/amber';

// white, gold, grey, bland gold, blue
const colors = {
    owner: '#4ec5ec', // bright light saturated blue
    normal: 'white', // white
    first: '#fded5d', // gold
    second: 'c2c1b9', // silver
    third: '#9b9567' // bronze
};
const minmax = new Max();

// for use with rendering row bg colors
let currentUser = undefined;

function TableRow(props) {
    const { row, ...restProps } = props;
    console.log(currentUser);
    if (row.Name === currentUser) console.log(row);
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
                backgroundColor: bgColor
            }}
        />
    );
}

// Set Color to Red when quarter starts
const HighlightedCell = ({ value, style, ...restProps }) => (
    <Table.Cell
        {...restProps}
        style={{
            textAlign: 'center',
            // backgroundColor:
            //     value === currentUser ? colors.owner : value < 0 ? 'red' : undefined,
            ...style
        }}>
        <span
            style={{
                color: value < 0 ? colors.white : undefined
            }}>
            {value}
        </span>
    </Table.Cell>
);

const NormalCell = ({ value, style, ...restProps }) => (
    <Table.Cell
        {...restProps}
        style={{
            textAlign: 'center',
            ...style
        }}>
        <span>{value}</span>
    </Table.Cell>
);

const NormalHeaderCell = ({ style, ...restProps }) => {
    return (
        <TableHeaderRow.Cell
            {...restProps}
            style={{
                textAlign: isNaN(Number(restProps.column.name))
                    ? 'center'
                    : 'right',
                ...style
            }}
        />
    );
};

const HeaderCell = props => {
    return <NormalHeaderCell {...props} />;
};

const HighlightedHeaderColCell = ({ style, ...restProps }) => {
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
                ...style
            }}
        />
    );
};

const HeaderColCell = props => {
    return <HighlightedHeaderColCell {...props} />;
};

const Cell = props => {
    const { column } = props;
    if (column.name === 'score') {
        return <HighlightedCell {...props} />;
    }
    return <NormalCell {...props} />;
};

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
            data: []
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
        var ref = firebase.database().ref();
        ref.on('value', this.processData);
    }

    /**
     * Recieves firebase data and parses it to display in the logs.
     * @param {Firebase} data
     */
    processData(data) {
        const { year, quarter, week, filter } = this.state;
        var logs = data.val()['logs'];
        const filteredData = [];
        minmax.reset(); // For calculated bgcolor values for rows

        // for each member calculate score
        for (var member in logs)
            if (inFilter(member, year, filter)) {
                const member_data = { Name: member };
                let tot = 0;

                // for each week
                for (var i = 1; i <= 11; i++) {
                    const temp = logs[member][quarter][i];
                    tot += temp; // Get total score
                    member_data[i] = parseFloat(temp.toFixed(2)); // Rounding
                }

                member_data['tot'] = parseFloat(tot.toFixed(2));
                if (inFilter(member, year, filters.BOARD)) {
                    // Calculate board score
                    member_data['score'] = parseFloat(
                        (tot - (week - 1)).toFixed(2)
                    );
                    minmax.update(tot);
                }
                filteredData.push(member_data);
            }

        this.setState({
            data: filteredData,
            done: true
        });
    }

    // Callback function to update filter
    updateInputValue(e) {
        // Map selected option index to filter value
        const mappings = {
            0: filters.ALL,
            1: filters.BOARD,
            2: filters.MEMBER
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
                        <Grid rows={data} columns={this.columns}>
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
        } else {
            return null;
        }
    }
}
