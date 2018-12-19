
import React, { Component } from 'react';
import { Container} from 'reactstrap';
import Week from './Week/Week';
import './Quarter.css';

class Puzzle extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
        }

        toggle() {
        this.setState({ collapse: !this.state.collapse });
        }
    render() {
        return (
            <Container>
                <Week week='2' quarter="Fall 2018"></Week>
            </Container>
        );
    }
}

export default Puzzle;