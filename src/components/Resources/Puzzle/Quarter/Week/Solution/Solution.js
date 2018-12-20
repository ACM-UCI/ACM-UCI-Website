import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Row } from 'reactstrap';
import './Solution.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNight } from 'react-syntax-highlighter/dist/styles/hljs';
import fblogo from "../../../../../../img/fb.png";

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
            this.code = <Row className = "center">
                <a href = {fb} target="_blank">
                    <img  className='fb' src={fblogo}/>
                </a>
            </Row>
        }
        else{
            this.link = "solutions/"+props.quarter+"/"+props.week+"/"+props.link;
            var xhr = new XMLHttpRequest();
            xhr.open("GET", this.link, false);
            xhr.send();
            if(this.type=='py'){
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
            <Button onClick={this.toggle}>Solution</Button>
            <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>{this.props.link}</ModalHeader>
              <ModalBody>{this.code}</ModalBody>
            </Modal>
          </div>
        );
    }else{
        return null;
    }
    
  }
}