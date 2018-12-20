
import React, { Component } from 'react';
import { Container} from 'reactstrap';
import Week from './Week/Week';
import './Quarter.css';

export default  class Quarter extends Component {
    constructor(props) {
        super(props);
        this.quarter = props.quarter;
        this.weeks=[]
        for(var i=1; i<=11; i++){
            var week = <Week key = {i} week={i.toString()} quarter={this.quarter}></Week>
            if(week!=null){this.weeks.push(week);}
        }
    }

    render() {
        if(this.weeks.length==0){
            return null;
        }else{
            return (
                <Container>
                    {this.weeks}
                </Container>
            );
        }
    }
}
