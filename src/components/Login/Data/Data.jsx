import React, { Component } from 'react';
import { Row, Col, Form, Table } from 'react-bootstrap';
import firebase from '../../../Firebase';
import { getDatabase, ref, onValue } from 'firebase/database';
import config from '../../config';
import './Data.css';
import Entry from './Entry/Entry';
import filter from './Entry/filter';
import Pagination from './Pagination';

const db = getDatabase();

const titles = {
    diff: 'Difficulty',
    solf: 'Solution',
    note: 'Notes',
    cons: 'Contributor',
    sess: 'Session',
    cate: 'Category',
};

export default class Data extends Component {
    constructor(props) {
        super(props);
        this.filters = {}; // A Mapping of All Filters
        Object.keys(titles).forEach((k) => {
            this.filters[k] = 'All';
        });
        this.filters.sear = undefined;

        this.options = {
            diff: [
                <option key="difficulty">All</option>,
                <option key="difficulty-easy">easy</option>,
                <option key="difficulty-med">med</option>,
                <option key="difficulty-hard">hard</option>,
                <option key="difficulty-icpc">icpc</option>,
                <option key="difficulty-codealong">codealong</option>,
                <option key="difficulty-presentation">presentation</option>,
            ],
            sess: [
                <option key="sessopt">All</option>,
                <option key="sessoptnotused">Not Used</option>,
            ],
            solf: [
                <option key="_solution">All</option>,
                <option key="no_solution">No Solution</option>,
                <option key="has_solution">Has Solution</option>,
            ],
            note: [
                <option key="_notes">All</option>,
                <option key="no_solution">No Notes</option>,
                <option key="has_solution">Has Notes</option>,
            ],
            cons: [<option key="con-all">All</option>],
            cate: [<option key="cate-all">All</option>],
        };

        const { quarters } = config;
        for (let i = quarters.length - 1; i >= 0; i--) {
            for (let j = 11; j >= 1; j--) {
                this.options.sess.push(
                    <option key={`sessopt${quarters[i]}${j.toString()}/1`}>
                        {`${quarters[i]}/${j.toString()}/1`}
                    </option>
                );
                this.options.sess.push(
                    <option key={`sessopt${quarters[i]}${j.toString()}/2`}>
                        {`${quarters[i]}/${j.toString()}/2`}
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
        const dbRef = ref(db);
        onValue(dbRef, this.processData);
    }

    changePage(num) {
        this.setState({ page: num });
    }

    /**
     * Updates the Filters
     *
     * @param {*} evt
     */
    updateInputValue(evt) {
        const name = evt.target.id.substring(0, 4);
        if (name === 'rows') {
            this.rownum = evt.target.value;
            this.setState({ page: 1 });
        } else if (name === 'sear') {
            if (evt.target.value.trim() === '') {
                this.filters.sear = undefined;
            } else {
                this.filters.sear = evt.target.value.trim().toLowerCase();
            }
            this.processData(this.data);
        } else if (name in this.filters) {
            this.filters[name] = evt.target.value;
            this.processData(this.data);
        }
    }

    processData(data) {
        this.data = data;
        this.body = [];
        const { submissions } = data.val();
        Object.keys(submissions).forEach((key) => {
            if (filter(submissions[key], this.filters)) {
                this.body.push(
                    <Entry
                        key={key}
                        // current time
                        wk={this.week}
                        qrt={this.quarter}
                        qrtIndex={this.quarterIndex}
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
        });

        const { logs } = data.val();
        this.options.cons = [<option key="con">All</option>];
        Object.keys(logs).forEach((user) =>
            this.options.cons.push(<option key={user}>{user}</option>)
        );

        const { categories } = data.val();
        this.options.cate = [<option key="cate">All</option>];
        categories
            .sort()
            .forEach((v) =>
                this.options.cate.push(<option key={`cate${v}`}>{v}</option>)
            );

        // make sure to not setstate when component have not mounted
        if (this.loaded) {
            this.setState({
                tog: !this.state.tog,
                page: 1,
            });
        }
    }

    render() {
        return (
            <>
                <br />
                <br />

                {/* Begin Filters */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'left',
                        flexWrap: 'wrap',
                        backgroundColor: '#EFFCFF',
                    }}
                >
                    {Object.keys(titles).map((v, i) => (
                        <div
                            key={`${v}check`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                position: 'relative',
                                margin: '10px',
                                marginRight: '30px',
                                width: '275px',
                                padding: '10px',
                                backgroundColor: '#aad1e9',
                                borderRadius: '20px',
                            }}
                        >
                            <Form.Group controlId={`${v}filter`}>
                                <Form.Label style={{ margin: 0 }}>
                                    {titles[v.substring(0, 4)]} :{' '}
                                </Form.Label>
                                <Form.Select
                                    aria-label="All"
                                    onChange={(evt) =>
                                        this.updateInputValue(evt)
                                    }
                                    style={{
                                        width: '150px',
                                        marginLeft: '10px',
                                        position: 'absolute',
                                        right: 10,
                                        top: '50%',
                                        transform: 'translate(0, -50%)',
                                    }}
                                >
                                    {this.options[v]}
                                </Form.Select>
                            </Form.Group>
                        </div>
                    ))}

                    {/* Begin Search Feature */}

                    <Row
                        className="justify-content-center align-items-center"
                        key="searchcheck"
                        style={{
                            margin: '10px',
                            width: '500px',
                            backgroundColor: '#aad1e9',
                            borderRadius: '20px',
                        }}
                    >
                        <Form.Group controlId="searchfilter">
                            <Form.Label visuallyHidden>
                                Keyword Search
                            </Form.Label>
                            <Form.Control
                                onChange={(evt) => this.updateInputValue(evt)}
                                placeholder="Keyword Search"
                            />
                        </Form.Group>
                    </Row>
                </div>
                {/* End Search Feature */}
                {/* End Filters */}

                {/* Begin Top Pagination */}
                <Row className="align-items-end mt-3">
                    <Col style={{ textAlign: 'left' }}>
                        <Form.Group controlId="rows">
                            <Form.Label>Display Rows</Form.Label>
                            <Form.Select
                                onChange={(evt) => this.updateInputValue(evt)}
                                style={{ width: '50%' }}
                            >
                                {[...Array(5).keys()].map((v) => (
                                    <option
                                        key={`rownum${v.toString()}`}
                                        value={(v + 1) * 20}
                                    >
                                        {(v + 1) * 20} rows
                                    </option>
                                ))}
                                <option
                                    key="rownumall"
                                    value={this.body.length + 1}
                                >
                                    All
                                </option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Pagination
                            curr={this.state.page}
                            rows={this.rownum}
                            pages={Math.ceil(this.body.length / this.rownum)}
                            callback={this.changePage}
                        />
                    </Col>
                </Row>
                {/* End Top Pagination */}

                {/* Begin Main Table */}
                <Table style={{ justifyItems: 'center' }} responsive>
                    <thead>
                        <tr>
                            <th>Name</th>
                            {Object.keys(titles).map((v) => (
                                <th key={`th${v}`}>{titles[v]}</th>
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
                {/* End Main Table */}

                {/* Begin Bottom Pagination */}
                <div
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        paddingTop: '20px',
                    }}
                >
                    <Pagination
                        curr={this.state.page}
                        rows={this.rownum}
                        pages={Math.ceil(this.body.length / this.rownum)}
                        callback={this.changePage}
                    />
                </div>
                {/* End Bottom Pagination */}
            </>
        );
    }
}
