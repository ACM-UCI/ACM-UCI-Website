import React, { Component } from 'react';
import { Container, Row, Button, Modal } from 'reactstrap';
import Navigation from '../Navbar/Navbar';
import Banner from '../Banner/Banner';
import Konami from 'react-konami-code';
import kevin from '../../img/kevin.mp4';
import Footer from '../Footer/Footer';
import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    // easterEgg() {
    //     this.toggle();
    // }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        return (
            <div>
                <Navigation />
                <Banner
                    lead="ACM @ UCI"
                    leadSub="Learn about algorithms and improve your interview skills."
                />
                <Container className="home-body" fluid>
                    <Row>
                        <div className="pseudo" />
                        <p className="text-center m-5">
                            There are no requirements to join us; in fact, we
                            encourage you to join even if you have no
                            experience. Consider attending one of our meetings
                            that we hold once or twice a week. Our chapter hosts
                            a variety of events including workshops by UCI
                            students to share knowledge and presentations by
                            distinguished speakers about new ideas. <br />
                            <br />
                            We also love coffee and pizza.
                        </p>
                        <Button color="secondary mx-auto button">
                            <a
                                href="https://www.facebook.com/groups/228954137162541/"
                                target="_blank"
                                rel="noopener noreferrer">
                                JOIN US ON FACEBOOK
                            </a>
                        </Button>
                    </Row>
                </Container>
                <Modal
                    size="lg"
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}>
                    <video
                        width="100%"
                        height="auto"
                        controls
                        style={{ justifySelf: 'center' }}>
                        <source src={kevin} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </Modal>
                <Konami action={this.toggle} />
            </div>
        );
    }
}

export default Home;
