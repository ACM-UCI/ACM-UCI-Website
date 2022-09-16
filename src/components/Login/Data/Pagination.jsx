import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import React, { Component } from 'react';
import { Form, Pagination } from 'react-bootstrap';

export default class MyPagination extends Component {
    constructor(props) {
        super(props);
        this.curr = 1;
        this.rows = props.rows;
        this.update = this.update.bind(this);
    }

    onClick(num) {
        this.curr = Math.max(Math.min(num, this.props.pages), 1);
        this.props.callback(this.curr);
        this.setState({});
    }

    update(e) {
        const v = e.target.value;
        if (!isNaN(v)) {
            const val =
                e.target.value === ''
                    ? 0
                    : Math.min(parseInt(e.target.value), this.props.pages);
            this.props.callback(val);
            this.curr = val;
            this.setState({});
        }
    }

    render() {
        this.curr = this.props.curr;
        if (this.props.rows !== this.rows) {
            this.rows = this.props.rows;
            this.curr = 1;
        }
        return (
            <Pagination className="justify-content-end">
                <Pagination.Item
                    onClick={() => {
                        this.onClick(1);
                    }}
                    style={{ color: '#5F8FFF' }}
                >
                    <SkipPreviousIcon />
                </Pagination.Item>
                <Pagination.Item
                    onClick={() => {
                        this.onClick(this.curr - 1);
                    }}
                    style={{ color: '#5F8FFF' }}
                >
                    <NavigateBeforeIcon />
                </Pagination.Item>
                <Form.Group controlId="page_choose">
                    <Form.Label visuallyHidden>Choose page number</Form.Label>
                    <Form.Control
                        onChange={this.update}
                        style={{
                            width: '50px',
                            textAlign: 'center',
                            margin: '4px',
                            marginTop: '2px',
                        }}
                        value={this.curr === 0 ? '' : this.curr}
                    />
                </Form.Group>
                <Pagination.Item
                    onClick={() => {
                        this.onClick(this.curr + 1);
                    }}
                >
                    <NavigateNextIcon />
                </Pagination.Item>
                <Pagination.Item
                    onClick={() => {
                        this.onClick(this.props.pages);
                    }}
                >
                    <SkipNextIcon />
                </Pagination.Item>
            </Pagination>
        );
    }
}
