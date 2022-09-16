import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'react-bootstrap';
import Poll from './PollCustom/Poll';
import './Popup.css';
import { getDatabase, ref, onValue } from 'firebase/database';
import firebase from '../../../../../../../Firebase';

export default class Popup extends Component {
    constructor(props) {
        super(props);
        this.show = props.sol;
        this.postRef = ref(
            getDatabase(),
            'submissions/' + this.props.identifier + '/Poll/'
        );

        this.state = {
            modal: false,
            collapse: false,
            pollAnswers: {},
        };

        this.toggle = this.toggle.bind(this);
        this.handleVote = this.handleVote.bind(this);
        this.processData = this.processData.bind(this);
    }

    componentDidMount() {
        onValue(this.postRef, this.processData);
    }

    processData(data) {
        this.setState({ pollAnswers: data.val() });
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
        });
    }

    togglevis() {
        this.setState({ collapse: !this.state.collapse });
    }

    handleVote(voteAnswer) {
        var postRef = firebase
            .database()
            .ref('submissions/' + this.props.identifier + '/Poll/');
        postRef.transaction(function (poll) {
            // console.log(poll)
            if (poll) {
                if (poll.hasOwnProperty(voteAnswer)) poll[voteAnswer]++;
            }
            return poll;
        });

        this.postRef.on('value', this.processData);
    }

    render() {
        this.link = `We are interested in what you think!`;
        // var p = "Not Available"
        // if(!    (this.state.pollAnswers === undefined ||
        //         this.state.pollAnswers === null ||
        //         this.state.pollAnswers.length === 0)){
        //         p =
        // }
        // console.log(this.state.pollAnswers)
        return (
            <div>
                <Button className="btn-sol" onClick={this.toggle}>
                    {'Take Poll'}
                </Button>
                <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        {this.props.question}
                    </ModalHeader>
                    <ModalBody>
                        <Poll
                            theme={'blue'}
                            answers={Object.keys(this.state.pollAnswers).map(
                                (key) => ({
                                    option: key,
                                    votes: this.state.pollAnswers[key],
                                })
                            )}
                            onVote={this.handleVote}
                            identifier={this.props.identifier}
                            mark={this.props.mark}
                        />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
