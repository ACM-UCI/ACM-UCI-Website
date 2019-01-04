
import React, { Component } from 'react';
import { Container} from 'reactstrap';
import Week from './Week/Week';
import './Quarter.css';

export default  class Quarter extends Component {
    constructor(props) {
        super(props);
        this.weeks = [];
        
        for (var i = 1; i <= props.week-1; i++){
            var week =  <Week   key = {i} 
                                week={i.toString()} 
                                quarter={props.quarter}
                                session={3}
                        ></Week>
            if (week!=null) {this.weeks.push(week);}
        }

        var last_week = <Week 
                                key = {props.week} 
                                week={props.week.toString()} 
                                quarter={props.quarter}
                                session={props.session}
                        ></Week>
        if(last_week!=null){this.weeks.push(last_week);}

    }

    render() {
        if (this.weeks.length === 0) {
            return null;
        } else {
            return (
                <Container>
                    {this.weeks}
                </Container>
            );
        }
    }
}
