import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Input } from 'reactstrap';
import Prev from '@material-ui/icons/NavigateBefore';
import Next from '@material-ui/icons/NavigateNext';
import First from '@material-ui/icons/SkipPrevious';
import Last from '@material-ui/icons/SkipNext';

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
        var v = e.target.value;
        if (!isNaN(v)) {
            var val =
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
        if (this.props.rows != this.rows) {
            this.rows = this.props.rows;
            this.curr = 1;
        }
        return (
            <Pagination>
                <PaginationItem
                    onClick={() => {
                        this.onClick(1);
                    }}>
                    <PaginationLink style={{ color: '#5F8FFF' }}>
                        <First />
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem
                    onClick={() => {
                        this.onClick(this.curr - 1);
                    }}>
                    <PaginationLink style={{ color: '#5F8FFF' }}>
                        <Prev />
                    </PaginationLink>
                </PaginationItem>
                <Input
                    style={{
                        width: '50px',
                        textAlign: 'center',
                        margin: '4px',
                        marginTop: '2px'
                    }}
                    onChange={this.update}
                    id={'page_choose'}
                    value={this.curr === 0 ? '' : this.curr}
                />
                <PaginationItem
                    onClick={() => {
                        this.onClick(this.curr + 1);
                    }}>
                    <PaginationLink style={{ color: '#5F8FFF' }}>
                        <Next />
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem
                    onClick={() => {
                        this.onClick(this.props.pages);
                    }}>
                    <PaginationLink style={{ color: '#5F8FFF' }}>
                        <Last />
                    </PaginationLink>
                </PaginationItem>
            </Pagination>
        );
    }
}
