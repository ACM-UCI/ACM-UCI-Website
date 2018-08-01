import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap';
import './Resource.css';

class Resource extends Component {
  render() {
    return (
      <Jumbotron className="resource-jumbotron mt-4 mb-0">
        <h3 className="resource-header">{this.props.title}</h3>
        <p className="lead-sub">{this.props.description}</p>
      </Jumbotron>
    );
  }
}

export default Resource;