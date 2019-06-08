import React, { Component } from 'react';
import { Button, Container, Col, Row, Input, Alert } from 'reactstrap';
import './Profile.css';
import firebase from 'firebase/app';
import 'firebase/database';
import logo from '../../../acm_logo.svg';
import { SocialIcon } from 'react-social-icons';

export default class Log extends Component {
    constructor(props) {
        super(props);

        this.processData = this.processData.bind(this);
        this.res = this.res.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.update = this.update.bind(this);

        this.state = { imw: '40%' };
        this.space = '0';
        if (window.innerWidth <= 782) {
            this.space = '5%';
            this.state.imw = '100%';
        }
        this.profile = {};
        this.owner = props.owner;
        this.pic = logo;
        window.onresize = this.res;
        this.alert = null;
        this.icons = [];
    }

    update() {
        var u = {};
        u['logs/' + this.owner] = this.profile;
        firebase
            .database()
            .ref()
            .update(u);
        this.alert = <Alert color="info">Successfully Updated!</Alert>;
        this.icons = [
            <SocialIcon
                style={{ margin: '1%' }}
                network="email"
                key="email"
                url={'mailto:' + this.owner + '@uci.edu'}
            />
        ];
        if (
            this.profile.LinkedIn !== undefined &&
            this.profile.LinkedIn !== ''
        ) {
            this.icons.push(
                <SocialIcon
                    style={{ margin: '1%' }}
                    key="linkedin"
                    url={'https://www.linkedin.com/in/' + this.profile.LinkedIn}
                />
            );
        }
        if (this.profile.GitHub !== undefined && this.profile.GitHub !== '') {
            this.icons.push(
                <SocialIcon
                    style={{ margin: '1%' }}
                    key="github"
                    url={'https://github.com/' + this.profile.GitHub}
                />
            );
        }
        if (
            this.profile.Facebook !== undefined &&
            this.profile.Facebook !== ''
        ) {
            this.icons.push(
                <SocialIcon
                    style={{ margin: '1%' }}
                    key="facebook"
                    url={'https://www.facebook.com/' + this.profile.Facebook}
                />
            );
        }
        if (this.profile.Photo !== undefined && this.profile.Photo !== '') {
            this.pic = this.profile.Photo;
        } else {
            this.pic = logo;
        }
        this.setState({
            imw: this.state.imw
        });
    }

    componentDidMount() {
        this.callFirebase();
    }

    res() {
        if (this.state.imw === '40%' && window.innerWidth <= 782) {
            this.space = '5%';
            this.setState({
                imw: '100%'
            });
        } else if (this.state.imw === '100%' && window.innerWidth > 782) {
            this.space = '0';
            this.setState({
                imw: '40%'
            });
        }
    }

    callFirebase() {
        var ref = firebase.database().ref();
        ref.on('value', this.processData);
    }

    processData(data) {
        this.profile = data.val()['logs'][this.owner];
        this.icons = [
            <SocialIcon
                style={{ margin: '1%' }}
                network="email"
                key="email"
                url={'mailto:' + this.owner + '@uci.edu'}
            />
        ];
        if (
            this.profile.LinkedIn !== undefined &&
            this.profile.LinkedIn !== ''
        ) {
            this.icons.push(
                <SocialIcon
                    style={{ margin: '1%' }}
                    key="linkedin"
                    url={'https://www.linkedin.com/in/' + this.profile.LinkedIn}
                />
            );
        }
        if (this.profile.GitHub !== undefined && this.profile.GitHub !== '') {
            this.icons.push(
                <SocialIcon
                    style={{ margin: '1%' }}
                    key="github"
                    url={'https://github.com/' + this.profile.GitHub}
                />
            );
        }
        if (
            this.profile.Facebook !== undefined &&
            this.profile.Facebook !== ''
        ) {
            this.icons.push(
                <SocialIcon
                    style={{ margin: '1%' }}
                    key="facebook"
                    url={'https://www.facebook.com/' + this.profile.Facebook}
                />
            );
        }
        if (this.profile.Photo !== undefined && this.profile.Photo !== '') {
            this.pic = this.profile.Photo;
        } else {
            this.pic = logo;
        }
        this.setState({
            imw: this.state.imw
        });
    }

    updateInputValue(e) {
        this.profile[e.target.id] = e.target.value;
        console.log(this.profile);
    }

    render() {
        return (
            <Container style={{ border: '10px solid #02284B ' }}>
                <Row style={{ padding: '5%', paddingBottom: '0' }}>
                    <Col
                        style={{
                            paddingRight: '5%',
                            marginBottom: this.space,
                            maxWidth: this.state.imw,
                            minWidth: this.state.imw
                        }}>
                        <img style={{ maxWidth: '100%' }} src={this.pic} />
                    </Col>
                    <Col
                        style={{
                            fontSize: '20px',
                            fontFamily: 'Verdana,sans-serif',
                            textAlign: 'left'
                        }}>
                        <Row>
                            <Col style={{ maxWidth: '150px' }}>
                                <pre>
                                    Name :<br />
                                    <br />
                                    UCINetID :<br />
                                    <br />
                                    Position :<br />
                                    <br />
                                    Photo :<br />
                                    <br />
                                    LinkedIn :<br />
                                    <br />
                                    GitHub :<br />
                                    <br />
                                    Facebook :
                                </pre>
                            </Col>
                            <Col>
                                <pre>
                                    {this.profile.Name} <br />
                                    <br />
                                    {this.owner} <br />
                                    <br />
                                    {this.profile.Position}
                                </pre>
                                <Input
                                    style={{
                                        height: '32px',
                                        marginTop: '28px'
                                    }}
                                    onChange={evt => this.updateInputValue(evt)}
                                    id="Photo"
                                    defaultValue={this.profile.Photo}
                                    placeholder="your profile pic URL"
                                />
                                <Input
                                    style={{
                                        height: '32px',
                                        marginTop: '22px'
                                    }}
                                    onChange={evt => this.updateInputValue(evt)}
                                    id="LinkedIn"
                                    defaultValue={this.profile.LinkedIn}
                                    placeholder="your LinkedIn username"
                                />
                                <Input
                                    style={{
                                        height: '32px',
                                        marginTop: '22px'
                                    }}
                                    onChange={evt => this.updateInputValue(evt)}
                                    id="GitHub"
                                    placeholder="your GitHub username"
                                    defaultValue={this.profile.GitHub}
                                />
                                <Input
                                    style={{
                                        height: '32px',
                                        marginTop: '22px'
                                    }}
                                    onChange={evt => this.updateInputValue(evt)}
                                    id="Facebook"
                                    placeholder="your Facebook username"
                                    defaultValue={this.profile.Facebook}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{ justifyContent: 'center', marginBottom: '3%' }}>
                    {this.icons}
                </Row>
                {this.alert}
                <Button
                    className="submitbtn"
                    style={{ width: '60%' }}
                    onClick={this.update}>
                    Update
                </Button>
                <br />
                <br />
                <br />
            </Container>
        );
    }
}
