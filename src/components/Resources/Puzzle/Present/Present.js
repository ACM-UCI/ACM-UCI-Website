
import React, { Component } from 'react';
import { Container, Row, Col, Collapse, Button} from 'reactstrap';
import Problem from '../Quarter/Week/Problem/Problem';
import './Present.css';

export default class Present extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
        this.week = props.week;
        this.quarter = props.quarter;
        this.session = props.session;
        this.rows = [];

        var xhr = new XMLHttpRequest();
        xhr.open("GET", this.quarter+"/"+this.week +".csv", false);
        xhr.send();
        this.processData(xhr.responseText);

    }

    processData(allText) {
        var allTextLines = allText.split(/\r\n|\n/);
        var problems = [[]];
        
        for (var i=1; i<allTextLines.length; i++) {
            var data = allTextLines[i].split(',');

            if(problems[problems.length-1].length==3){
                problems.push([]);
            }

            if (data[4]==this.session){
                problems[problems.length-1].push(
                    <Col md='4' className="height">
                        <Problem    
                            name = {data[0]}
                            link = {data[1]}
                            diff = {data[2]}
                            slink =  {data[3]}
                            sol = {data[4]}
                        >
                        </Problem>
                    </Col>
                );
            }
            
        }

        while(problems[problems.length-1].length<3){
            problems[problems.length-1].push(null);
        }

        for (var j=0; j<problems.length; j++){
            this.rows.push(
                [j,
                <Row className="space center">
                    {problems[j][0]}
                    {problems[j][1]}
                    {problems[j][2]}
                </Row>]
            );
        }

        this.ls = this.rows.map((row) =>
            <ul className = "center" key={row[0].toString()}>{row[1]}</ul>
        );

    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    render() {
        return (
            <Container>
                {this.ls}
            </Container>
        );
    }
}