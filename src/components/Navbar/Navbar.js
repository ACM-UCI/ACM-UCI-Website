import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../acm_logo.svg';
import './Navbar.css';
import { 
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand,
  Collapse,
  NavbarToggler
} from 'reactstrap';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Navbar className="nav-bar" color="white" dark expand="md">
        <NavbarBrand className="nav-brand" href="/"><img src={logo} id="logo" alt="ACM@UCI logo" /></NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mx-auto" navbar>
            <NavItem className="mx-3">
              <NavLink tag={Link} to="/" className="nav-font">Home</NavLink>
            </NavItem>
            <NavItem className="mx-3">
              <NavLink tag={Link} to="/events" className="nav-font">Events</NavLink>
            </NavItem>
            <NavItem className="mx-3">
              <NavLink tag={Link} className="nav-font" to="/resources">Resources</NavLink>
            </NavItem>
            <NavItem className="mx-3">
              <NavLink tag={Link} className="nav-font" to="/board">Board</NavLink>
            </NavItem>
            <NavItem className="mx-3">
              <NavLink tag={Link} className="nav-font" to="/contact">Contact</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Navigation;

