import React, { Component } from 'react';
import { Col, Card, CardBody, CardTitle, Row } from 'reactstrap';
import config from '../../../../../../config.js';
import './Problem.css';
import Solution from '../Solution/Solution';
import { SocialIcon } from 'react-social-icons';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import logo from '../../../../../../../acm_logo.svg';
import LikeIcon from '@material-ui/icons/ThumbUp';
import DislikeIcon from '@material-ui/icons/ThumbDown';
import { Carousel } from 'react-responsive-carousel';
import firebase from 'firebase/app';

export default class Problem extends Component {
    constructor(props) {
        super(props);
        this.solution = null;
        this.conNames = '';
        this.like = this.like.bind(this);
        this.dislike = this.dislike.bind(this);
        this.state = {
            status: localStorage.getItem(
                'acm-uci-website/problem/' + props.identifier
            )
        };
        if (
            props.diff === 'easy' ||
            props.diff === 'med' ||
            props.diff === 'hard' ||
            props.diff === 'icpc' ||
            props.diff === 'codealong' ||
            props.diff === 'event' ||
            props.diff === 'competition'
        ) {
            var txt = props.txt;
            if (props.diff === 'event') {
                txt = 'Info';
            }

            var cons = props.con;
            if (cons.length === 0 || cons === undefined || cons[0] === '') {
                cons = ['acmuciguest'];
            }

            var pc = 'pc';
            if (props.note !== undefined && props.note !== '') {
                pc = '';
            }
            var probContributors = [];
            for (var con = 0; con < cons.length; con++) {
                var contrib = cons[con];
                if (props.contributors.hasOwnProperty(contrib)) {
                    if (contrib !== 'acmuciguest') {
                        if (con === cons.length - 1 && cons.length > 1) {
                            this.conNames +=
                                ' or ' +
                                props.contributors[contrib].Name.split(' ')[0];
                        } else {
                            this.conNames +=
                                ' ' +
                                props.contributors[contrib].Name.split(' ')[0];
                        }
                    }
                    var icons = [];
                    if (contrib !== 'acmuciguest') {
                        icons.push(
                            <SocialIcon
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ margin: '1%' }}
                                key={contrib + 'email'}
                                url={'mailto:' + contrib + '@uci.edu'}
                            />
                        );
                    }
                    for (var icon in config.social) {
                        var iconLink = config.social[icon];
                        if (icon in props.contributors[contrib]) {
                            icons.push(
                                <SocialIcon
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ margin: '1%' }}
                                    key={contrib + icon}
                                    url={
                                        iconLink +
                                        props.contributors[contrib][icon]
                                    }
                                />
                            );
                        }
                    }

                    var photo = props.contributors[contrib].Photo;
                    var mar = '5px';
                    var name = <div>{props.contributors[contrib].Name}</div>;
                    if (photo === '' || photo === undefined) {
                        photo = logo;
                    }
                    if (contrib === 'acmuciguest') {
                        mar = '0';
                        name = null;
                    }
                    probContributors.push(
                        <div
                            style={{ background: 'white', marginBottom: mar }}
                            key={contrib}>
                            <Row className="center">
                                <div
                                    style={{
                                        width: '100%',
                                        objectFit: 'contain'
                                    }}>
                                    <img
                                        alt=""
                                        src={photo}
                                        className={pc}
                                        style={{
                                            width: '100%'
                                        }}
                                    />
                                </div>
                            </Row>
                            {name}
                            {icons}
                        </div>
                    );
                }
            }

            var carousel = (
                <Carousel
                    showStatus={false}
                    autoPlay
                    infiniteLoop
                    showThumbs={false}
                    showIndicators={false}>
                    {probContributors}
                </Carousel>
            );

            this.solution = (
                <Solution
                    txt={txt}
                    week={props.week}
                    link={props.slink}
                    quarter={props.quarter}
                    con={props.con[0]}
                    conName={this.conNames}
                    code={props.code}
                    note={props.note}
                    contributors={carousel}
                />
            );
        }
        this.obj = (
            <CardTitle>
                <a href={props.link} target="_blank" rel="noopener noreferrer">
                    {props.name}{' '}
                </a>
            </CardTitle>
        );

        if (props.evnt !== 'yes') {
            this.diff = props.diff + ' probcard minh';
        } else {
            this.diff = props.diff + ' evntcard minh';
        }
    }

    like(evt) {
        var sub_dislike = 0;
        var add_like = 0;

        var store = localStorage.getItem(
            'acm-uci-website/problem/' + this.props.identifier
        );

        localStorage.setItem(
            'acm-uci-website/problem/' + this.props.identifier,
            'like'
        );

        if (store === 'dislike') {
            sub_dislike = 1;
            add_like = 1;
        }

        if (store === null) add_like = 1;

        if (sub_dislike || add_like) {
            var postRef = firebase
                .database()
                .ref('submissions/' + this.props.identifier);

            postRef.transaction(function(p) {
                if (p['Ratings']) {
                    var poll = p['Ratings'];
                    if (!poll.hasOwnProperty('like')) poll['like'] = 0;
                    if (!poll.hasOwnProperty('dislike')) poll['dislike'] = 0;
                    poll['like'] += add_like;
                    poll['dislike'] -= sub_dislike;
                } else {
                    p['Ratings'] = {
                        like: 1,
                        dislike: 0
                    };
                }
                return p;
            });
        }

        this.setState({ status: 'like' });
    }

    dislike(evt) {
        var sub_like = 0;
        var add_dislike = 0;

        var store = localStorage.getItem(
            'acm-uci-website/problem/' + this.props.identifier
        );

        localStorage.setItem(
            'acm-uci-website/problem/' + this.props.identifier,
            'dislike'
        );

        if (store === 'like') {
            sub_like = 1;
            add_dislike = 1;
        }

        if (store === null) add_dislike = 1;

        if (sub_like || add_dislike) {
            var postRef = firebase
                .database()
                .ref('submissions/' + this.props.identifier);

            postRef.transaction(function(p) {
                if (p['Ratings']) {
                    var poll = p['Ratings'];
                    if (!poll.hasOwnProperty('like')) poll['like'] = 0;
                    if (!poll.hasOwnProperty('dislike')) poll['dislike'] = 0;
                    poll['dislike'] += add_dislike;
                    poll['like'] -= sub_like;
                } else {
                    p['Ratings'] = {
                        like: 0,
                        dislike: 1
                    };
                }
                return p;
            });
        }

        this.setState({ status: 'dislike' });
    }

    render() {
        var clike = null;
        var cdislike = null;
        if (this.state.status === 'like') clike = '#02284B';
        else if (this.state.status === 'dislike') cdislike = '#02284B';
        return (
            <Card className={this.diff}>
                <Col className="likebuttons">
                    <LikeIcon
                        className="rateicons"
                        onClick={this.like}
                        style={{ color: clike }}
                    />
                    <DislikeIcon
                        className="rateicons"
                        onClick={this.dislike}
                        style={{ color: cdislike }}
                    />
                </Col>
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
