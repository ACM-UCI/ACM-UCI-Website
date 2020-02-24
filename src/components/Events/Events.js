import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardImg,
    CardBody,
    Button
} from 'reactstrap';
import { HashLink as Link } from 'react-router-hash-link';
import Navigation from '../Navbar/Navbar';
import Banner from '../Banner/Banner';
import codingNights from '../../img/girl_coding_nights_event.jpg';
import arnetalk from '../../img/arnetalk.jpg';
import karthiktalk from '../../img/karthiktalk.jpg';
import jenstalk from '../../img/jenstalk.jpg';
import bryontalk from '../../img/bryontalk.jpg';
import chinmaytalk from '../../img/chinmaytalk.jpg';
import jackytalk from '../../img/jackytalk.jpg';
import junlintalk from '../../img/junlintalk.jpg';
import pooyatalk from '../../img/pooyatalk.jpg';
import uipath from '../../img/uiPath.jpg';
import acm_meeting from '../../img/acm_meeting.jpg';
import ieeextreme13 from '../../img/ieeextreme13.jpg';
// import facebook from '../../img/facebook.jpg';
import facebooktech from '../../img/facebooktech.png';
import './Events.css';

class Events extends Component {
    constructor(props) {
        super(props);
        this.scroll = this.scroll.bind(this);
        window.onscroll = this.scroll;
        this.state = {
            tog: false
        };
        this.content = (
            <div>
                {/* <h2 className="mt-3">Next Event</h2> */}

                <h3 className="mt-3">Weekly Schedule</h3>
                <Card body className="card-body">
                    <div>ACM Practice - Winter 2020</div>
                    <div>
                        <strong>Tuesday: </strong>
                        DBH 4011, 6:00 - 8:00 pm <br />
                        <strong>Thursday: </strong>
                        DBH 4011, 6:00 - 8:00 pm
                    </div>
                </Card>
                <hr className="event-line" />
                {/* <Card body className="card-body">
                    <div>Quick Info</div>
                    <div>
                        <ul>
                            <li>
                                <Link
                                    style={{ color: '#32587B' }}
                                    to="/events#FacebookTechTalk">
                                    Facebook Tech Talk
                                </Link>
                                <br />
                                {'Oct 25, TBA @ DBH 6011'}
                            </li>
                        </ul>
                    </div>
                </Card> */}
                {/* <h3 className="mt-3">Quick links</h3> */}
                <Card body className="card-body">
                    <div>Quick Links</div>
                    <div>
                        {/* <Link
                            style={{ color: '#32587B' }}
                            to="/events#upcoming-events">
                            Upcoming Events
                        </Link>{' '}
                        <br /> */}
                        <Link
                            style={{ color: '#32587B' }}
                            to="/events#2019-fall-events">
                            Fall 2019
                        </Link>{' '}
                        <br />
                        <Link
                            style={{ color: '#32587B' }}
                            to="/events#2019-spring-events">
                            Spring 2019
                        </Link>{' '}
                        <br />
                        <Link
                            style={{ color: '#32587B' }}
                            to="/events#2019-winter-events">
                            Winter 2019
                        </Link>{' '}
                        <br />
                        <Link style={{ color: '#32587B' }} to="/blog">
                            Blog
                        </Link>{' '}
                        <br />
                    </div>
                </Card>
            </div>
        );

        this.meeting = (
            <Col
                id="meetingtimes"
                style={{
                    maxWidth: '30%',
                    padding: '2%',
                    marginRight: '5%',
                    paddingLeft: '1%'
                }}>
                {this.content}
            </Col>
        );
    }

    scroll() {
        if (document.getElementById('meetingtimes') !== null) {
            this.y = document
                .getElementById('meetingtimes')
                .getBoundingClientRect().top;
            if (this.y < 10) {
                this.meeting = (
                    <Col
                        id="meetingtimes"
                        style={{
                            maxWidth: '30%',
                            padding: '2%',
                            paddingTop:
                                Math.max(0 - this.y, 20).toString() + 'px',
                            paddingBottom: '0',
                            marginRight: '5%',
                            paddingLeft: '1%'
                        }}>
                        {this.content}
                    </Col>
                );
            }
            this.setState({
                tog: true
            });
        }
    }

    render() {
        return (
            <div>
                <Navigation />
                <Banner
                    lead="Events"
                    leadSub="Let's Learn and Compete Together"
                />
                <Container className="event-body" fluid>
                    <Row>
                        <div className="pseudo" />
                        <Col
                            id="maincol"
                            style={{
                                maxWidth: '65%',
                                padding: '2%',
                                paddingTop: '20px',
                                marginLeft: '5%',
                                paddingRight: '5%'
                            }}>
                            {/* <h2 id="upcoming-events" className="mt-3">
                                Upcoming Events
                            </h2> */}

                            {/* <br /> */}
                            <h2 id="2019-fall-events" className="mt-3">
                                Fall 2019 Events
                            </h2>

                            {/* 1st Meeting */}
                            <Card body className="card-body">
                                <div>
                                    <h3>
                                        1st Meeting: Storm DBH 4011, they can't
                                        stop all of us
                                    </h3>
                                    <i>
                                        Tuesday, October 1st, DBH 4011 @ 6:00pm
                                        - 8:00 pm
                                    </i>
                                </div>
                                <div>
                                    <hr className="event-line" />
                                    <img
                                        style={{
                                            width: '100%'
                                        }}
                                        src={acm_meeting}
                                        alt=""
                                    />
                                    <hr className="event-line" />
                                    Come to our first meeting to learn more
                                    about ACM@UCI and get a slice of fun coding
                                    challenges! Stay updated on this event on
                                    <a
                                        style={{ color: '#3b5998' }}
                                        href={
                                            'https://www.facebook.com/events/2396693600444034/?active_tab=about'
                                        }>
                                        {' '}
                                        Facebook
                                    </a>
                                    .
                                    <br />
                                    <i>P.S. There will be pizza :)</i>
                                </div>
                            </Card>

                            {/* IEEEXtreme 13.0 */}
                            <Card body className="card-body">
                                <div>
                                    <h3>IEEEXtreme 13.0</h3>
                                    <i>
                                        Friday, October 18, 5PM - Saturday,
                                        October 19, 5PM @ DBH 4011
                                    </i>
                                </div>
                                <div>
                                    <hr className="event-line" />
                                    <img
                                        style={{
                                            width: '100%'
                                        }}
                                        src={ieeextreme13}
                                        alt=""
                                    />
                                    <hr className="event-line" />
                                    During the event:
                                    <ol>
                                        <li>
                                            ACM and IEEE will host the
                                            competition in DBH (Donald Bren
                                            Hall) 4011.
                                        </li>
                                        <li>
                                            We have booked the room from 4PM on
                                            October 18 to 6PM on October 19, so
                                            you can arrive as early as 4PM. Keep
                                            in mind you will need time to set
                                            up. Please plan accordingly.
                                        </li>
                                        <li>
                                            We will provide snacks, breakfast,
                                            lunch, and dinner at appropriate
                                            times throughout the competition.
                                        </li>
                                        <li>
                                            Bring any necessary materials,
                                            particularly laptops, power strips,
                                            snacks, sleeping bags, water, and
                                            anything else that will help you
                                            survive 24 hours straight.
                                            <ul>
                                                <li>
                                                    There will be a restroom
                                                    very close to the room, as
                                                    well as a water bottle
                                                    refilling station.
                                                </li>
                                                <li>
                                                    Of course, you may leave
                                                    during the competition.
                                                </li>
                                            </ul>
                                        </li>
                                    </ol>
                                    It was the great Amelia Earhart who once
                                    said, “The most difficult thing is the
                                    decision to act, the rest is merely
                                    tenacity.” Congratulations on your decision
                                    to compete in IEEExtreme. I wish you the
                                    best of luck. Please reach out if you have
                                    any further questions.
                                    <br />
                                    <br />
                                    Sincerely,
                                    <br />
                                    Bryon Tjanaka
                                    <hr className="event-line" />
                                    Results: see our{' '}
                                    <Link
                                        style={{ color: '#32587B' }}
                                        to="/blog/ieeextreme13"
                                        target="_blank">
                                        blog
                                    </Link>
                                    {'!'}
                                </div>
                            </Card>

                            {/* ICPC Qualifiers 2019 */}
                            <Card body className="card-body">
                                <div>
                                    <h3>ICPC 2019 Qualifiers</h3>
                                    <i>
                                        Thursday, October 17, 12:00AM -
                                        Wednesday, October 23, 11:59PM @{' '}
                                        <a
                                            style={{ color: '#32587B' }}
                                            href="https://open.kattis.com/contests/gsp4oi"
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            Kattis
                                        </a>
                                    </i>
                                </div>
                                <div>
                                    <hr className="event-line" />
                                    Interest Form:{' '}
                                    <a
                                        href="http://bit.ly/32aZ6G0"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: '#32587B' }}>
                                        http://bit.ly/32aZ6G0
                                    </a>
                                    <br />
                                    Contest Link:{' '}
                                    <a
                                        style={{ color: '#32587B' }}
                                        href="https://open.kattis.com/contests/gsp4oi"
                                        rel="noopener noreferrer"
                                        target="_blank">
                                        https://open.kattis.com/contests/gsp4oi
                                    </a>
                                    <hr className="event-line" />
                                    Hey everybody,
                                    <br />
                                    <br />
                                    Thank you for your interest in representing
                                    UCI at this year's ICPC SoCal regionals.
                                    Please read the entirety of this email.
                                    We've decided to open the internal
                                    qualifiers a little earlier than mentioned
                                    in the interest form at this
                                    <a
                                        href="http://bit.ly/32aZ6G0"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: '#32587B' }}>
                                        {' '}
                                        link
                                    </a>
                                    .
                                    <br />
                                    <br />
                                    We will be using Kattis as the online judge.
                                    Although ICPC is a group event, this contest
                                    is meant to be done individually. Do not
                                    form teams. The contest will end on
                                    Wednesday, October 23 at 11:59PM.
                                    <br />
                                    <br />
                                    Sign up for the website under your name and
                                    it will be matched with your interest form
                                    from earlier. If your account uses a
                                    separate user name, please ensure that
                                    you've recorded it in the
                                    <a
                                        href="http://bit.ly/32aZ6G0"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: '#32587B' }}>
                                        {' '}
                                        interest form
                                    </a>
                                    . If you know any people who would like to
                                    participate, feel free to forward this email
                                    to them.
                                    <br />
                                    <br />
                                    Some important notices below: You have five
                                    hours to submit your solutions from your
                                    first accepted submission to your last
                                    submission. We will take the five-hour
                                    window which maximizes your score when
                                    taking your final score into consideration,
                                    but you are strongly discouraged from
                                    submitting outside this time as there may be
                                    penalties.
                                    <br />
                                    <br />
                                    NOTE: THE FINAL STANDING OF THE KATTIS
                                    LEADERBOARD DOES NOT REPRESENT YOUR ACTUAL
                                    SCORE**
                                    <br />
                                    <br />
                                    If you are submitting in Python, submit in
                                    Python 2 as it is 100x faster on Kattis.
                                    <br />
                                    <br />
                                    Again, do not create a team in Kattis
                                    <br />
                                    <br />
                                    The contest ends at midnight at midnight
                                    Wednesday 23, 2019 Please review your
                                    qualifications and contest details.
                                    <br />
                                    <br />
                                    For any questions, feel free to respond to
                                    this
                                    <a
                                        href="mailto: acm@uci.edu?subject=[ICPC-Qual-2019]"
                                        style={{ color: '#32587B' }}>
                                        {' '}
                                        email{' '}
                                    </a>
                                    with the subject line including
                                    "[ICPC-Qual-2019]". To ensure that your
                                    performance is recorded,
                                    <a
                                        href="mailto: acm@uci.edu?subject=[ICPC-Qual-2019-Sub]"
                                        style={{ color: '#32587B' }}>
                                        {' '}
                                        email a screenshot of your position on
                                        the leaderboard{' '}
                                    </a>
                                    after your five-hour attempt to acm@uci.edu
                                    with the tag "[ICPC-Qual-2019-Sub]".
                                    <br />
                                    <br />
                                    Thanks,
                                    <br />
                                    ACM@UCI
                                    <br />
                                    <br />
                                    ** ICPC is a timed competition, so in order
                                    to gauge how students solve problems under
                                    time constraints while simultaneously giving
                                    competitors flexibility, the stated window
                                    is much longer.
                                </div>
                            </Card>

                            {/* Facebook Tech Talk */}
                            <Card body className="card-body">
                                <div>
                                    <h3>Facebook Tech Talk</h3>
                                    <i>Friday, October 25, 6-8pm @ DBH 6011</i>
                                </div>
                                <div>
                                    <hr className="event-line" />
                                    <img
                                        style={{
                                            width: '100%'
                                        }}
                                        src={facebooktech}
                                        alt=""
                                    />
                                    <hr className="event-line" />
                                    If you haven't heard of Production
                                    Engineering (PE), that's because it’s a one
                                    of a kind hybrid role that’s only at
                                    Facebook! PEs are software engineers who
                                    focus specifically in our infrastructure
                                    space by improving efficiency, scalability &
                                    reliability across our family of apps &
                                    services. <br />
                                    <br />
                                    Come learn from your own ACM Alumni!
                                    <br />
                                    <br />
                                    We will also dive into how to best prepare
                                    for a systems interview!
                                    <br />
                                    <br />
                                    Hope to see you there!
                                </div>
                            </Card>

                            <br />
                            <h2 id="2019-spring-events" className="mt-3">
                                Spring 2019 Events
                            </h2>

                            {/* UiPath Event */}
                            <Card body className="card-body">
                                <div>
                                    <h3>UiPath Recruiting Event</h3>
                                    <i>
                                        Tuesday, April 9th, DBH 4011 @ 6:30 - 8
                                        pm
                                    </i>
                                </div>
                                <div>
                                    <hr className="event-line" />
                                    <img
                                        style={{
                                            width: '100%'
                                        }}
                                        src={uipath}
                                        alt=""
                                    />
                                    <hr className="event-line" />
                                    Still looking for internships for this
                                    summer and full time offers?? Bring your
                                    resumes to our UiPath event. UiPath is a
                                    leading Robotic Process Automation vendor
                                    providing a complete software platform to
                                    help organizations efficiently automate
                                    business processes. They are also a Unicorn
                                    company.
                                    <br />
                                    <br />
                                    <strong>They're hiring:</strong> <br />
                                    FULLTIME, INTERN - Software Engineer
                                    <br />
                                    INTERN - Business Development
                                    <br />
                                    INTERN - Data Engineering
                                </div>
                            </Card>

                            <br />
                            <h2 id="2019-winter-events" className="mt-3">
                                Winter 2019 Events
                            </h2>

                            {/* JUNLIN */}
                            <Card body className="card-body">
                                <div>
                                    <h3>
                                        Adversarial Attacks on Machine Learning
                                        Models
                                    </h3>
                                    <i>
                                        by Junlin Wang - March 7th, DBH 4011 @
                                        6:30 - 7:30 pm
                                    </i>
                                </div>
                                <div>
                                    <hr className="event-line" />
                                    <img
                                        style={{
                                            width: '100%'
                                        }}
                                        src={junlintalk}
                                        alt=""
                                    />
                                    <hr className="event-line" />
                                    Machine Learning models can be easily fooled
                                    by data that's slightly twisted/modified.
                                    Especially if the data inputted is outside
                                    the distribution of the training data. You
                                    probably have seen the pictures showing that
                                    images look the same to human eyes produce
                                    dramatically different results for ML
                                    models. In this talk, I will talk about a
                                    variety of these kinds of attacks and
                                    possibly why it happens.
                                    <br />
                                    <br />
                                    <strong>Bio:</strong> Junlin Wang is a
                                    junior who is majoring in math and computer
                                    science. Other than being the head of ACM’s
                                    special interest group for AI Junlin enjoys
                                    watching censored videos he can’t see in
                                    China.
                                </div>
                            </Card>

                            {/* POOYA */}
                            <Card body className="card-body">
                                <div>
                                    <h3>
                                        Should We Follow Ant’s Traffic Laws?!
                                    </h3>
                                    <i>
                                        by Pooya Khosravi - February 28th, DBH
                                        4011 @ 6:30 - 7:30 pm
                                    </i>
                                </div>
                                <div>
                                    <hr className="event-line" />
                                    <img
                                        style={{
                                            width: '100%'
                                        }}
                                        src={pooyatalk}
                                        alt=""
                                    />
                                    <hr className="event-line" />
                                    In recent years, the number of automobiles
                                    in California has increased dramatically,
                                    presenting a serious problem of heavy
                                    traffic. Ant colony optimization is a
                                    discrete algorithm inspired by ants to find
                                    shortest path to their destination, using
                                    pheromones. In this talk, we’ll see if
                                    there’s anything to learn from the ants.
                                    <br />
                                    <br />
                                    <strong>Bio:</strong> Pooya is a dynamic
                                    individual, as he is one of the few people
                                    who chooses to study computer science and
                                    biomedical engineering, then minor in music
                                    just for laughs. If you are wondering, Pooya
                                    clearly did not write this.
                                </div>
                            </Card>

                            {/* BRYON */}
                            <Card body className="card-body">
                                <div>
                                    <h3>
                                        Use the Force, Luke: Computer Science
                                        and Molecular Dynamics Force Fields{' '}
                                    </h3>
                                    <i>
                                        by Bryon Tjanaka - February 21th, DBH
                                        4011 @ 6:30 - 7:30 pm
                                    </i>
                                </div>
                                <div>
                                    <hr className="event-line" />
                                    <img
                                        style={{
                                            width: '100%'
                                        }}
                                        src={bryontalk}
                                        alt=""
                                    />
                                    <hr className="event-line" />
                                    Molecular dynamics (MD) simulations are an
                                    important part of the drug discovery
                                    process, enabling scientists to test the
                                    viability of thousands of drugs without
                                    needing to make any of them. An important
                                    part of these simulations is force fields,
                                    sets of parameters which allow the
                                    simulation to make calculations. In this
                                    talk, I will discuss how computer science is
                                    involved with the development and usage of
                                    such force fields.
                                    <br />
                                    <br />
                                    <strong>Bio:</strong> Bryon Tjanaka is a
                                    sleep-deprived second-year computer science
                                    major at UCI. In addition to being a board
                                    member of ACM@UCI, he is an undergraduate
                                    researcher in the Mobley Lab. After using
                                    the force to help him graduate, he will
                                    pursue a career as a Jedi master.
                                </div>
                            </Card>

                            {/* CHINMAY */}
                            <Card body className="card-body">
                                <div>
                                    <h3>Algorithms in Nature </h3>
                                    <i>
                                        by Chinmay Raut - February 14th, DBH
                                        4011 @ 6:30 - 7:30 pm
                                    </i>
                                </div>
                                <div>
                                    <hr className="event-line" />
                                    <img
                                        style={{
                                            width: '100%'
                                        }}
                                        src={chinmaytalk}
                                        alt=""
                                    />
                                    <hr className="event-line" />
                                    Algorithms aren't only in books or CS
                                    lectures. They are everywhere! From the ants
                                    swarming on the ground to mold crawling in
                                    the ceiling, Algorithms are more than a way
                                    of life. In many cases, they are the
                                    embodiment of life itself!
                                    <br />
                                    <br />
                                    <strong>Bio:</strong> Chinmay is a 3rd-year
                                    undergraduate studying the minuscule yet
                                    seemingly infinite intersection of stats,
                                    bio, and cs. In his limited free time, he
                                    helps run ACM and rants about the frugality
                                    of Del Taco’s Tuesday deal.
                                </div>
                            </Card>

                            {/* ARNE */}
                            <Card body className="card-body">
                                <div>
                                    <h3>Let's Go!!! </h3>
                                    <i>
                                        by Arne Philipeit - February 7th, DBH
                                        4011 @ 6:30 - 7:30 pm
                                    </i>
                                </div>
                                <div>
                                    <hr className="event-line" />
                                    <img
                                        style={{
                                            width: '100%'
                                        }}
                                        src={arnetalk}
                                        alt=""
                                    />
                                    <hr className="event-line" />
                                    Go has been gaining traction recently
                                    because of its ease of use and value to
                                    parallel computing. You could think of it as
                                    a join of the simplicity of python and the
                                    efficiency of C. In this talk he will dive
                                    into Go and see what makes it so awesome. As
                                    Arne claims by the end of the talk you will
                                    definitely say : “Go, the only programming
                                    language you will ever need”
                                    <br />
                                    <br />
                                    <strong>Bio:</strong> Arne Philipeit is a
                                    senior in Computer Science and Engineering,
                                    exchange student from Trinity College
                                    Dublin, and Go-enthusiast. He also holds the
                                    socal record for solving most ICPC problems
                                    in Java, something he’s not too proud of.
                                </div>
                            </Card>

                            {/* JENS */}
                            <Card body className="card-body">
                                <div>
                                    <h3>
                                        Machine learning: Do we really
                                        understand it?{' '}
                                    </h3>
                                    <i>
                                        by Jens Tuyls - January 31th, DBH 4011 @
                                        6:30 - 7:30 pm
                                    </i>
                                </div>
                                <div>
                                    <hr className="event-line" />
                                    <img
                                        style={{
                                            width: '100%'
                                        }}
                                        src={jenstalk}
                                        alt=""
                                    />
                                    <hr className="event-line" />
                                    Many machine learning models that are being
                                    applied today can grow very complex. This is
                                    why many of the models become harder and
                                    harder to understand, even by experts in the
                                    field. This talk will provide an overview of
                                    how we can tackle this problem and see how
                                    we can truly understand what our
                                    state-of-the-art machine learning models are
                                    doing today.
                                    <br />
                                    <br />
                                    <strong>Bio:</strong> Jens is a junior
                                    studying computer science and engineering.
                                    Along with being extremely interested in
                                    machine learning and algorithms, he is also
                                    the tallest Belgian on campus.
                                </div>
                            </Card>

                            {/* JACKY */}
                            <Card body className="card-body">
                                <div>
                                    <h3>
                                        Unzipping our Genes with Machine
                                        Learning{' '}
                                    </h3>
                                    <i>
                                        by Jacky Dai - January 24th, DBH 4011 @
                                        6:30 - 7:30 pm
                                    </i>
                                </div>
                                <div>
                                    <hr className="event-line" />
                                    <img
                                        style={{
                                            width: '100%'
                                        }}
                                        src={jackytalk}
                                        alt=""
                                    />
                                    <hr className="event-line" />
                                    Bioinformatics is an interdisciplinary
                                    subject involving Biology, Computer Science,
                                    and Social Science. An important part of
                                    Bioinformatics is understanding genes, the
                                    basic component encoding every information
                                    of living creatures. In this seminar, I will
                                    briefly introduce genes, algorithms for
                                    manipulating genes, and gene data science.
                                    <br />
                                    <br />
                                    <strong>Bio:</strong> Jacky is a third year
                                    computer science student at UCI. Jacky’s
                                    interests include graph algorithms and
                                    algorithm design in interdisciplinary
                                    subjects.
                                </div>
                            </Card>

                            {/* Girls' Coding Nights */}
                            <Card style={{ marginTop: '20px' }}>
                                <a
                                    href="https://www.facebook.com/events/558100287990483/"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <CardImg
                                        top
                                        width="100%"
                                        src={codingNights}
                                        alt="girl coding nights"
                                    />
                                </a>
                                <CardBody>
                                    <div>
                                        Girls' Coding Nights - January 23rd, DBH
                                        4011 @ 5 - 6 pm
                                    </div>
                                    <div>
                                        The ACM club is starting a new series
                                        called the Girls' Coding Nights, and we
                                        invite YOU to join! This is a good
                                        chance to socialize with like-minded
                                        girls and hone your technical interview
                                        skills, all while snacking on pizza ;).
                                        We can also help you out if you have any
                                        questions on interview questions you are
                                        working on! The first meeting will be an
                                        introduction to Graph Theory.
                                    </div>
                                    <a
                                        href="https://www.facebook.com/events/558100287990483/"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        <Button className="event-button">
                                            RSVP For This Event
                                        </Button>
                                    </a>
                                </CardBody>
                            </Card>

                            {/* KARTHIK */}
                            <Card body className="card-body">
                                <div>
                                    <h3>
                                        P = NP and Other Hilarious Jokes You Can
                                        Tell Yourself
                                    </h3>
                                    <i>
                                        by Karthik Gajulapalli - January 17th,
                                        DBH 4011 @ 6:30 - 7:30
                                    </i>
                                </div>
                                <div>
                                    <hr className="event-line" />
                                    <img
                                        style={{
                                            width: '100%'
                                        }}
                                        src={karthiktalk}
                                        alt=""
                                    />
                                    <hr className="event-line" />
                                    The central question that has shaped much of
                                    computer science research is P vs NP. Do we
                                    really need mathematicians and their
                                    creativity to come up with proofs, or will
                                    computers be able to automatically generate
                                    proofs? If we believe creativity has some
                                    value, how do we bridge this gap of
                                    intractability?
                                    <br />
                                    <br />
                                    <strong>Bio:</strong> Karthik is a senior
                                    studying math and computer science. Besides
                                    talking at twice the speed of sound, he
                                    enjoys talking to anybody willing to listen
                                    about theoretical computer science. To truly
                                    marvel his front-end skills, you should
                                    visit his website.
                                </div>
                            </Card>
                        </Col>
                        {this.meeting}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Events;
