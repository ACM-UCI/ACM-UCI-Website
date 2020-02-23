import React, { Component } from 'react';
import { Button } from 'reactstrap';
import CheckIcon from '@material-ui/icons/Done';
import './Poll.css';

export default class PollCard extends Component {
    constructor(props) {
        super(props);
        this.buttonHandle = this.buttonHandle.bind(this);
        this.voteAnswer = localStorage.getItem(
            'acm-uci-website/poll/' + props.identifier
        );
    }

    buttonHandle(evt) {
        this.voteAnswer = evt.target.id;
        localStorage.setItem(
            'acm-uci-website/poll/' + this.props.identifier,
            this.voteAnswer
        );
        this.props.onVote(evt.target.id);
    }

    render() {
        var count = 0;
        for (var i in this.props.answers) {
            count += this.props.answers[i].votes;
        }
        return (
            <div className="poll-pop">
                {this.props.answers.map(v => {
                    var show = this.props.mark === 'past';
                    var percent = '0%';
                    if (show && count)
                        percent =
                            Math.round((v.votes / count) * 100).toString() +
                            '%';
                    return (
                        <div key={this.props.identifier + v.option}>
                            <Button
                                id={v.option}
                                onClick={this.buttonHandle}
                                disabled={this.voteAnswer !== null || show}>
                                {v.option}
                                {show ? ' ' + percent : null}
                                {this.voteAnswer === v.option ? (
                                    <CheckIcon />
                                ) : null}
                                <div
                                    className="pollBar"
                                    style={{ width: percent }}
                                />
                            </Button>
                        </div>
                    );
                })}
                <p>votes: {count}</p>
            </div>
        );
    }
}
