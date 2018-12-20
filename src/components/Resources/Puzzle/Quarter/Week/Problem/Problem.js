import React, { Component } from 'react';
import { Col, Card, CardBody, CardTitle} from 'reactstrap';
import './Problem.css';
import Solution from '../Solution/Solution';

export default class Problem extends Component {

  constructor(props) {
    super(props);
    this.solution = null;
    if(props.slink!="NO SOLUTION" && props.slink!=""){
      this.solution = <Solution sol = {props.sol} week = {props.week} link={props.slink} quarter = {props.quarter}></Solution>
    }

    this.link = props.link;
    if(props.link.startsWith("ASK")){
      var fb="https://www.facebook.com/groups/acmuci/";
      if(props.link.endsWith("Karthik")){
          fb = "https://www.facebook.com/karthik.gajulapalli.7";
      }else if(props.link.endsWith("Chinmay")){
          fb = "https://www.facebook.com/sauercraut";
      }else if(props.link.endsWith("Pooya")){
          fb = "https://www.facebook.com/khosravipooya";
      }else if(props.link.endsWith("Bryon")){
          fb = "https://www.facebook.com/btjanaka";
      }else if(props.link.endsWith("Jens")){
          fb = "https://www.facebook.com/jens.tuyls";
      }else if(props.link.endsWith("Blake")){
          fb = "https://www.facebook.com/blake.wakasa";
      }else if(props.link.endsWith("Jacky")){
          fb = "https://www.facebook.com/profile.php?id=100007416798455";
      }else if(props.link.endsWith("Chris")){
          fb = "https://www.facebook.com/christopher.chu.35";
      }else if(props.link.endsWith("Meta")){
          fb = "https://www.facebook.com/meta.novitia";
      }else if(props.link.endsWith("Frank")){
          fb = "https://www.facebook.com/profile.php?id=100012887927941";
      }else if(props.link.endsWith("Tim")){
          fb = "https://www.facebook.com/blazedspeeder";
      }else if(props.link.endsWith("Junlin")){
          fb = "https://www.facebook.com/jack.wang.315080";
      }else if(props.link.endsWith("Armen")){
          fb = "https://www.facebook.com/amouradyan";
      }
      this.link = fb;
    }
    this.obj = <CardTitle>{props.name}</CardTitle>
    if(this.link!=""){
        this.obj =  <a className= {"word "+this.props.diff} href={this.link} target="_blank">
                        {this.obj}
                    </a>
    }
    
  }

  render() {
    return (
      <Card className={this.props.diff}>
        <CardBody>
            <Col className="center">
                {this.obj}
                {this.solution}
            </Col>
        </CardBody>
      </Card>
    );
  }
}