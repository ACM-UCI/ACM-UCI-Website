import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getDatabase, ref, runTransaction, onValue } from 'firebase/database';
import { Col, Card, Row } from 'react-bootstrap';
import './Problem.css';
import { SocialIcon } from 'react-social-icons';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Carousel } from 'react-responsive-carousel';
import Solution from '../Solution/Solution';
import logo from '../../../../../../../acm_logo.svg';
import config from '../../../../../../config';
import firebase from '../../../../../../../Firebase';

const db = getDatabase();

export default class Problem extends Component {
    constructor(props) {
        super(props);
        this.store_key = `acm-uci-website/problem/${props.identifier}/${props.quarter}${props.week}${props.session}`;
        this.solution = null;
        this.conNames = '';
        this.sessName = `${props.quarter}/${props.week.toString()}/${
            props.session
        }`;
        this.postRef = ref(db, `submissions/${props.identifier}/Session/`);

        this.setLike = this.setLike.bind(this);
        this.clickedLink = this.clickedLink.bind(this);
        this.openedModal = this.openedModal.bind(this);
        this.state = {
            status: localStorage.getItem(`${this.store_key}/Rating`),
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
            let { txt } = props;
            if (props.diff === 'event') {
                txt = 'Info';
            }

            let cons = props.con;
            if (cons.length === 0 || cons === undefined || cons[0] === '') {
                cons = ['acmuciguest'];
            }

            let pc = 'pc';
            if (props.note !== undefined && props.note !== '') {
                pc = '';
            }
            const probContributors = [];
            for (let con = 0; con < cons.length; con++) {
                const contrib = cons[con];
                if (contrib in props.contributors) {
                    if (contrib !== 'acmuciguest') {
                        if (con === cons.length - 1 && cons.length > 1) {
                            this.conNames += ` or ${
                                props.contributors[contrib].Name.split(' ')[0]
                            }`;
                        } else {
                            this.conNames += ` ${
                                props.contributors[contrib].Name.split(' ')[0]
                            }`;
                        }
                    }
                    const icons = [];
                    if (contrib !== 'acmuciguest') {
                        icons.push(
                            <SocialIcon
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ margin: '1%' }}
                                key={`${contrib}email`}
                                url={`mailto:${contrib}@uci.edu`}
                            />
                        );
                    }
                    Object.entries(config.social).forEach((icon, iconLink) => {
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
                    });

                    let photo = props.contributors[contrib].Photo;
                    let mar = '5px';
                    let name = <div>{props.contributors[contrib].Name}</div>;
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
                            key={contrib}
                        >
                            <Row className="center">
                                <div
                                    style={{
                                        width: '100%',
                                        objectFit: 'contain',
                                    }}
                                >
                                    <img
                                        alt=""
                                        src={photo}
                                        className={pc}
                                        style={{
                                            width: '100%',
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

            const carousel = (
                <Carousel
                    showStatus={false}
                    autoPlay
                    infiniteLoop
                    showThumbs={false}
                    showIndicators={false}
                >
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
                    onClick={() => this.openedModal(txt)}
                />
            );
        }
        // end carousel //

        this.obj = (
            <Card.Title onClick={this.clickedLink} style={{ fontSize: 20 }}>
                <a href={props.link} target="_blank" rel="noopener noreferrer">
                    {props.name}{' '}
                </a>
            </Card.Title>
        );

        if (props.evnt !== 'yes') {
            this.diff = `${props.diff} probcard minh`;
        } else {
            this.diff = `${props.diff} evntcard minh`;
        }
    }

    // set a like/dislike for problem rating
    setLike(value) {
        const ratings = { like: 0, dislike: 0 };

        // check and set status
        const store = localStorage.getItem(`${this.store_key}/Rating`);
        localStorage.setItem(`${this.store_key}/Rating`, value);

        // if previous was a dislike, change vote
        if (store === 'dislike' && value === 'like') ratings.dislike = -1;
        else if (store === 'like' && value === 'dislike') ratings.like = -1;

        if (value !== store) {
            ratings[value] = 1;
            runTransaction(this.postRef, (post) => {
                if (post) {
                    // look for index of session that problem is located in
                    var index = post.map((v) => v.Name).indexOf(this.sessName);

                    if (index !== -1) {
                        post[index]['Ratings']['like'] += ratings.like;
                        post[index]['Ratings']['dislike'] += ratings.dislike;
                    }
                }
                return post;
            });
        }

        this.setState({ status: value });
    }

    // add click count
    clickedLink() {
        // check and set status
        const store = localStorage.getItem(`${this.store_key}/Clicked`);

        if (store === null) {
            localStorage.setItem(`${this.store_key}/Clicked`, 'true');

            runTransaction(this.postRef, (post) => {
                if (post) {
                    // look for index of session that problem is located in
                    const index = post
                        .map((v) => v.name)
                        .indexOf(this.sessName);

                    if (index !== -1) {
                        post[index].clicks += 1;
                    }
                }
                return post;
            });
        }
    }

    // add solution or hint view count
    openedModal(value) {
        let newValue = value;
        if (value !== 'Solution' && value !== 'Help') newValue = 'Info';

        // check and set status
        const store = localStorage.getItem(
            `${this.store_key}/${newValue}Viewed`
        );

        if (store === null) {
            localStorage.setItem(`${this.store_key}/${newValue}Viewed`, 'true');

            runTransaction(this.postRef, (post) => {
                if (post) {
                    // look for index of session that problem is located in
                    const index = post
                        .map((v) => v.Name)
                        .indexOf(this.sessName);

                    if (index !== -1) {
                        post[index][
                            `${newValue === 'Help' ? 'Hint' : newValue}Views`
                        ] += 1;
                    }
                }
                return post;
            });
        }
    }

    render() {
        let clike = null;
        let cdislike = null;
        const { status } = this.state;
        if (status === 'like') clike = '#02284B';
        else if (status === 'dislike') cdislike = '#02284B';
        return (
            <Card className={this.diff}>
                <Col className="likebuttons">
                    <ThumbUpIcon
                        className="rateicons"
                        onClick={() => this.setLike('like')}
                        style={{ color: clike }}
                    />
                    <br />
                    <ThumbDownIcon
                        className="rateicons"
                        onClick={() => this.setLike('dislike')}
                        style={{ color: cdislike }}
                    />
                </Col>
                <Card.Body>
                    <Col style={{ marginTop: '20px' }}>
                        {this.obj}
                        {this.solution}
                    </Col>
                </Card.Body>
            </Card>
        );
    }
}

Problem.propTypes = {
    identifier: PropTypes.string.isRequired,
    quarter: PropTypes.string.isRequired,
    week: PropTypes.number.isRequired,
    session: PropTypes.number.isRequired,
    diff: PropTypes.string.isRequired,
    txt: PropTypes.string.isRequired,
    con: PropTypes.array.isRequired,
    note: PropTypes.string.isRequired,
    contributors: PropTypes.object.isRequired,
    code: PropTypes.string.isRequired,
    slink: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    evnt: PropTypes.string,
};

Problem.defaultProps = {
    evnt: '',
};
