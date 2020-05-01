import React, { Component } from 'react';
import './Banner.css';
import { Jumbotron } from 'reactstrap';

class Banner extends Component {
    render() {
        return (
            <Jumbotron className="text-center mb-0 banner">
                <h2 className="jumbotron-header display-4">
                    {this.props.lead}
                </h2>
                <p className="lead-sub">{this.props.leadSub}</p>

                {this.props.hasOwnProperty('img') && (
                    <a
                        href="https://www.acm.org/chapters/student-chapter-excellence-awards"
                        target="_blank"
                        rel="noopener noreferrer">
                        <img
                            src={this.props.img}
                            alt="2020 Outstanding Website"
                        />
                    </a>
                )}
            </Jumbotron>
        );
    }
}

export default Banner;
