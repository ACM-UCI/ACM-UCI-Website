import React, { Component } from 'react';
import './Banner.css';
import {
  Jumbotron
} from 'reactstrap';

class Banner extends Component {
  render() {
    return (
      <Jumbotron className="text-center mb-0">
        <h2 className="jumbotron-header display-4">{this.props.lead}</h2>
        <p className="lead-sub">{this.props.leadSub}</p>
      </Jumbotron>
    );
  }
}

export default Banner;