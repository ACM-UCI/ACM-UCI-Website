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
    NavbarToggler,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
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
            <Navbar className="navbar" color="white" dark expand="md">
                <NavbarBrand className="nav-brand" tag={Link} to="/">
                    <img src={logo} id="logo" alt="ACM@UCI logo" />
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="mx-auto text-center" navbar>
                        <NavItem className="mx-3">
                            <NavLink tag={Link} to="/" className="nav-font">
                                Home
                            </NavLink>
                        </NavItem>
                        <UncontrolledDropdown className="mx-3">
                            <DropdownToggle
                                nav
                                caret
                                className="nav-font"
                                style={{ color: '#6DB6E2' }}>
                                About
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>
                                    <NavLink tag={Link} to="/about">
                                        About Us
                                    </NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink tag={Link} to="/board">
                                        Our Board
                                    </NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink tag={Link} to="/blog">
                                        Blog
                                    </NavLink>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <NavItem className="mx-3">
                            <NavLink
                                tag={Link}
                                to="/events"
                                className="nav-font">
                                Events
                            </NavLink>
                        </NavItem>
                        <NavItem className="mx-3">
                            <NavLink
                                tag={Link}
                                className="nav-font"
                                to="/Puzzle">
                                Problems
                            </NavLink>
                        </NavItem>
                        <NavItem className="mx-3">
                            <NavLink
                                tag={Link}
                                className="nav-font"
                                to="/resources">
                                Resources
                            </NavLink>
                        </NavItem>
                        <UncontrolledDropdown className="mx-3">
                            <DropdownToggle
                                nav
                                caret
                                className="nav-font"
                                style={{ color: '#6DB6E2' }}>
                                Contact
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>
                                    <NavLink tag={Link} to="/contact">
                                        Contact Us
                                    </NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink tag={Link} to="/donate">
                                        Donate
                                    </NavLink>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <NavItem className="mx-3">
                            <NavLink
                                tag={Link}
                                className="nav-font"
                                to="/login">
                                Login
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default Navigation;
