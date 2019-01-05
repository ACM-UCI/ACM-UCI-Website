import React, { Component } from 'react';
import { Alert, Row, Col} from 'reactstrap';
import Problem from './Problem/Problem';
import Announcement from './Announcement/Announcement';
import $ from 'jquery';
import './Session.css';

export default class Session extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.processData = this.processData.bind(this);
        this.state = { collapse: false };
        this.week = props.week;
        this.quarter = props.quarter;
        this.session = props.session;
        this.rows = [[]];
        this.link = "https://raw.githubusercontent.com/MetaNovitia/ACM-UCI-Website/master/public/"+
                    this.quarter.split(' ')[0] + "%20" + 
                    this.quarter.split(' ')[1] + "/" + 
                    this.week +".csv";
    }

    // NEED TO CHECK
    componentDidMount() {
        // should be changed to axios request, xhr is deprecated
        $.ajax({
            url: this.link,
            context: document.body
        }).done(this.processData);
    }

    processData(allText) {
        var allTextLines = allText.split(/\r\n|\n/);
        var problems = [[]];
        this.announcements = [];
        
        for (var i=1; i<allTextLines.length; i++) {
            var data = allTextLines[i].split(',');

            if(problems[problems.length-1].length===3){
                problems.push([]);
            }

            if (data[4]===this.session){
                if(data[2]==="announcement"){
                    this.announcements.push(
                        <Announcement
                            key = {data[0]}
                            name = {data[0]}
                            desc = {data[1]}
                            con = {data[5]}
                        >
                        </Announcement>
                    )
                }else{
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
        }

        if(problems[0].length>0){
            
            if(problems[problems.length-1].length===0){
                problems.pop();
            }
            if(problems.length>0){
                while(problems[problems.length-1].length<3){
                    problems[problems.length-1].push(null);
                }
            }

            for (var j=0; j<problems.length; j++){
                this.rows.push(
                    <Row key={j.toString()} className="space center">
                        {problems[j][0]}
                        {problems[j][1]}
                        {problems[j][2]}
                    </Row>
                );
            }
        }else{
            this.rows.push(
                    <Alert  key={this.quarter+this.week+this.session} 
                            className="nothing">
                        Nothing to see here :)
                    </Alert>
            )
        }

        this.toggle();

    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    render() {
        return (
            <Row className="topmar">
                <pre>S E S S I O N   {this.session}</pre>
                <div className="back" >
                    {this.announcements}
                    {this.rows}
                </div>
            </Row>
            
        );
    }
}