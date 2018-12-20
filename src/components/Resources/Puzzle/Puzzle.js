
import React, { Component } from 'react';
import {Alert, Row} from 'reactstrap';
import Navigation from '../../Navbar/Navbar';
import Banner from '../../Banner/Banner';
import Past from './Past/Past';
import Present from './Present/Present';
import './Puzzle.css';

class Puzzle extends Component {


    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
        
        // QUARTER
        // calculating which quarter we are in (based on start time of first meeting in UTC minus 1 hour)
        var quarters = ["Fall 2018", "Winter 2019", "Spring 2020"];
        var startDates = [  new Date("October 5, 2018 03:00:00"), new Date("January 9, 2019 02:00:00"), 
                            new Date("March 29, 2019, 02:00:00")]
        var today = new Date();
        var utc_ms = today.getTime() + today.getTimezoneOffset()*60*1000;
        var i = 0;
        while(i+1<startDates.length && startDates[i+1].getTime()<=utc_ms){
            i+=1;
        }
        this.quarter = quarters[i];

        // WEEK
        // calculating which week we are in (based on start time of first meeting in UTC minus 1 hour)
        // will post questions 1 hr before meeting starts
        // will post solutions right after the meeting ends
        this.week = ((utc_ms-startDates[i].getTime())/1000/60/60/24/7+.5).toFixed(0);

        // SESSION
        // calculating if the latest meeting session is (UTC)
        var day = today.getUTCDay();
        var time = today.getUTCHours();
        var session_1 = startDates[i].getUTCDay();
        var session_2 = session_1+2;
        var session_time = startDates[i].getUTCHours();
        this.session = "1";
        if (day>session_2 || (day==session_2 && time>=session_time) || day<session_1 || (day==session_1 && time<session_time))
        {this.session = "2";}

        // Handling after quarter dates
        if (this.week>11){
            this.session = 2;
            this.week = 11;
        }

        // List of quarters that will be included in past solutions
        this.quarters = quarters.slice(0,i+1);

    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    render() {
        return (
        <div className = "center">
            <Navigation></Navigation>
            <Banner lead="Weekly Problems and Solutions" leadSub="Ready to get your minds blown?"></Banner>
            <div className='center'>
                <Row className="center">
                    <Alert className="easy m">
                        Easy
                    </Alert>
                    <Alert className="med m">
                        Medium
                    </Alert>
                    <Alert className="hard m">
                        Hard
                    </Alert>
                    <Alert className="icpc m">
                        ICPC
                    </Alert>
                    <Alert className="codealong m">
                        Code Along
                    </Alert>
                    <Alert className="event m">
                        Event
                    </Alert>
                </Row>
            </div>

            <div className = "small center">
                <Present week={this.week} quarter={this.quarter} session={this.session}></Present>
            </div>

            <div className = "small center">
                <Past week={this.week} quarters={this.quarters} session={this.session} className = "center"></Past>
            </div>

            <div><br/><br/></div>
            

        </div>
        );
    }
}

export default Puzzle;