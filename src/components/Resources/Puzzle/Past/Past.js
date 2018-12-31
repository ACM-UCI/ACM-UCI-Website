import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import "./Past.css";
import Quarter from "../Quarter/Quarter";
import classnames from 'classnames';

// ADD SPRING NAVITEMS WHEN SPRING QUARTER STARTS

export default class Past extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.quarters = props.quarters;
    this.state = {
      activeTab: (this.quarters.length-1).toString()
    };
    this.week = props.week
    this.session = props.session

    this.navitems = [];
    this.tabcontents = [];
    var curr = this.quarters.length-1

    for(var i=0; i<this.quarters.length-1; i++){
      this.tabcontents.push(
        <TabPane key = {(i).toString()} tabId={(i).toString()}>
          <Quarter 
            session = {3} 
            week = {11} 
            quarter={this.quarters[i]}
          ></Quarter>
        </TabPane>
      )
    }
    this.tabcontents.push(
      <TabPane key = {(curr).toString()} tabId={(curr).toString()}>
        <Quarter 
          session = {this.session} 
          week = {this.week} 
          quarter={this.quarters[curr]}
        ></Quarter>
      </TabPane>
    )

  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }


  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '0' })}
              onClick={() => { this.toggle("0"); }}
            >
            {this.quarters[0]}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle("1"); }}
            >
            {this.quarters[1]}
            </NavLink>
          </NavItem>
        </Nav>
        
        <TabContent activeTab={this.state.activeTab}>
          {this.tabcontents}
        </TabContent>
      </div>
    );
  }
}