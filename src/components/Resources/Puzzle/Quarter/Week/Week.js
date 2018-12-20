
import React, { Component } from 'react';
import { Container, Row, Col, Collapse, Button} from 'reactstrap';
import Problem from './Problem/Problem';
import './Week.css';

export default class Week extends Component {
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

            if(problems[problems.length-1].length===3){
                problems.push([]);
            }
            if (data[4]<this.session){
                problems[problems.length-1].push(
                    <Col md='4' className="height">
                        <Problem    
                            className="center"
                            name = {data[0]}
                            link = {data[1]}
                            diff = {data[2]}
                            slink =  {data[3]}
                            con = {data[5]}
                            txt = "Solution"
                            week = {this.week}
                            quarter = {this.quarter}
                            session = {this.session}
                        >
                        </Problem>
                    </Col>
                );
            }
        }

        if(problems.length>0){
            if(problems[problems.length-1].length===0){
                problems.pop();
            }
            if(problems.length>0){
                while(problems[problems.length-1].length<3){
                    problems[problems.length-1].push(null);
                }
            }
        }

        for (var j=0; j<problems.length; j++){
            this.rows.push(
                <Row key={j.toString()} className="space">
                    {problems[j][0]}
                    {problems[j][1]}
                    {problems[j][2]}
                </Row>
            );
        }

    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    render() {
        if(this.rows.length === 0){
            return null;
        }else{
            return (
                <Container>
                    <Button className="b" onClick={this.toggle} 
                    style={{    marginTop: '1rem', width: '100%',
                                height: '30%', justifyContent: 'center',
                                alignItems: 'center', marginBottom: '1rem',
                                fontSize:'26px'}}>
                                Week {this.week}
                    </Button>
    
                    <Collapse isOpen={this.state.collapse}>
                        {this.rows}
                    </Collapse>
                </Container>
            );
        }
    }
}