import React, { Component } from 'react';
import {Alert, Button, Container, Row, Modal, ModalHeader, ModalBody} from 'reactstrap';
import './Announcement.css';
import processCon from '../processCon'
import fblogo from "../../../../../../../img/fb.png";


export default class Announcement extends Component {

  constructor(props){
    super(props);
    this.state = {
        modal: false
    };
    this.toggle = this.toggle.bind(this);
    this.name = props.name;
    this.desc = props.desc;
    this.con = props.con;
    this.cname = props.con;
    this.fb = processCon(this.con);
    if(this.con!=""){
      this.con = 
        <Button 
            onClick={this.toggle}
            style={{  marginLeft: '1%',
                      height: '30%',
                      fontSize:'10px',
                      color: 'white'
                    }}
        >{this.con}</Button>;
    }
  }

  toggle() {
      this.setState({
          modal: !this.state.modal
      });
  }

  render() {
    return (
      <div>
        <Alert color="dark" fade={false}>
          {this.name}: {this.desc} {this.con}
        </Alert>
        <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>{this.cname}</ModalHeader>
            <ModalBody>
              <Row className = "center">
                  <img alt={this.con+"'s photo"} className="pc" src={this.fb[1]}/>
              </Row>
              <Row className = "center">
                  <a href = {this.fb[0]} target="_blank">
                      <img  alt="facebook link" className='fb' src={fblogo}/>
                  </a>
              </Row>
            </ModalBody>
        </Modal>
      </div>
    );
  }
}