
import React, { Component } from 'react';
import { Alert, Row } from 'reactstrap';
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
        var startDates =    [   
                                new Date('October 2, 2018 18:00:00 GMT+07:00').getTime(),
                                new Date('January 8, 2019 17:00:00 GMT+08:00').getTime(),
                                new Date('April 2, 2019 17:00:00 GMT+07:00').getTime()
                            ]
        
        // change below for testing [ place desired date inside Date() ]
        var today = new Date().getTime();
        // index of the quarter we are in
        var i = 0;
        while (i+1 < startDates.length && startDates[i+1] <= today) {
            i+=1;
        }
        this.quarter = quarters[i];

        // WEEK
        // calculating which week we are in (based on start time of first meeting in UTC minus 1 hour)
        // will post questions 1 hr before meeting starts
        // will post solutions right after the meeting ends
        // adding .5 will make sure number is rounded up
        this.week = ((today-startDates[i])/1000/60/60/24/7+.5).toFixed(0);

        // SESSION
        // calculating what the latest meeting session is (UTC)
        // mod 7 to make sure numbers stay in week range
        var ses = Math.floor((today-startDates[i])/1000/60/60/24)%7;
        // Usually Tuesday
        if (ses < 2){
            this.session = "1";
        // Usually Thursday
        } else {
            this.session = "2";
        }

        // END
        // check if the session ended, assuming each session lasts 2 hours
        // note that ses === 0 corresponds to Tuesday, and ses === 2 corresponds to Thursday
        var tm = ((today-startDates[i])/1000/60/60)%24;
        if ((ses === 0 || ses === 2) && tm < 3) {
            this.end = false;
        } else {
            this.end = true;
        }

        // Handling after quarter dates
        if (this.week > 11) {
            this.session = "2";
            this.week = "11";
            this.end = true;
        }

        // List of quarters that will be included in past solutions
        // note ".slice" does not include end argument
        this.quarters = quarters.slice(0,i+1);
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    render() {
        return (
            <div className = "center">
                <Navigation></Navigation>
                <Banner lead="Weekly Problems and Solutions" 
                        leadSub="Ready to get your minds blown?"
                ></Banner>
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

                <div className="small center">
                    <Present 
                        end = {this.end} 
                        week={this.week} 
                        quarter={this.quarter} 
                        session={this.session}
                    ></Present>
                </div>

                <br/>

                <div className="small center">
                    <Past 
                        week={this.week} 
                        quarters={this.quarters} 
                        session={this.session} 
                        className="center"
                    ></Past>
                </div>

                <div><br/><br/></div>
                

            </div>
        );
    }
}

export default Puzzle;