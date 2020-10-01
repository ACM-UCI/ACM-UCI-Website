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
import firebase from '../../../../../../../Firebase';

export default class Problem extends Component {
    constructor(props) {
        super(props);
        this.store_key =
            'acm-uci-website/problem/' +
            props.identifier +
            '/' +
            props.quarter +
            props.week +
            props.session;
        this.solution = null;
        this.conNames = '';
        this.set_like = this.set_like.bind(this);
        this.clicked_link = this.clicked_link.bind(this);
        this.opened_modal = this.opened_modal.bind(this);
        this.state = {
            status: localStorage.getItem(this.store_key + '/Rating')
        };

        // making carousel //
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
                    onClick={() => this.opened_modal(txt)}
                />
            );
        }
        // end carousel //

        this.obj = (
            <CardTitle onClick={this.clicked_link} style={{ fontSize: 20 }}>
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

    // set a like/dislike for problem rating
    set_like(value) {
        var ratings = { like: 0, dislike: 0 };

        // check and set status
        var store = localStorage.getItem(this.store_key + '/Rating');
        localStorage.setItem(this.store_key + '/Rating', value);

        // if previous was a dislike, change vote
        if (store === 'dislike' && value === 'like') ratings.dislike = -1;
        else if (store === 'like' && value === 'dislike') ratings.like = -1;

        if (value !== store) {
            ratings[value] = 1;

            var postRef = firebase
                .database()
                .ref('submissions/' + this.props.identifier + '/Session/');

            var sess_name =
                this.props.quarter +
                '/' +
                this.props.week.toString() +
                '/' +
                this.props.session;

            // this updates the firebase and avoid race condition
            postRef.transaction(function(p) {
                // look for index of session that problem is located in
                var index = p.map(v => v.Name).indexOf(sess_name);

                if (index !== -1) {
                    p[index]['Ratings']['like'] += ratings.like;
                    p[index]['Ratings']['dislike'] += ratings.dislike;
                }

                return p;
            });
        }

        this.setState({ status: value });
    }

    // add click count
    clicked_link() {
        // check and set status
        var store = localStorage.getItem(this.store_key + '/Clicked');

        if (store === null) {
            localStorage.setItem(this.store_key + '/Clicked', 'true');
            var postRef = firebase
                .database()
                .ref('submissions/' + this.props.identifier + '/Session/');

            var sess_name =
                this.props.quarter +
                '/' +
                this.props.week.toString() +
                '/' +
                this.props.session;

            // this updates the firebase and avoid race condition
            postRef.transaction(function(p) {
                // look for index of session that problem is located in
                var index = p.map(v => v.Name).indexOf(sess_name);

                if (index !== -1) {
                    p[index]['Clicks'] += 1;
                }

                return p;
            });
        }
    }

    // add solution or hint view count
    opened_modal(value) {
        if (value !== 'Solution' && value !== 'Help') value = 'Info';

        // check and set status
        var store = localStorage.getItem(
            this.store_key + '/' + value + 'Viewed'
        );

        if (store === null) {
            localStorage.setItem(
                this.store_key + '/' + value + 'Viewed',
                'true'
            );
            var postRef = firebase
                .database()
                .ref('submissions/' + this.props.identifier + '/Session/');

            var sess_name =
                this.props.quarter +
                '/' +
                this.props.week.toString() +
                '/' +
                this.props.session;

            // this updates the firebase and avoid race condition
            postRef.transaction(function(p) {
                // look for index of session that problem is located in
                var index = p.map(v => v.Name).indexOf(sess_name);

                if (index !== -1) {
                    p[index][
                        (value === 'Help' ? 'Hint' : value) + 'Views'
                    ] += 1;
                }

                return p;
            });
        }
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
                        onClick={() => this.set_like('like')}
                        style={{ color: clike }}
                    />
                    <br />
                    <DislikeIcon
                        className="rateicons"
                        onClick={() => this.set_like('dislike')}
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
