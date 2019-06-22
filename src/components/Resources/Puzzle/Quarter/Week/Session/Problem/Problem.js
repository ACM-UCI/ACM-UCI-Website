import React, { Component } from 'react';
import { Col, Card, CardBody, CardTitle, Row } from 'reactstrap';
import config from '../../../../../../config.js';
import './Problem.css';
import Solution from '../Solution/Solution';
import { SocialIcon } from 'react-social-icons';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import logo from '../../../../../../../acm_logo.svg';
import { Carousel } from 'react-responsive-carousel';

export default class Problem extends Component {
    constructor(props) {
        super(props);
        this.solution = null;
        this.conNames = '';
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
            console.log(cons);
            for (var con = 0; con < cons.length; con++) {
                var contrib = cons[con];
                if (props.contributors.hasOwnProperty(contrib)) {
                    if (contrib != 'acmuciguest') {
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
                                style={{ margin: '1%' }}
                                key={contrib + icon}
                                url={'mailto:' + contrib + '@uci.edu'}
                            />
                        );
                    }
                    for (var icon in config.social) {
                        var iconLink = config.social[icon];
                        if (icon in props.contributors[contrib]) {
                            icons.push(
                                <SocialIcon
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
                <a href={props.link}>{props.name}</a>
            </CardTitle>
        );

        if (props.evnt !== 'yes') {
            this.diff = props.diff + ' probcard minh';
        } else {
            this.diff = props.diff + ' evntcard minh';
        }
    }

    render() {
        return (
            <Card className={this.diff}>
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
