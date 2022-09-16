import React from 'react';
import { Nav, Navbar, NavDropdown, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../acm_logo.svg';
import './Navbar.css';

export default function Navigation() {
    return (
        <Navbar className="navbar" color="white" bg="dark" expand="md">
            <Navbar.Brand className="nav-brand" tag={Link} to="/">
                <img src={logo} width="150" id="logo" alt="ACM@UCI logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="acm-navbar-nav" />
            <Navbar.Collapse id="acm-navbar-nav">
                <Nav className="mx-auto text-center">
                    <Nav.Link className="nav-font" href="/">
                        Home
                    </Nav.Link>
                    <NavDropdown
                        title="About"
                        className="nav-font"
                        style={{ color: '#6DB6E2' }}
                    >
                        <NavDropdown.Item href="/about">
                            About Us
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/board">
                            Our Board
                        </NavDropdown.Item>
                    </NavDropdown>
                    {/* <Nav.Link className="nav-font" href="/events">Events</Nav.Link> */}
                    <Nav.Link className="nav-font" href="/Puzzle">
                        Problems
                    </Nav.Link>
                    <Nav.Link className="nav-font" href="/introToCP">
                        New Members
                    </Nav.Link>
                    <NavDropdown
                        title="Contact"
                        className="nav-font"
                        style={{ color: '#6DB6E2' }}
                    >
                        <NavDropdown.Item href="/contact">
                            Contact Us
                        </NavDropdown.Item>
                        <NavDropdown.Item href="https://discord.gg/MCtKPxC">
                            Discord
                        </NavDropdown.Item>
                        <NavDropdown.Item href="https://github.com/ACM-UCI/ACM-UCI-Website/issues">
                            Raise Issue
                        </NavDropdown.Item>
                    </NavDropdown>
                    {/* Plan: restrict access to UCI students only. */}
                    <Nav.Link className="nav-font" href="/login">
                        Login
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
