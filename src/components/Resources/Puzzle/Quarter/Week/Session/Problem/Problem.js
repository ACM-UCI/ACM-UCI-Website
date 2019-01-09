import React, { Component } from 'react';
import { Col, Card, CardBody, CardTitle} from 'reactstrap';
import './Problem.css';
import Solution from '../Solution/Solution';
import processCon from '../processCon.js';

export default class Problem extends Component {

  constructor(props) {
    super(props);
    this.con = props.con;
    this.solution=null;
    if( props.diff==="easy" || 
        props.diff==="med" || 
        props.diff==="hard" || 
        props.diff==="icpc" || 
        props.diff==="codealong"){
          this.solution = <Solution 
                            txt = {props.txt} 
                            week = {props.week} 
                            link={props.slink} 
                            quarter = {props.quarter} 
                            con = {this.con}
                          ></Solution>
    }
    this.link = props.link
    this.obj = <CardTitle>{props.name}</CardTitle>
    if( props.diff==="easy" || 
        props.diff==="med" || 
        props.diff==="hard" || 
        props.diff==="icpc" || 
        props.diff==="codealong" ||
        props.diff==="event"){
          if(props.link===""){
            this.link = processCon(props.con)[0];
          }
          this.obj =  <a  className= {"word "+this.props.diff} 
                        href={this.link} 
                        target="_blank">
                        {this.obj}
                      </a>
    
    }
    
  }

  render() {
    return (
      <Card className={this.props.diff+" probcard"}>
        <CardBody>
            <Col>
                {this.obj}
                {this.solution}
            </Col>
        </CardBody>
      </Card>
    );
  }
}