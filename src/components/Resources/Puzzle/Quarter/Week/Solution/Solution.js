import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Row, Container} from 'reactstrap';
import './Solution.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNight } from 'react-syntax-highlighter/dist/styles/hljs';
import fblogo from "../../../../../../img/fb.png";
import processCon from "../processCon"

var Python = (codeString) => {
  return <SyntaxHighlighter language='python' style={tomorrowNight}>{codeString}</SyntaxHighlighter>;  
}

var Cpp = (codeString) => {
    return <SyntaxHighlighter language='cpp' style={tomorrowNight}>{codeString}</SyntaxHighlighter>;  
}


export default class Solution extends Component {

    constructor(props) {
        super(props);
        this.show = props.sol;
        this.state = {
            modal: false
        };
        this.toggle = this.toggle.bind(this);
        this.type = (props.link.split("."));
        this.type = this.type[this.type.length-1];
        this.link = props.link;
        this.con = props.con;
        this.txt = props.txt;

        if(props.link===""){
            var fb=processCon(props.con);
            if(this.con===""){
                this.con = " Any Board Member";
            }
            this.link="Bother "+this.con;
            this.code = <Container>
                <Row className = "center">
                    <img alt={this.con+"'s photo"} className="pc" src={fb[1]}/>
                </Row>
                <Row className = "center">
                    <a href = {fb[0]} target="_blank">
                        <img  alt="facebook link" className='fb' src={fblogo}/>
                    </a>
                </Row>
            </Container>
        }
        else{
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "solutions/"+props.quarter+"/"+props.week+"/"+props.link, false);
            xhr.send();
            if(this.type==='py'){
                this.code = Python(xhr.responseText);
            }else{
                this.code = Cpp(xhr.responseText);
            }
        }
        
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    

    render() {

    if (true){
        return (
          <div>
            <Button className = "btn-sol" onClick={this.toggle}>{this.txt}</Button>
            <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>{this.link}</ModalHeader>
              <ModalBody>{this.code}</ModalBody>
            </Modal>
          </div>
        );
    }else{
        return null;
    }
    
  }
}