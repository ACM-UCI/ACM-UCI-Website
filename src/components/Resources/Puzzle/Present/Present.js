
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Problem from '../Quarter/Week/Session/Problem/Problem';
import Announcement from '../Quarter/Week/Session/Announcement/Announcement'
import $ from 'jquery';
import './Present.css';

export default class Present extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.processData = this.processData.bind(this);
        this.state = { collapse: false };
        this.week = props.week;
        this.quarter = props.quarter;
        this.session = props.session;
        this.rows = [];
        this.done = false;
        this.end = props.end;
        this.link = "https://raw.githubusercontent.com/MetaNovitia/ACM-UCI-Website/master/public/"+
                    this.quarter.split(' ')[0] + "%20" + 
                    this.quarter.split(' ')[1] + "/" + 
                    this.week +".csv";
    }

    // NEED TO CHECK
    componentDidMount() {
        // should be changed to axios request, xhr is deprecated
        $.ajax({
            // url: this.link,
            url: "Winter 2019/1.csv",
            context: document.body
        }).done(this.processData);
    }

    processData(allText) {
        console.log(allText);
        var allTextLines = allText.split(/\r\n|\n/);
        var problems = [[]];
        this.announcements = []
        
        for (var i = 1; i < allTextLines.length; i++) {
            var data = allTextLines[i].split(',');
            var t = "Solution";
            if (problems[problems.length-1].length === 3) {
                problems.push([]);
            }

            if(!this.end){
                t = "Help";
                // make sure no solution is shown since session is ongoing
                data[3] = "";
            }

            console.log(data[4], this.session);

            // if this entry is from the current session
            if (data[4] === this.session.toString()){
                if (data[2] === "announcement") {
                    this.announcements.push(
                        <Announcement
                            key = {data[0]}
                            name = {data[0]}
                            desc = {data[1]}
                            con = {data[5]}
                        >
                        </Announcement>
                    )
                } else {
                    problems[problems.length-1].push(
                        <Col md='4' className="height">
                            <Problem    
                                name = {data[0]}
                                link = {data[1]}
                                diff = {data[2]}
                                slink =  {data[3]}
                                con = {data[5]}
                                week = {this.week}
                                quarter = {this.quarter}
                                session = {this.session}
                                txt = {t}
                            >
                            </Problem>
                        </Col>
                    );
                }
            }
            
        }

        if(problems.length > 0) {
            // if last entry is empty, pop it
            if (problems[problems.length-1].length === 0) {
                problems.pop();
            }

            if (problems.length > 0) {
                while (problems[problems.length-1].length < 3) {
                    // make sure these don't cause out of bounds error
                    problems[problems.length-1].push(null);
                }
            }
        }

        // make the rows of maximum 3 problems
        for (var j=0; j<problems.length; j++){
            this.rows.push(
                <Row key={(j+100).toString()} className="space center">
                    {problems[j][0]}
                    {problems[j][1]}
                    {problems[j][2]}
                </Row>
            );
        }
        console.log(problems);
        this.rows = <div>{this.rows}</div>;     // to fix issues on displaying
        this.toggle();                          // re-render
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    render() {
        return (
            <Container>
                {this.announcements}
                {this.rows}
            </Container>
        );
    }
}